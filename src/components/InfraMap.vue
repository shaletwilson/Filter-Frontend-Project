<template>
  <SideBar />
  <div>
    
    <div style="width: 90%; height: 80%;" ref="map" id="map">
      <div id="menu">
        
        <div class="dropdown">
          
          <button class="dropbtn">Layers</button>
          <div class="dropdown-content" id="dropValues">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SideBar from '@/components/SideBar.vue'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default {
  name: 'InfraMap',
  components: {
    SideBar,
  },
  data() {
    return {
      map: null,
      airports: [],
    };
  },
  mounted() {
    this.initializeMap();
    this.fetchAirports();
  },
  methods: {
    async fetchAirports() {
      this.message = "";
      try {
        let apiUrl = "airport-filter-api/";


        const response = await axios.get(apiUrl);

        console.log('data from api', response.data)
        if (response.data.response == 'NO Data') {
          this.message = response.data.message;
        }
        else {
          this.airports = response.data.results;
          this.airports.forEach((airport) => airport.geometry_coordinates = airport.geometry_coordinates.slice(2, -2).split(',').reverse())
          this.updateMapWithMarkers();
        }


      } catch (error) {
        console.error('Error fetching data:', error);
      }



    },
    initializeMap() {
      mapboxgl.accessToken = '';

      const map = new mapboxgl.Map({
        container: this.$refs.map,
        style: 'mapbox://styles/mapbox/streets-v12', // OSM as the base map
        center: [12.4964, 41.9028],
        zoom: 8,
      });

      // Add zoom and rotation controls to the map.
      const navControl = new mapboxgl.NavigationControl();
      map.addControl(navControl, 'top-right');

      // Add OpenInfraMap layers
      map.on('load', () => {
        map.addSource('openinframap', {
          type: 'vector',
          tiles: ['https://openinframap.org/tiles/{z}/{x}/{y}.pbf'],
        });
        // Layer 1
        map.addLayer({
          id: 'power_line',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'power_line',
          paint: {
            'line-color': '#FF0000',
            'line-width': 1,
          },
        });

        // Layer 2
        map.addLayer({
          id: 'power_tower',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'power_tower',
          paint: {
            'line-color': '#00FFFF', // aqua blue
            'line-width': 1,
          },
        });
        map.addLayer({
          id: 'power_heatmap_solar',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'power_heatmap_solar',
          paint: {
            'line-color': '#FFFF00', //yellow
            'line-width': 1,
          },
        });

        map.addLayer({
          id: 'telecoms_mast',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'telecoms_mast',
          paint: {
            'line-color': '#FFC0CB', //Pink
            'line-width': 1,
          },
        });

        map.addLayer({
          id: 'petroleum_pipeline',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'petroleum_pipeline',
          paint: {
            'line-color': '#8A2BE2', // violet
            'line-width': 1,
          },
        });
        map.addLayer({
          id: 'water_pipeline',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'water_pipeline',
          paint: {
            'line-color': '#0000FF', // blue
            'line-width': 1,
          },
        });
        map.addLayer({
          id: 'telecoms_communication_line',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'telecoms_communication_line',
          paint: {
            'line-color': '#FFC0CB', // pink
            'line-width': 1,
          },
        });
        this.updateMapWithMarkers();
        
// After the last frame rendered before the map enters an "idle" state.
map.on('idle', () => {
  // If these two layers were not added to the map, abort
  // if (!map.getLayer('contours') || !map.getLayer('museums')) {
  //   return;
  // }

  // Enumerate ids of the layers.
  const toggleableLayerIds = ['power_line', 'power_tower', 'power_heatmap_solar', 'telecoms_mast', 'petroleum_pipeline', 'water_pipeline', 'telecoms_communication_line'];

  // Set up the corresponding toggle button for each layer.
  for (const id of toggleableLayerIds) {
  //   // Skip layers that already have a button set up.
    if (document.getElementById(id)) {
      continue;
    }

    // Create a link.
    const link = document.createElement('a');
    link.id = id;
    link.href = '#';
    link.textContent = id;
    link.className = 'active';

    // Show or hide layer when the toggle is clicked.
    link.onclick = function (e) {
      const clickedLayer = link.textContent;
      e.preventDefault();
      e.stopPropagation();
      const visibility = map.getLayoutProperty(
        clickedLayer,
        'visibility'
      );

      // Toggle layer visibility by changing the layout object's visibility property.
      if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        link.className = '';
      } else {
        link.className = 'active';
        map.setLayoutProperty(
          clickedLayer,
          'visibility',
          'visible'
        );
      }
    };

    const layers = document.getElementById('dropValues');
    layers.appendChild(link);
  }
});

      });
    },
    updateMapWithMarkers() {
      this.airports.forEach((airport, index) => {
        new mapboxgl.Marker({
          color: 'blue',
          size: 'small',
        }) // Customize the marker color
          .setLngLat([airport.geometry_coordinates[1], airport.geometry_coordinates[0]])
          .setPopup(new mapboxgl.Popup()
            .setHTML(`
              <strong>ID:</strong> ${airport.id}<br>
              <strong>Name:</strong> ${airport.name}<br>
              <strong>Latitude:</strong> ${airport.geometry_coordinates[0]}<br>
              <strong>Longitude:</strong> ${airport.geometry_coordinates[1]}<br>
              <strong>ICAO Code:</strong> ${airport.icaoCode}<br>
              <strong>Country:</strong> ${airport.country}<br>
              <strong>More Info:</strong>
              <router-link :to="{ name: 'airport-details', params: { id: airport.id } }">
                <i class="material-icons">visibility</i>
              </router-link>
            `)
          )
        //.addTo(map);
      });

    },
  },
};
</script>

<style>
#map {
  height: 100vh;
}

.marker {
  background-color: #008000;
  /* Green */
  color: #ffffff;
  /* White */
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
}


#menu {
        background: #fff;
        position: absolute;
        z-index: 9999;
        margin-top: 110px;
        right: 10px;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.4);
        font-family: 'Open Sans', sans-serif;
    }

    #menu a {
        font-size: 13px;
        font-weight: bold;
        color: #000000;
        display: block;
        margin: 0;
        padding: 0;
        padding: 10px;
        text-decoration: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.25);
        text-align: center;
    }

    #menu a:last-child {
        border: none;
    }

    #menu a:hover {
        background-color: #f8f8f8;
        color: #404040;
    }

    #menu a.active {
        background-color: #000000;
        color: #ffffff;
    }

    #menu a.active:hover {
        background: rgb(0, 0, 0);
        color: #ffffff;
    }


    .dropbtn {
      
      font-size: 13px;
        font-weight: bold;
        color: #000000;
  padding: 16px;
  font-size: 16px;
  border: none;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  /* position: absolute; */
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  margin-right: 200px;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #000000;}

.dropdown:hover .dropdown-content {display: block;}
</style>
