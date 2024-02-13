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
          // container: 'map',
          style: {
            version: 8,
            sources: {
              openinframap: {
                type: 'vector',
                tiles: ['https://openinframap.org/tiles/{z}/{x}/{y}.pbf'],
              },
              
            },
            layers: [
            {
                id: 'country-borders',
                type: 'line',
                source: 'openinframap',
                'source-layer': 'country',
                paint: {
                  'line-color': '#000',
                  'line-width': 1,
                },
              },
            
              {
                id: 'power_line',
                type: 'line',
                source: 'openinframap',
                'source-layer': 'power_line',
                paint: {
                  'line-color': '#FF0000',
                  'line-width': 1,
                },
              },
  
              {
                id: 'power_tower',
                type: 'line',
                source: 'openinframap',
                'source-layer': 'power_tower',
                paint: {
                  'line-color': '#f0f0f0',
                  'line-width': 1,
                },
              },
              {
                id: 'power_heatmap_solar',
                type: 'line',
                source: 'openinframap',
                'source-layer': 'power_heatmap_solar',
                paint: {
                  'line-color': '#FF0000',
                  'line-width': 1,
                },
              },
              {
                id: 'telecoms_mast',
                type: 'line',
                source: 'openinframap',
                'source-layer': 'telecoms_mast',
                paint: {
                  'line-color': '#f0f0f0',
                  'line-width': 2,
                },
              },
              {
                id: 'petroleum_pipeline',
                type: 'line',
                source: 'openinframap',
                'source-layer': 'petroleum_pipeline',
                paint: {
                  'line-color': '#000000',
                  'line-width': 2,
                },
              },
              {
                id: 'water_pipeline',
                type: 'line',
                source: 'openinframap',
                'source-layer': 'water_pipeline',
                paint: {
                  'line-color': '#0000FF',
                  'line-width': 2,
                },
              },
              
          ],
          },
          center: [10.4515, 51.1657],
          minzoom: 2,
          maxzoom: 17
        });
      },
    },
  };
  </script>
  
  <style>
  #map {
    height: 100vh;
  }
  </style>
  