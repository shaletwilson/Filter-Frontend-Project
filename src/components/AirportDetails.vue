<template>
    <SideBar />
    <div class="container">
        <div class="row inline-row">
            <div v-if="airportDetail">
                <div class="card border-dark mb-4 rounded mx-auto col-md-12" >
                    <div class="card-header" style="background-color: var(--dark); color: var(--light);"> 
                        <h3><strong>Airport Information</strong></h3>
                    </div>
                    <div class="row" >
                        <div class="col-md-4 card-body text-dark">
                            <h5 class="card-title"><strong>Airport Name</strong></h5>
                            <h6 class="card-text">{{ airportDetail.name }}</h6>
                        </div>
                        <div class="col-md-4 card-body text-dark">
                            <h5 class="card-title"><strong>IATA Code</strong></h5>
                            <h6 class="card-text">{{ airportDetail.iata_code }}</h6>
                        </div>
                        <div class="col-md-4 card-body text-dark">
                            <h5 class="card-title"><strong>Country</strong></h5>
                            <h6 class="card-text">{{ airportDetail.country_name }}</h6>
                        </div>
                    </div>
                <div class="row">
                    <div class="card col-md-4" >
                        <h5 class="card-title" style="background-color: var(--primary);"><strong>Other Info</strong></h5>
                        <div class="card-body text-start" style="background-color: var(--primary-transparent);">
                            <div class="row">
                                <div class="col-md-12"><h6><strong>Elevation Ft : </strong>{{ airportDetail.elevation_ft }}</h6></div>
                                <div class="col-md-12"><h6> <strong>Region : </strong>{{ airportDetail.region_name }}</h6></div>
                                
                            </div>
                            <div class="row">
                                <div class="col-md-12"><h6> <strong>scheduled_service : </strong>{{ airportDetail.scheduled_service }}</h6></div>
                                <div class="col-md-12"><h6><strong>wikipedia_link : </strong>{{ airportDetail.wikipedia_link }}</h6></div>
                                
                                
                            </div>
                            <div class="row">
                                <div class="col-md-12"><h6><strong>latitude_deg : </strong>{{ airportDetail.latitude_deg }}</h6></div>
                                <div class="col-md-12"><h6><strong>longitude_deg : </strong>{{ airportDetail.longitude_deg }}</h6></div>

                            </div>
                            <!-- <div class="row">
                                <div class="col-md-12"><h6><strong>Engine Power : </strong>{{ airportDetail.name.engine_power }}</h6></div>
                                <div class="col-md-12"><h6><strong>Engine Model : </strong>{{ airportDetail.name.engine_model }}</h6></div>
                            </div>
                            <div class="row">
                                <div class="col-md-12"><h6><strong>Propulsion : </strong>{{ airportDetail.name.propulsion }}</h6></div>
                                <div class="col-md-12"><h6><strong>Service Ceiling : </strong>{{ airportDetail.name.service_ceiling }}</h6></div>
                                
                            </div> -->
                        </div>
                    </div>
                    
                    
                </div>
                </div>
            </div>
        
        </div>
        
    </div>
    <div class="row col-md-2 mx-auto">
    
    </div>
    
   
</template>

  
  <script>
  import axios from 'axios';
  import SideBar from '@/components/SideBar.vue';
  export default {
    name: 'AirportDetails',
    components: {
        SideBar
    },
    data() {
        return {
            airportDetail: null
        };
    },
    mounted() {
        this.fetchairportDetail();
    },
    methods: {
        
        fetchairportDetail() {
        const aiportId = this.$route.params.id;
        console.log("ID", aiportId)
    //   const aiportId = 105;

      axios.get(`/airport-detail-api/${aiportId}/`)
        .then(response => {
          this.airportDetail = response.data;
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
  