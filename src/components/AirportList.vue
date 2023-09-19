<template>
	<SideBar />
  

  <div class="container">
    <h5 class="mb-0">Airports In Germany</h5>
    <div id="map" ></div>
  </div>
</template>


<script>
let map;
// @ is an alias to /src
import axios from 'axios';
import SideBar from '@/components/SideBar.vue'
import { Loader } from "@googlemaps/js-api-loader"
import { MarkerClusterer } from "@googlemaps/markerclusterer";  
import airporturl from '../assets/Airport-icon.png'

export default {
  name: 'AirportList',
  data() {
    return {
      airports: [],
    };
  },
  components: {
    SideBar
  },
  mounted() {
    this.initializeMap();
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
    async initializeMap() {
      
      await this.fetchAirports();

      const loader = new Loader({
        apiKey: "AIzaSyB9ohDy5yYJsrDPwomYy9dEM-vCTqeZYtw",
        version: "weekly",

        
      });

      await loader.load();
      
      const { Map,InfoWindow  } = await google.maps.importLibrary("maps");
      const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker",
  );
      const { Visualization } = await google.maps.importLibrary("visualization");

      const map = new Map(document.getElementById("map"), {
        center: { lat: 51.1657, lng: 10.4515 },
        // center: { lat: 48.353802, lng: 11.7861 },
        zoom: 8,
        mapId: "DEMO_MAP_ID",
      });

      // const svgMarker = {
      //     path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      //     fillColor: "blue",
      //     fillOpacity: 0.6,
      //     strokeWeight: 0,
      //     rotation: 0,
      //     scale: 2,
      //     anchor: new google.maps.Point(0, 20),
      //   };
      var heatMapData = []
      console.log("second", this.airports)
      this.airports.forEach((airport) => {
        const airportLatLng = { lat: parseFloat(airport.latitude_deg), lng: parseFloat(airport.longitude_deg)};
        heatMapData.push(new google.maps.LatLng(airportLatLng.lat, airportLatLng.lng))
        });

      
  
      // MARKER CLUSTERING
    
  // Create an array of alphabetical characters used to label the markers.
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // Add some markers to the map.
  const markers = heatMapData.map((position, i) => {
    const airport = this.airports[i];
    const content = `
    <strong>Airport Name:</strong> ${airport.name}<br>
    <strong>Latitude:</strong> ${airport.latitude_deg}<br>
    <strong>Longitude:</strong> ${airport.longitude_deg}<br>
    <strong>IATA Code:</strong> ${airport.iata_code}<br>
    <strong>GPS Code:</strong> ${airport.gps_code}<br>
    <strong>Country:</strong> ${airport.country_name}
  `;
    const label = labels[i % labels.length];

    const glyphImg = document.createElement("img");
    glyphImg.src = airporturl;
    glyphImg.style.width = '30px'; 
    glyphImg.style.height = '30px';

    const pinGlyph = new google.maps.marker.PinElement({
      glyph: glyphImg,
      // glyphColor: "white",
    });
    
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position,
      content: pinGlyph.element,
      // icon: image,
      title: airport.name,
      
    });

    const infoWindow = new google.maps.InfoWindow({
          content: content,
          disableAutoPan: true,
        });

    // markers can only be keyboard focusable when they have click listeners
    // open info window when marker is clicked
    marker.addListener("click", () => {  
        infoWindow.open(map, marker);
    });
    return marker;
  });

  // Add a marker clusterer to manage the markers.
  new MarkerClusterer({ markers, map });

  // HEATMAP

  // const heatmap = new google.maps.visualization.HeatmapLayer({
  //         data: heatMapData,
  //       });
  //       heatmap.setMap(map);
        
  //     const markerCluster = new MarkerClusterer({ map, markers });

      

    },
  },
}
</script>

<style>
#map {
  height: 600px;
  width: 98%;
  /* padding-left: 100px; */
  margin-top: 5%;
  margin-left: 125px;
  /* margin-right: 10%; */
}

</style>