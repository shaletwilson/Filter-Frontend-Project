<template>
  <div>
    <!-- Your Vue.js template here -->
    <div id="map" style="height: 500px;"></div>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";
import axios from "axios";
import { MarkerClusterer } from "https://cdn.skypack.dev/@googlemaps/markerclusterer@2.3.1";

export default {
  data() {
    return {
      airports: [],
    };
  },
  methods: {
    async fetchAirports() {
      try {
        const url = "/airport-list-api/";
        const response = await axios.get(url);
        this.airports = response.data.results;
        console.log("data", response.data.results);
        return this.airports;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async initializeMap() {
      await this.fetchAirports();

      const loader = new Loader({
        apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
        version: "weekly",
      });

      await loader.load();

      const { Map } = await google.maps.importLibrary("maps");

      const map = new Map(document.getElementById("map"), {
        center: { lat: 51.1657, lng: 10.4515 },
        zoom: 8,
      });

      // Add your code to create SVG markers for airports here

      // Call the initMap function to cluster markers
      this.initMap(map);
    },
    initMap(map) {
      const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const markers = this.airports.map((airport, i) => {
        const label = labels[i % labels.length];

        // Create markers for airports here, similar to the code in your existing code snippet

        return marker;
      });

      // Add a marker clusterer to manage the markers.
      new MarkerClusterer({ markers, map });
    },
  },
  mounted() {
    this.initializeMap();
  },
};
</script>
