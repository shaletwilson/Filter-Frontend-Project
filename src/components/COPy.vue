<!-- <template>
    <SideBar />

    <l-map style="height: 300px" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="markerLatLng"></l-marker>
    </l-map>

  </template> -->

  <template>
    <SideBar />
    <div id="map">
      <l-map
        :zoom="12"
        :center="mapCenter"
        style="height: 500px; width: 100%"
      >
        <l-tile-layer
          :url="osmUrl"
          :attribution="osmAttribution"
        ></l-tile-layer>
        
        <!-- Add a marker with specified latitude and longitude -->
        <!-- <l-polyline
        v-for="(coordinate, index) in coordinateArray"
        :key="index"
        :lat-lngs="coordinate"
        :color="'blue'"  
        :weight="2"   
      ></l-polyline> -->
      <!-- <l-marker
        v-for="(coordinate, index) in coordinateArray"
        :key="index"
        :lat-lng="coordinate"
      >
      {{ console.log("hi: ", coordinate) }}
    </l-marker> -->
    <l-marker :lat-lng="{ lat: 48.009998, lng: 10.098611 }"></l-marker>
    <l-marker :lat-lng="{ lat: 49.967777, lng: 7.111944 }">
    </l-marker>
      <l-marker
        v-for="(airport, index) in airportArray"
        :key="index"
        :lat-lng="{ lat: airport[0], lng: airport[1] }"
      >
      {{ console.log("data in template: ", airport[0], airport[1]) }}
      <!-- {{ 
            // console.log([parseFloat(airport.latitude_deg), parseFloat(airport.longitude_deg)]) 

      // console.log('Latitude:', parseFloat(airport.latitude_deg), 'Longitude:', parseFloat(airport.longitude_deg)) 
      }} -->

        <!-- Popup to display airport information -->
        <!-- <l-popup>
          <div>
            <h3>{{ airport.name }}</h3>
            <p>{{ airport.gps_code }}, {{ airport.country_name }}</p>
          </div>
        </l-popup> -->
      </l-marker>
      </l-map>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import SideBar from '@/components/SideBar.vue'
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker, LPolyline, LPopup  } from "@vue-leaflet/vue-leaflet";
  
  export default {
    name: 'opsm',
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LPolyline
    },
    data() {
        return {

          osmUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          osmAttribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          mapCenter: [51.1657, 10.4515], // Center coordinates for Germany
          airports: [],
          airportArray: [],
          coordinateArray: [
          [51.9444427490234, 7.77388906478881],
          [52.6616674, 12.745833],
          [52.628887, 11.818611],
          [48.009998 , 10.098611],
          [52.28464676, 10.36627494],
          [49.967777, 7.111944],
          [52.27816862, 9.917179757],
            
          ],
      };
    },
    mounted() {
      this.fetchAirports().then(() => {
    console.log("XXXXXXXXXXXXXXXXXXXXXX",this.airports); 
    
  // var airportArray = []
  // this.airports.forEach((airport)=>this.airportArray.push([airport.latitude_deg,airport.longitude_deg]))
  // console.log(airportArray)
  // return airportArray
  });
  },

  methods: {
  async fetchAirports() {
    try{
        const url = '/airport-filter-api/';
        const response = await axios.get(url)
        this.airports = response.data.results;
        this.airports.forEach((airport)=>this.airportArray.push([airport.latitude_deg,airport.longitude_deg]))
        console.log("osm data", this.airportArray)
        // console.log("osm data", response.data.results)
        // console.log("airports data", this.airports)
        // this.airports.forEach((airport) => {
        //   console.log("lat", airport.latitude_deg)

        // });
        return this.airportArray

      }catch (error) {
        console.error('Error fetching data:', error);
      }
    

    
  },
  }
    
  };
  </script>
  
  <style></style>

  
  