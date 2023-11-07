

  <template>
    <SideBar />

    <div id="map">
      <l-map :key="mapKey" :zoom="8" :center="mapCenter">
        <l-tile-layer :url="osmUrl" :attribution="osmAttribution"></l-tile-layer>

        <l-icon :iconUrl="customIconUrl" :iconSize="[32, 32]" iconAnchor="[16, 32]" :popupAnchor="[0, -32]" :className="customIconClass" :id="customIconId"></l-icon>
        
       <div  v-for="(airport, index) in airports">
        <l-marker :lat-lng="{ lat: airport.latitude_deg, lng: airport.longitude_deg }" :icon="createCustomIcon()">
          <l-popup>
          <strong>Name:</strong> {{ airport.name }}<br>
          <strong>Latitude:</strong>{{ airport.latitude_deg }}<br>
          <strong>Longitude:</strong>{{ airport.longitude_deg }}<br>
          <strong>IATA Code:</strong>{{ airport.iata_code }}<br>
          <strong>GPS Code:</strong>{{ airport.gps_code }}<br>
          <strong>Country:</strong>{{ airport.country_name }}<br>
          <strong>airport link:</strong><a :href="airport.wikipedia_link" target="_blank">Visit Airport Website</a><br>
          <strong>More Info:</strong><router-link :to="{ name: 'airport-details', params: { id: airport.id } }"><i class="material-icons">visibility</i></router-link>
        </l-popup>
        </l-marker>

      </div>
    
      <!-- <l-marker
        v-for="(airport, index) in airportArray"
        :key="index"
        :lat-lng="{ lat: airport[0], lng: airport[1] }"
      >
      {{ console.log("data in template: ", airport[0], airport[1]) }}
      
      </l-marker> -->
      </l-map>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import SideBar from '@/components/SideBar.vue'
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker, LPolyline, LPopup  } from "@vue-leaflet/vue-leaflet";
  import iconurl from '../assets/Airport-icon.png'

  
  export default {
    name: 'opsm',
    components: {
      SideBar,
      LMap,
      LTileLayer,
      LMarker,
      LPolyline,
      LPopup
    },
    data() {
        return {

          osmUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          osmAttribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          mapCenter: [51.1657, 10.4515], // Center coordinates for Germany
          customIconOptions: {
            iconUrl: iconurl,
            iconSize: [32, 32],  // specify the size of the icon
            iconAnchor: [16, 32], // specify the anchor point of the icon
            popupAnchor: [0, -32], // specify the popup anchor
          },
          airports: [],
          airportArray: [],
          // coordinateArray: [
          // [51.9444427490234, 7.77388906478881],
          // [52.6616674, 12.745833],
          // [52.628887, 11.818611],
          // [48.009998 , 10.098611],
          // [52.28464676, 10.36627494],
          // [49.967777, 7.111944],
          // [52.27816862, 9.917179757],
            
          // ],
      };
    },
    mounted() {
      this.fetchAirports().then(() => {
    console.log("XXXXXXXXXXXXXXXXXXXXXX",this.airports); 
  });
  },

  methods: {
    createCustomIcon() {
      return L.icon(this.customIconOptions);
    },
  async fetchAirports() {
    try{
        const url = 'airport-list-api/';
        const response = await axios.get(url)
        this.airports = response.data.results;
        this.airports.forEach((airport)=>this.airportArray.push([airport.latitude_deg,airport.longitude_deg]))
        console.log("osm data", this.airportArray)
        return this.airportArray

      }catch (error) {
        console.error('Error fetching data:', error);
      }
    

    
  },
  }
    
  };
  </script>
  
  <style>
#map {
  height: 600px;
  width: 98%;
  /* padding-left: 100px; */
  margin-top: 5%;
  margin-left: 125px;
  /* margin-right: 10%; */
}</style>

  
  