<template>
    <SideBar />
    <div class="container">
        <div class="row inline-row">
            <div v-if="flightDetail">
                <div class="card border-dark mb-4 rounded mx-auto col-md-12" >
                    <div class="card-header" style="background-color: var(--dark); color: var(--light);"> 
                        <h3><strong>Aircraft Specification</strong></h3>
                    </div>
                    <div class="row" >
                        <div class="col-md-4 card-body text-dark">
                            <h5 class="card-title"><strong>ICAO Code</strong></h5>
                            <h6 class="card-text">{{ flightDetail.icao_code }}</h6>
                        </div>
                        <div class="col-md-4 card-body text-dark">
                            <h5 class="card-title"><strong>Manufacturer</strong></h5>
                            <h6 class="card-text">{{ flightDetail.manufacturer }}</h6>
                        </div>
                        <div class="col-md-4 card-body text-dark">
                            <h5 class="card-title"><strong>Model/Type</strong></h5>
                            <h6 class="card-text">{{ flightDetail.type_model }}</h6>
                        </div>
                    </div>
                <div class="row">
                    <div class="card col-md-4" >
                        <h5 class="card-title" style="background-color: var(--primary);"><strong>Performance</strong></h5>
                        <div class="card-body text-start" style="background-color: var(--primary-transparent);">
                            <div class="row">
                                <div class="col-md-12"><h6><strong>Wake Category : </strong>{{ flightDetail.wake }}</h6></div>
                                <div class="col-md-12"><h6> <strong>Crew Minimum : </strong>{{ flightDetail.crew_min }}</h6></div>
                                
                            </div>
                            <div class="row">
                                <div class="col-md-12"><h6> <strong>Minimum PAX : </strong>{{ flightDetail.PAX_min }}</h6></div>
                                <div class="col-md-12"><h6><strong>Maximum PAX : </strong>{{ flightDetail.PAX_max }}</h6></div>
                                
                                
                            </div>
                            <div class="row">
                                <div class="col-md-12"><h6><strong>Speed : </strong>{{ flightDetail.speed }}</h6></div>
                                <div class="col-md-12"><h6><strong>Range : </strong>{{ flightDetail.range }}</h6></div>

                            </div>
                            <div class="row">
                                <div class="col-md-12"><h6><strong>Engine Power : </strong>{{ flightDetail.engine_power }}</h6></div>
                                <div class="col-md-12"><h6><strong>Engine Model : </strong>{{ flightDetail.engine_model }}</h6></div>
                            </div>
                            <div class="row">
                                <div class="col-md-12"><h6><strong>Propulsion : </strong>{{ flightDetail.propulsion }}</h6></div>
                                <div class="col-md-12"><h6><strong>Service Ceiling : </strong>{{ flightDetail.service_ceiling }}</h6></div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="card col-md-4">
                            <h5 class="card-title" style="background-color: var(--primary);"><strong>Weights and Dimensions</strong></h5>
                        <div class="card-body text-start" style="background-color: var(--primary-transparent);">

                            <div class="row">
                                <div class="col-md-12"><h6><strong>Empty Weight : </strong>{{ flightDetail.empty_weight }}</h6></div>
                                <div class="col-md-12"><h6><strong>Max Takeoff Weight : </strong>{{ flightDetail.Max_takeoff_weight }}</h6></div>
                                
                            </div>
                            <div class="row">
                                <div class="col-md-12"><h6><strong>Wing Span : </strong>{{ flightDetail.wing_span }}</h6></div>
                                <div class="col-md-12"><h6><strong>Wing Area : </strong>{{ flightDetail.wing_area }}</h6></div>

                            </div>
                            <div class="row">
                                <div class="col-md-12"><h6><strong>Length : </strong>{{ flightDetail.length }}</h6></div>
                                <div class="col-md-12"><h6><strong>Height : </strong>{{ flightDetail.height }}</h6></div>
                            </div>
                        </div>
                    </div>  
                    <div class="card col-md-4">
                            <h5 class="card-title" style="background-color: var(--primary);"><strong>History and Production</strong></h5>
                        <div class="card-body text-start" style="background-color: var(--primary-transparent);">

                            <div class="row">
                                <div class="col-md-12"><h6><strong>First Flight : </strong>{{ flightDetail.first_flight }}</h6></div>
                                <div class="col-md-12"><h6><strong>Production Status : </strong>{{ flightDetail.production_status }}</h6></div>
                                
                            </div>
                            <div class="row">
                                <div class="col-md-12"><h6><strong>Total Production : </strong>{{ flightDetail.total_production }}</h6></div>
                                <div class="col-md-12"><h6><strong>Data for Version : </strong>{{ flightDetail.data_for_version }}</h6></div>
                                
                            </div>
                            <div class="row">
                                <div class="col-md-12"><h6><strong>Variants : </strong>{{ flightDetail.variants }}</h6></div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        
        </div>
        
    </div>
    <div class="row col-md-2 mx-auto">
    <router-link  to="/dashboard" class="button btn" style="background-color: var(--dark); color: white;">
        <strong>Back to Dashboard </strong>
        <span class="material-icons  align-middle">reply</span>
    </router-link> 
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
        margin-right: 25%;
    }

    .mb-4 {
        margin-bottom: 1.5rem!important;
        margin-top: 12px;
}

</style>
  