<template>
	<SideBar />
  

  <div class="container">
    <h5 class="mb-0">Airports In Germany</h5>
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
                    <option value="">Select Column</option>
                    <option v-for="column in columns" :value="column" :key="column">{{ column }}</option>
                  </select>
                </div>
                <div class="col">
                  
                  <select class="form-control" v-model="selectedCondition">
                    <option value="">Select Condition</option>
                    <option v-for="condition in conditions" :value="condition" :key="condition">{{ condition }}</option>
                  </select>
                </div>
                <div class="col">
                  <div class="form-control">
                    <input v-model="filterValue" placeholder="Value" />
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
                    <button class="btn btn-secondary mt-2 reset-button" @click="resetFilter">
                      Reset
                      <span class="material-icons align-middle">refresh</span>
                      
                    </button>
                  </div>
            </div>
          </div>
        </div>
    </div>
      




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
      columns: ['name', 'iata_code', 'Max_takeoff_weight'],
      conditions: ['<', '>', '<=', '>=', '=', 'contains', 'startswith'],
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
        const url = '/airport-filter-api/';
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
        apiKey: "AIzaSyDcaRNVcZiHLO_Aqw1nczE4AsoSvcV9ifc",
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
      // Polyline
      
      const flightPlanCoordinates = [
      { "lat": 52.36040907, "lng": 9.522576011 },
      { "lat": 52.54385334, "lng": 9.113210115 },
      { "lat": 52.02631308, "lng": 9.389745151 },
      { "lat": 52.53826412, "lng": 9.125265742 },
      { "lat": 52.28464676, "lng": 10.36627494 },
      { "lat": 52.37999634, "lng": 9.918148687 },
      { "lat": 52.27816862, "lng": 9.917179757 },
      { "lat": 53.41260688, "lng": 10.41499242 },
      { "lat": 53.21979277, "lng": 10.37877064 },
      { "lat": 52.5621144, "lng": 12.94164665 },
      { "lat": 52.6571363, "lng": 13.206103 },
      { "lat": 52.5397953, "lng": 13.70966975 },
      { "lat": 48.29149225, "lng": 11.37042631 },
      { "lat": 48.22126647, "lng": 11.81323293 },
      { "lat": 48.20680293, "lng": 11.86815636 },
      { "lat": 52.36772939, "lng": 10.76104042 },
      { "lat": 52.58976447, "lng": 13.49476343 },
      { "lat": 54.13909067, "lng": 13.68347698 },
      { "lat": 48.05204278, "lng": 11.29397278 },
      { "lat": 53.74112882, "lng": 9.984609878 },
      { "lat": 53.55512664, "lng": 10.15750576 },
      { "lat": 53.89516236, "lng": 9.202102663 },
      { "lat": 53.76627768, "lng": 9.988536655 },
      { "lat": 54.29142099, "lng": 9.726992751 },
      { "lat": 53.92183708, "lng": 9.344761017 },
      { "lat": 53.8517775, "lng": 9.344001814 },
      { "lat": 53.61899073, "lng": 9.529605148 },
      { "lat": 53.69063529, "lng": 9.776544836 },
      { "lat": 52.99324267, "lng": 10.38220111 },
      { "lat": 53.54281439, "lng": 9.501789712 },
      { "lat": 50.91684, "lng": 9.746150856 },
      { "lat": 50.99890908, "lng": 11.12285463 },
      { "lat": 51.00181331, "lng": 10.38594117 },
      { "lat": 53.56051607, "lng": 8.122642304 },
      { "lat": 53.60583422, "lng": 8.085650608 },
      { "lat": 53.62020262, "lng": 8.060057012 },
      { "lat": 52.2687359, "lng": 11.63891261 },
      { "lat": 52.58062784, "lng": 13.21152768 },
      { "lat": 52.56894701, "lng": 11.72735343 },
      { "lat": 53.90814702, "lng": 13.14339297 },
      { "lat": 53.08654406, "lng": 11.85310516 },
      { "lat": 53.8157752, "lng": 12.18698485 },
      { "lat": 52.40522844, "lng": 12.49936603 },
      { "lat": 52.4738227, "lng": 13.50612802 },
      { "lat": 52.23078186, "lng": 13.30575334 },
      { "lat": 52.53563432, "lng": 13.52419878 },
      { "lat": 52.52145177, "lng": 13.45643074 },
      { "lat": 52.53748099, "lng": 13.53702845 },
      { "lat": 52.20014201, "lng": 10.99933307 },
      { "lat": 52.16943334, "lng": 10.97723328 },
      { "lat": 51.0603669, "lng": 9.259383849 },
      { "lat": 49.00904348, "lng": 8.313340189 },
      { "lat": 48.09935573, "lng": 7.753495494 },
      { "lat": 49.25245975, "lng": 8.43846756 },
      { "lat": 49.29396659, "lng": 8.512111738 },
      { "lat": 49.35658226, "lng": 8.623209695 },
      { "lat": 48.9860882, "lng": 8.445542536 },
      { "lat": 48.89005253, "lng": 8.641584075 },
      { "lat": 53.03172161, "lng": 8.563744025 },
      { "lat": 53.42865121, "lng": 8.474707058 },
      { "lat": 53.20263529, "lng": 8.518881837 },
      { "lat": 53.10738831, "lng": 8.820024885 },
      { "lat": 48.70535272, "lng": 8.120618267 },
      { "lat": 48.17180357, "lng": 11.44077466 },
      { "lat": 50.34637221, "lng": 13.32640507 },
      { "lat": 49.63115224, "lng": 12.11476993 },
      { "lat": 53.09253613, "lng": 8.695160765 },
      { "lat": 49.97466868, "lng": 8.772442992 },
      { "lat": 49.63373577, "lng": 8.419371086 },
      { "lat": 49.98230509, "lng": 8.388556431 },
      { "lat": 51.74102028, "lng": 12.26217354 },
      { "lat": 51.40570318, "lng": 11.89426621 },
      { "lat": 51.82845168, "lng": 13.15709052 },
      { "lat": 51.87472353, "lng": 13.90243471 },
      { "lat": 51.58435922, "lng": 11.516555 },
      { "lat": 51.73635259, "lng": 8.70221847 },
      { "lat": 51.34300941, "lng": 8.992792439 },
      { "lat": 50.53487699, "lng": 11.64637869 },
      { "lat": 51.55381277, "lng": 14.47196547 },
      { "lat": 51.4137104, "lng": 14.50810921 },
      { "lat": 51.88886418, "lng": 14.42818053 },
      { "lat": 53.56400118, "lng": 8.141913836 },
      { "lat": 54.27554828, "lng": 10.15628252 },
      { "lat": 54.33952128, "lng": 10.17735414 },
      { "lat": 52.20286078, "lng": 7.034967966 },
      { "lat": 52.47679016, "lng": 7.308247816 },
      { "lat": 51.69649808, "lng": 7.060344762 },
      { "lat": 51.32495749, "lng": 6.674675359 },
      { "lat": 51.3556544, "lng": 6.723767179 },
      { "lat": 51.97032445, "lng": 7.545717753 },
      { "lat": 52.48179092, "lng": 7.304601207 },
      { "lat": 52.482426, "lng": 7.304338801 },
      { "lat": 52.75324262, "lng": 7.277153974 },
      { "lat": 52.34563578, "lng": 8.307756962 },
      { "lat": 52.27739678, "lng": 7.889576738 },
      { "lat": 52.46911151, "lng": 7.317849977 },
      { "lat": 49.58968987, "lng": 13.33528042 },

];
  //     const flightPath = new google.maps.Polyline({
  //         path: flightPlanCoordinates,
  //         geodesic: true,
  //         strokeColor: "#FF0000",
  //         strokeOpacity: 1.0,
  //         strokeWeight: 2,
  //       });

  // flightPath.setMap(map);
  // const gasCoordinates = [
  //       { lat: 52.461102, lng: 9.68508 },
  //       { lat: 51.6024017334, lng: 6.14216995239 },
  //       { lat: 53.047501, lng: 8.78667 },
  //     ];      
  // const gasPath = new google.maps.Polyline({
  //         path: gasCoordinates,
  //         geodesic: true,
  //         strokeColor: "#0000FF",
  //         strokeOpacity: 1.0,
  //         strokeWeight: 2,
  //       });

  //       gasPath.setMap(map);

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
    <strong>Airport ID:</strong> ${airport.id}<br>
    <strong>Airport Name:</strong> ${airport.name}<br>
    <strong>Latitude:</strong> ${airport.latitude_deg}<br>
    <strong>Longitude:</strong> ${airport.longitude_deg}<br>
    <strong>IATA Code:</strong> ${airport.iata_code}<br>
    <strong>GPS Code:</strong> ${airport.gps_code}<br>
    <strong>Country:</strong> ${airport.country_name}<br>
    <strong>airport link:</strong> ${airport.wikipedia_link}<br>
    <p>View Details:<a href="https://en.wikipedia.org/wiki/Frankfurt_Airport">' +
    "https://en.wikipedia.org/wiki/Frankfurt_Airport</a></p>
    
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