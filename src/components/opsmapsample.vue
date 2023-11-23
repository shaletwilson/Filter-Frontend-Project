

  <template>
    <SideBar />
    <div class="row">
        <div class="col-md-12">
          <div class="card mx-auto col-md-8">
            <div class="card-header">
              <h5 class="mb-0">Filter</h5>
            </div>
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col">
                  
                  <select class="form-control" v-model="selectedColumn">
                    <option value="" disabled selected>Select Column</option>
                    <option v-for="column in columns" :value="column" :key="column">{{ column }}</option>
                  </select>
                </div>
                <div class="col">
                  
                  <select class="form-control" v-model="selectedCondition">
                    <option value="">Select Condition</option>
                    <option v-for="condition in conditions" :value="condition" :key="condition" >{{ condition }}</option>
                  </select>
                </div>
                <div class="col">
                  <div class="form-control">
                    <input v-model="filterValue" placeholder="Enter the Value" />
                  </div>
                </div>
            </div>
            </div>
              <div class="row button-row justify-content-center">
                  <div class="col-md-6 text-center" style="width: 17%;">
                    <button class="btn btn-success mt-2 filter-button" @click="fetchAirports">
                      Filter
                      <span class="material-icons align-middle">filter_alt</span>
                      
                    </button>
                  </div>
                  
                  <div class="col-md-6 text-right" style="width: 17%;">
                    <button class="btn btn-secondary mt-2 reset-button"  @click="resetFilter">
                      Reset
                      <span class="material-icons align-middle">refresh</span>
                      
                    </button>
                  </div>
            </div>
          </div>
        </div>
    </div>
    
      <p v-if="message" class="h4 text-danger">{{ this.message }}</p>

      <div v-if="loading" class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
    <div id="map">
      <l-map :key="mapKey" :zoom="8" :center="mapCenter">
        <l-tile-layer :url="osmUrl" :attribution="osmAttribution"></l-tile-layer>

        <l-icon :iconUrl="customIconUrl" :iconSize="[32, 32]" iconAnchor="[16, 32]" :popupAnchor="[0, -32]" :className="customIconClass" :id="customIconId"></l-icon>
        
       <div  v-for="(airport, index) in airports">
        <l-marker :lat-lng="{ lat: airport.geometry_coordinates[0], lng: airport.geometry_coordinates[1] }" :icon="createCustomIcon()">
          <l-popup>
            <strong>ID:</strong> {{ airport.id }}<br>
          <strong>Name:</strong> {{ airport.name }}<br>
          <strong>Latitude:</strong>{{ airport.geometry_coordinates[0] }}<br>
          <strong>Longitude:</strong>{{ airport.geometry_coordinates[1] }}<br>
          <strong>ICAO Code:</strong>{{ airport.icaoCode }}<br>
          <strong>Country:</strong>{{ airport.country }}<br>
          <!-- <strong>airport link:</strong><a :href="airport.wikipedia_link" target="_blank">Visit Airport Website</a><br> -->
          <strong>More Info:</strong><router-link :to="{ name: 'airport-details', params: { id: airport.id } }"><i class="material-icons">visibility</i></router-link>
        </l-popup>
        </l-marker>

        </div>
    
      </l-map>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import SideBar from '@/components/SideBar.vue'
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker, LPolyline, LPopup  } from "@vue-leaflet/vue-leaflet";
  import iconurl from '../assets/Airport-icon-bg.png'

  
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
          columns: ['name', 'icaoCode', 'MTOW'],
          conditions: ['<', '>', '<=', '>=', '=', 'contains', 'startswith'],
          loading: false,
          message: '',

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
    resetFilter() {
      this.selectedColumn = '';
      this.selectedCondition = '';
      this.filterValue = '';
      this.airports = ''
    },
    createCustomIcon() {
      return L.icon(this.customIconOptions);
    },
  async fetchAirports() {
    this.loading = true;
    this.message = "";
    try {
      let apiUrl = "airport-filter-api/";
      if (this.selectedColumn && this.selectedCondition && this.filterValue) {
            const queryParams = new URLSearchParams({
                column: this.selectedColumn,
                condition: this.selectedCondition,
                value: this.filterValue,
            });

            apiUrl += `?${queryParams.toString()}`;
        }

          const response = await axios.get(apiUrl);
      
        console.log('data from api', response.data)
        if(response.data.response == 'NO Data') {
            this.message = response.data.message;
          }
          else {
            this.airports = response.data.results;
            this.airports.forEach((airport)=>airport.geometry_coordinates=airport.geometry_coordinates.slice(2,-2).split(',').reverse())
          }

            // try{
    //     const url = 'airport-filter-api/';
    //     const response = await axios.get(url)
    //     this.airports = response.data.results;
    //     this.airports.forEach((airport)=>airport.geometry_coordinates=airport.geometry_coordinates.slice(2,-2).split(',').reverse())
      }catch (error) {
        console.error('Error fetching data:', error);
      }
      
      this.loading = false;

    
  },
  }
    
  };
  </script>
  
  <style>
#map {
  z-index: -99;
  position: absolute;
  height: 600px;
  width: 98%;
  /* padding-left: 100px; */
  margin-top: 5%;
  margin-left: 125px;
  /* margin-right: 10%; */
}</style>

  
  