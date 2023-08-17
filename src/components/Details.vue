<template>
    <SideBar />
    <div class="container">
        <div class="row inline-row">
            <div v-if="flightDetail">
                <div class="card border-dark mb-4 rounded mx-auto col-md-8" style="width: 50rem;" >
                    <div class="card-header bg-transparent border-dark"><h3>Aircraft Specification</h3></div>
                    <div class="row">
                        <div class="col-md-4 card-body text-dark">
                            <h5 class="card-title">ICAO Code</h5>
                            <p class="card-text">{{ flightDetail.icao_code }}</p>
                        </div>
                        <div class="col-md-4 card-body text-dark">
                            <h5 class="card-title">Manufacturer</h5>
                            <p class="card-text">{{ flightDetail.manufacturer }}</p>
                        </div>
                        <div class="col-md-4 card-body text-dark">
                            <h5 class="card-title">Model/Type</h5>
                            <p class="card-text">{{ flightDetail.type_model }}</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="card col-md-4" >
                        <div class="card-body">
                            <h3 class="card-title">Performance</h3>
                            <div class="row">
                                <div class="col-md-6"><h6>Wake Category</h6>{{ flightDetail.wake }}</div>
                                <div class="col-md-6"><h6>Crew Minimum</h6>{{ flightDetail.crew_min }}</div>
                                
                            </div>
                            <div class="row">
                                <div class="col-md-6"><h6>Minimum PAX</h6>{{ flightDetail.PAX_min }}</div>
                                <div class="col-md-6"><h6>Maximum PAX</h6>{{ flightDetail.PAX_max }}</div>
                                
                                
                            </div>
                            <div class="row">
                                <div class="col-md-6"><h6>Speed</h6>{{ flightDetail.speed }}</div>
                                <div class="col-md-6"><h6>Range</h6>{{ flightDetail.range }}</div>

                            </div>
                            <div class="row">
                                <div class="col-md-6"><h6>Engine Power</h6>{{ flightDetail.engine_power }}</div>
                                <div class="col-md-6"><h6>Engine Model</h6>{{ flightDetail.engine_model }}</div>
                            </div>
                            <div class="row">
                                <div class="col-md-6"><h6>Propulsion</h6>{{ flightDetail.propulsion }}</div>
                                <div class="col-md-6"><h6>Service Ceiling</h6>{{ flightDetail.service_ceiling }}</div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="card col-md-4">
                        <div class="card-body">
                            <h3 class="card-title">Weights and Dimensions</h3>

                            <div class="row">
                                <div class="col-md-6"><h6>Empty Weight</h6>{{ flightDetail.empty_weight }}</div>
                                <div class="col-md-6"><h6>Max Takeoff Weight</h6>{{ flightDetail.Max_takeoff_weight }}</div>
                                
                            </div>
                            <div class="row">
                                <div class="col-md-6"><h6>Wing Span</h6>{{ flightDetail.wing_span }}</div>
                                <div class="col-md-6"><h6>Wing Area</h6>{{ flightDetail.wing_area }}</div>

                            </div>
                            <div class="row">
                                <div class="col-md-6"><h6>Length</h6>{{ flightDetail.length }}</div>
                                <div class="col-md-6"><h6>Height</h6>{{ flightDetail.height }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="card col-md-4">
                        <div class="card-body">
                            <h3 class="card-title">History and Production</h3>

                            <div class="row">
                                <div class="col-md-6"><h6>First Flight</h6>{{ flightDetail.first_flight }}</div>
                                <div class="col-md-6"><h6>Production Status</h6>{{ flightDetail.production_status }}</div>
                                
                            </div>
                            <div class="row">
                                <div class="col-md-6"><h6>Total Production</h6> {{ flightDetail.total_production }}</div>
                                <div class="col-md-6"><h6>Data for Version</h6> {{ flightDetail.data_for_version }}</div>
                                
                            </div>
                            <div class="row">
                                <div class="col-md-6"><h6>Variants</h6> {{ flightDetail.variants }}</div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
        
    </div>
    <div class="row col-md-3 mx-auto">
    <button class="btn btn-dark mt-2"><router-link to="/dashboard" class="button">
        Back to Dashboard 
    </router-link></button>
    </div>
    
   
</template>

  
  <script>
  import axios from 'axios';
  import SideBar from '@/components/SideBar.vue';
  export default {
    name: 'Details',
    components: {
        SideBar
    },
    data() {
        return {
            flightDetail: null
        };
    },
    mounted() {
        this.fetchFlightDetail();
    },
    methods: {
    fetchFlightDetail() {
      const flightId = this.$route.params.id;
    //   const flightId = 21;

      axios.get(`/flight-detail/${flightId}/`)
        .then(response => {
          this.flightDetail = response.data;
        })
        .catch(error => {
          console.error("Error fetching flight detail:", error);
        });
    }
  }
  };
  </script>

<style scoped>
    .inline-row {
        display: flex;
        flex-wrap: wrap;
        flex: 1 1 auto;
        margin: -12px;
        padding-left: 138px;
    }
    .mt-2 {
        margin-top: 1.5rem!important;
    }


</style>
  