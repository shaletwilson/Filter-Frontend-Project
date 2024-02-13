<template>
  <SideBar />
  <div>
    <div ref="map" id="map"></div>
  </div>
</template>

<script>
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
      markers: [
        { id: 'frankfurtAirport', name: 'Frankfurt Airport', coordinates: [8.5705, 50.0333] },
        { id: 'munichAirport', name: 'Munich Airport', coordinates: [11.7861, 48.3537] },
      ],
    };
  },
  mounted() {
    this.initializeMap();
    
  },
  methods: {
    initializeMap() {
      mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhbGV0LXdpbHNvbiIsImEiOiJjbHJpeTRkdnowOWJoMmpxcWUyNmlycXM4In0.2dAE5evn2X4Pzct3GhNYcA';

      this.map = new mapboxgl.Map({
        container: this.$refs.map,
        style: 'mapbox://styles/mapbox/streets-v11', // OSM as the base map
        center: [10.4515, 51.1657],
        zoom: 6,
      });

      // Add OpenInfraMap layers
      this.map.on('load', () => {
        this.map.addSource('openinframap', {
          type: 'vector',
          tiles: ['https://openinframap.org/tiles/{z}/{x}/{y}.pbf'],
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
            'line-color': '#FFC0CB', //Pink
            'line-width': 1,
          },
        });

        this.map.addLayer({
          id: 'petroleum_pipeline',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'petroleum_pipeline',
          paint: {
            'line-color': '#8A2BE2', // violet
            'line-width': 1,
          },
        });
        this.map.addLayer({
          id: 'water_pipeline',
          type: 'line',
          source: 'openinframap',
          'source-layer': 'water_pipeline',
          paint: {
            'line-color': '#0000FF', // blue
            'line-width': 1,
          },
        });

        this.markers.forEach((marker) => {
          const el = document.createElement('div');
          el.className = 'marker';
          el.innerHTML = marker.name;

          new mapboxgl.Marker(el)
            .setLngLat(marker.coordinates)
            .addTo(this.map);
        });
        
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
  background-color: #008000; /* Green */
  color: #ffffff; /* White */
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
}
</style>
