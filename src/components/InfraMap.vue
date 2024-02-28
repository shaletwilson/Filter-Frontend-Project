<template>
  <SideBar />
  <div>
    
    <div style="width: 90%; height: 80%;" ref="map" id="map">
      <div id="menu">
        
        <div class="dropdown">
          
          <button class="dropbtn"><span class="material-symbols-outlined">stacks</span></button>
          <div class="dropdown-content scroll" id="dropValues">
          </div>
        </div>
        
      </div>
      
      <button class="menu-box" id="satToggle" style="z-index: 998 !important;"><span class="material-symbols-outlined">satellite</span></button>
      <div class="menu-box" style="margin-top:210px; z-index: 998 !important;"><span class="material-symbols-outlined">key</span>
        <div class="dropdown-content scroll" >
          <span class="material-symbols-outlined" style="color: #FF0000">minimize</span> Power Lines <br>
          <span class="material-symbols-outlined" style="color: #00FFFF">minimize</span> Power Towers <br>
          <span class="material-symbols-outlined" style="color: #660915">minimize</span> Power Substations <br>
          <span class="material-symbols-outlined" style="color: #446609">minimize</span> Power Substation Points <br>
          <span class="material-symbols-outlined" style="color: #000237">minimize</span> Power Plants <br>
          <span class="material-symbols-outlined" style="color: #ffaa55">minimize</span> Power Plant Points <br>
          <span class="material-symbols-outlined" style="color: #55ff7a">minimize</span> Power Generators <br>
          <span class="material-symbols-outlined" style="color: #555bff">minimize</span> Power Generator Areas <br>
          <span class="material-symbols-outlined" style="color: #ab5a85">minimize</span> Power Transfomers <br>
          <span class="material-symbols-outlined" style="color: #ab885a">minimize</span> Power Compensators <br>
          <span class="material-symbols-outlined" style="color: #63ab5a">minimize</span> Power Switches <br>
          <span class="material-symbols-outlined" style="color: #FFFF00">minimize</span> Solar Power HeatMap <br>
          <span class="material-symbols-outlined" style="color: #865700;">minimize</span> Telecommunications Mast <br>
          <span class="material-symbols-outlined" style="color: #f410ec;">minimize</span> Petroleum PipeLines <br>
          <span class="material-symbols-outlined" style="color: #4a1e0f;">minimize</span> Petroleum Wells <br>
          <span class="material-symbols-outlined" style="color: #7b0044;">minimize</span> Petroleum Sites <br>
          <span class="material-symbols-outlined" style="color: #00b7ff;">minimize</span> Water PipeLines <br>
          <span class="material-symbols-outlined" style="color: #8A2BE2;">minimize</span> Telecom Communications Line <br>
          <span class="material-symbols-outlined" style="color: #FFC0CB">minimize</span> Telecom Data centre <br>

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
import iconurl from '../assets/Airport-icon-bg.png'

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
  },
  methods: {
    async fetchAirports() {
      console.log("Fetch airport invoked")
      this.message = "";
      try {
        let apiUrl = "airport-filter-api/";


        const response = await axios.get(apiUrl);

        
        if (response.data.response == 'NO Data') {
          this.message = response.data.message;
        }
        else {
          this.airports = response.data.results;
          this.airports.forEach((airport) => airport.geometry_coordinates = airport.geometry_coordinates.slice(2, -2).split(',').reverse())
          console.log("Data inside fetch airport", this.airports)
          this.updateMapWithMarkers(this.airports)
        }


      } catch (error) {
        console.error('Error fetching data:', error);
      }



    },

    toggleSat(){
        console.log("sat Toggle called")
        const satView = this.map.getLayoutProperty(
          "mapbox-satellite-layer",
              'visibility'
            );
        if (satView == 'visible') {
          this.map.setLayoutProperty("mapbox-satellite-layer", 'visibility', 'none');
        } else {
          this.map.setLayoutProperty(
            "mapbox-satellite-layer",
            'visibility',
            'visible'
          );
        }
      },

      toggleLayer(link){
        console.log("layer toggle called")
        const clickedLayer = link.id;
        // e.preventDefault();
        //e.stopPropagation();
        const visibility = this.map.getLayoutProperty(
          clickedLayer,
          'visibility'
        );

        // Toggle layer visibility by changing the layout object's visibility property.
        if (!link.checked) {
          this.map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        } else {
          this.map.setLayoutProperty(
            clickedLayer,
            'visibility',
            'visible'
          );
        }
      },




    async initializeMap() {
      mapboxgl.accessToken = '';

      this.map = new mapboxgl.Map({
        container: this.$refs.map,
        style: 'mapbox://styles/mapbox/streets-v12', // OSM as the base map
        center: [10.4515, 51.1657],
        zoom: 5,
      });

      
      
      // Add zoom and rotation controls to the map.
      const navControl = new mapboxgl.NavigationControl();
      this.map.addControl(navControl, 'top-right');

      // Add OpenInfraMap layers
      this.map.on('load', () => {
        this.map.addSource(
          'openinframap', {
            type: 'vector',
            tiles: ['https://openinframap.org/tiles/{z}/{x}/{y}.pbf'],
        }
      );

      
      
      this.map.addSource(
          "mapbox-satellite", {
          type: "raster",
          url: "mapbox://mapbox.satellite"
          }
        )
        
      // map.addSource(
      //   "mapbox-streets", {
      //     type: "vector",
      //     url: "mapbox://mapbox.mapbox-streets-v8"
      //   }
      // )
        //Satellite Layer
        this.map.addLayer({
          id: "mapbox-satellite-layer",
          source: "mapbox-satellite",
          type: "raster"
          });
        
        // Layer 1
        this.map.addLayer({
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
        this.map.addLayer({
          id: 'power_tower',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'power_tower',
          paint: {
            'line-color': '#00FFFF', // aqua blue
            'line-width': 1,
          },
        });
        this.map.addLayer({
          id: 'power_substation',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'power_substation',
          paint: {
            'line-color': '#660915', 
            'line-width': 1,
          },
        });
        this.map.addLayer({
          id: 'power_substation_point',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'power_substation_point',
          paint: {
            'line-color': '#446609',
            'line-width': 1,
          },
        });
        this.map.addLayer({
          id: 'power_plant',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'power_plant',
          paint: {
            'line-color': '#000237',
            'line-width': 1,
          },
        });
        this.map.addLayer({
          id: 'power_plant_point',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'power_plant_point',
          paint: {
            'line-color': '#ffaa55',
            'line-width': 1,
          },
        });
        this.map.addLayer({
          id: 'power_generator',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'power_generator',
          paint: {
            'line-color': '#55ff7a',
            'line-width': 1,
          },
        });
        this.map.addLayer({
          id: 'power_generator_area',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'power_generator_area',
          paint: {
            'line-color': '#555bff',
            'line-width': 1,
          },
        });
        this.map.addLayer({
          id: 'power_transformer',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'power_transformer',
          paint: {
            'line-color': '#ab5a85', 
            'line-width': 1,
          },
        });
        this.map.addLayer({
          id: 'power_compensator',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'power_compensator',
          paint: {
            'line-color': '#ab885a',
            'line-width': 1,
          },
        });
        this.map.addLayer({
          id: 'power_switch',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'power_switch',
          paint: {
            'line-color': '#63ab5a', 
            'line-width': 1,
          },
        });
        this.map.addLayer({
          id: 'power_heatmap_solar',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'power_heatmap_solar',
          paint: {
            'line-color': '#FFFF00', //yellow
            'line-width': 1,
          },
        });

        this.map.addLayer({
          id: 'telecoms_mast',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'telecoms_mast',
          paint: {
            'line-color': '#865700', 
            'line-width': 1,
          },
        });

        this.map.addLayer({
          id: 'petroleum_pipeline',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'petroleum_pipeline',
          paint: {
            'line-color': '#f410ec', 
            'line-width': 1,
          },
        });
        this.map.addLayer({
          id: 'petroleum_well',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'petroleum_well',
          paint: {
            'line-color': '#4a1e0f', 
            'line-width': 1,
          },
        });
        this.map.addLayer({
          id: 'petroleum_site',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'petroleum_site',
          paint: {
            'line-color': '#7b0044',
            'line-width': 1,
          },
        });
        this.map.addLayer({
          id: 'water_pipeline',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'water_pipeline',
          paint: {
            'line-color': '#00b7ff', 
            'line-width': 1,
          },
        });
        this.map.addLayer({
          id: 'telecoms_communication_line',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'telecoms_communication_line',
          paint: {
            'line-color': '#f410ec',
            'line-width': 1,
          },
        });
        this.map.addLayer({
          id: 'telecoms_data_center',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'telecoms_data_center',
          paint: {
            'line-color': '#FFC0CB', // pink
            'line-width': 1,
          },
        });
        this.fetchAirports();

        
        
// After the last frame rendered before the map enters an "idle" state.
this.map.on('idle', () => {
     // If these two layers were not added to the map, abort
    // if (!map.getLayer('contours') || !map.getLayer('museums')) {
    //   return;
    // }

    //Set Satellite visibility to hidden when map is loaded first
    // map.setLayoutProperty("mapbox-satellite-layer", 'visibility', 'none');

    // Enumerate ids of the layers.
    const toggleableLayerIds = {
    'power_line': "Power Lines",
    'power_tower': "Power Towers",
    'power_substation': "Power Substations",
    'power_substation_point': "Power Substation Points",
    'power_plant': "Power Plants",
    'power_plant_point': "Power Plant Points",
    'power_generator': "Power Generators",
    'power_generator_area': "Power Generator Areas",
    'power_transformer': "Power Transformers",
    'power_compensator': "Power Compensators",
    'power_switch': "Power Switches",
    'power_heatmap_solar': "Solar Power HeatMap",
    'telecoms_mast': "Telecommunications Mast",
    'petroleum_pipeline': "Petroleum Pipelines",
    'petroleum_well': "Petroleum Wells",
    'petroleum_site': "Petroleum Sites",
    'water_pipeline': "Water Pipelines",
    'telecoms_communication_line': "Telecom Communications Line",
    'telecoms_data_center': "Telecom Data Centre"
  };

    // Set up the corresponding toggle button for each layer.
    for (const id of Object.keys(toggleableLayerIds)) {
    //   // Skip layers that already have a button set up.
      if (document.getElementById(id)) {
        continue;
      }

      // Create a link.
      const link = document.createElement('INPUT');
      link.setAttribute("type","checkbox")
      link.id = id;
      link.value = id;
      const label = document.createElement('LABEL');
      const labelText = document.createTextNode(toggleableLayerIds[id]);
      label.appendChild(labelText);
      label.setAttribute("htmlFor",id);
      link.checked = true;
      const brTag = document.createElement('BR')
      
      document.getElementById("satToggle").addEventListener("click",this.toggleSat)
      
      // Show or hide layer when the toggle is clicked.
      link.addEventListener("change", () => this.toggleLayer(link));  

      const layers = document.getElementById('dropValues');
      layers.appendChild(link);
      layers.appendChild(label);
      layers.appendChild(brTag);   
    }
  });

        

      });
    },


    // update marker function
  updateMapWithMarkers(airports) {
      console.log("Data inside update marker", airports);

      // Create a GeoJSON source for markers
      const markersGeoJSON = {
        type: 'FeatureCollection',
        features: airports.map(airport => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [airport.geometry_coordinates[1], airport.geometry_coordinates[0]]
          },
          properties: {
            id: airport.id,
            name: airport.name,
            icaoCode: airport.icaoCode,
            country: airport.country
          }
        }))
      };

      // Add markers layer to the map
      if (this.map.getSource('markers')) {
        this.map.getSource('markers').setData(markersGeoJSON);
      } else {
        this.map.addSource('markers', {
          type: 'geojson',
          data: markersGeoJSON,
          cluster: true,
          clusterMaxZoom: 15, // Max zoom to cluster points on
          clusterRadius: 100 // Radius of each cluster when clustering points (pixels)
        });
      }

      // Add clustered markers layer
      this.map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'markers',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1'
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40
          ]
        }
      });

      // Add cluster count layer
      this.map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'markers',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      });

      // Add unclustered markers layer
      this.map.loadImage(
        iconurl,
        (error, image) => {
          if (error) throw error;
          this.map.addImage('custom-icon', image);
          this.map.addLayer({
            id: 'unclustered-point',
            type: 'symbol',
            source: 'markers',
            filter: ['!', ['has', 'point_count']],
            layout: {
              'icon-image': 'custom-icon',
              'icon-size': 0.2 // Adjust icon size as needed
            }
      });
    }
  );

      // Set marker click event to display popup
      this.map.on('click', 'unclustered-point', (e) => {
        const { id, name, icaoCode, country } = e.features[0].properties;
        const popupContent = `
          <strong>ID:</strong> ${id}<br>
          <strong>Name:</strong> ${name}<br>
          <strong>ICAO Code:</strong> ${icaoCode}<br>
          <strong>Country:</strong> ${country}<br>
          <strong>More Info:</strong>
          
        `;
        new mapboxgl.Popup()
          .setLngLat(e.features[0].geometry.coordinates)
          .setHTML(popupContent)
          .addTo(this.map);
      });

      // Change the cursor to a pointer when hovering over the unclustered-point layer
      this.map.on('mouseenter', 'unclustered-point', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves
      this.map.on('mouseleave', 'unclustered-point', () => {
        this.map.getCanvas().style.cursor = '';
      });
    }

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
      font-weight: bold;
      color: #000000;
      padding: 5px;
      border: none;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  /* position: absolute; */
  background-color: #ffffff;
  font-size: 13px;
  font-weight: bold;
  text-align: left;
  padding: 15px;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content input {
  color: black;
  margin-right: 5px;
  text-decoration: none;
}
.dropdown-content input[type="checkbox"] {
  accent-color: black;
}

.menu-box{ 
  background: #fff;
  padding: 5px;
  position: absolute;
  z-index: 9999;
  margin-top: 160px;
  right: 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  font-family: 'Open Sans', sans-serif;
}


.dropdown-content a:hover {background-color: #000000;}

.dropdown:hover .dropdown-content {display: block;}
.menu-box:hover .dropdown-content {display: block;}
div.scroll {
            margin: 4px, 4px;
            padding: 4px;
            height: 300px;
            overflow-x: hidden;
            overflow-y: auto;
            text-align: justify;
        }


.mapboxgl-marker {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid rgb(229, 26, 57);
  background-color: rgb(6, 251, 251);
}
</style>
