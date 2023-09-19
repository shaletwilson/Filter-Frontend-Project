<template>
    <SideBar />

    <l-map style="height: 300px" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="markerLatLng"></l-marker>
    </l-map>

  </template>
  
  <script>
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
  
  export default {
    name: 'opsm',
    components: {
      LMap,
      LTileLayer,
      LMarker
    },
    data() {
        return {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        zoom: 15,
        center: [51.1657, 10.4515],
        markerLatLng: [51.1657, 10.4515]
      };
    },
    methods: {
    async fetchAirports() {
      try{
        const url = '/airport-list-api/';
        const response = await axios.get(url)
        this.airports = response.data.results;
        console.log("data", response.data.results)
        return this.airports

      }catch (error) {
        console.error('Error fetching data:', error);
      }
      

      
    },
    }
    
  };
  </script>
  
  <style></style>

  
  