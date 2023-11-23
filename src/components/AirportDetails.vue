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
                            <h5 class="card-title"><strong>ICAO Code</strong></h5>
                            <h6 class="card-text">{{ airportDetail.icaoCode }}</h6>
                        </div>
                        <div class="col-md-4 card-body text-dark">
                            <h5 class="card-title"><strong>Country</strong></h5>
                            <h6 class="card-text">{{ airportDetail.country }}</h6>
                        </div>
                    </div>
                <div class="row">
                    <div class="card col-md-4" >
                        <h5 class="card-title" style="background-color: var(--primary);"><strong>General Info</strong></h5>
                        <div class="card-body text-start" style="background-color: var(--primary-transparent);">
                            <div class="row">
                                <div class="col-md-12"><h6><strong>Magnetic Declination : </strong>{{ airportDetail.magneticDeclination }}</h6></div>
                                <div class="col-md-12"><h6> <strong>contact : </strong>{{ airportDetail.contact }}</h6></div>
                                
                            </div>
                            
                            <div class="row">
                                <div class="col-md-12"><h6><strong>latitude_deg : </strong>{{ airportDetail.geometry_coordinates[0]  }}</h6></div>
                                <div class="col-md-12"><h6><strong>longitude_deg : </strong>{{ airportDetail.geometry_coordinates[1]  }}</h6></div>

                            </div>
                            
                        </div>
                    </div>
                    
                    <div class="card col-md-4" >
                        <h5 class="card-title" style="background-color: var(--primary);"><strong>General Info</strong></h5>
                        <div class="card-body text-start" style="background-color: var(--primary-transparent);">
                            <div class="row">
                                <div class="col-md-12"><h6><strong>Elevation Value : </strong>{{ airportDetail.elevation_value }}</h6></div>
                                <div class="col-md-12"><h6> <strong>skydiveActivity : </strong>{{ airportDetail.skydiveActivity }}</h6></div>
                                
                            </div>
                            
                            <div class="row">
                                <div class="col-md-12"><h6><strong>services_fuelTypes : </strong>{{ airportDetail.services_fuelTypes[0]  }}</h6></div>
                                <div class="col-md-12"><h6><strong>services_gliderTowing : </strong>{{ airportDetail.services_gliderTowing[0]  }}</h6></div>

                            </div>
                            
                        </div>
                    </div>

                    <div class="card col-md-4" >
                        <h5 class="card-title" style="background-color: var(--primary);"><strong>ATS Communication Facilities</strong></h5>
                        
                        <div v-for="(item, index) in frequency_set" :key="index">
                            <div class="card-body text-start" style="background-color: var(--primary-transparent);">
                                <div class="row">
                                    <div class="col-md-12"><h6><strong>Frequency type : </strong>{{ item.frequency_type }}</h6></div>
                                    <div class="col-md-12"><h6> <strong>Name : </strong>{{ item.name }}</h6></div>
                                    
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-12"><h6><strong>Frequency Value : </strong>{{ item.value  }}</h6></div>
                                    <div class="col-md-12"><h6><strong>Public Use : </strong>{{ item.publicUse  }}</h6></div>

                                </div>
                            </div>
                            <br>
                            
                        </div>
                    </div>
                    
                    
                </div>
                <br>
                <br>
                    <h5 class="card-title" style="background-color: var(--primary);"><strong>Runway Info</strong></h5>
                    <div class="row">
                        <div v-for="(item, index) in runway_set" :key="index">
                            <div class="row">
                        
                            <div class="card col-md-4" >
                                <div class="card-body text-start" style="background-color: var(--primary-transparent);">
                                    <div class="row">
                                        <h4><strong>General Info</strong></h4>
                                        <div class="col-md-12"><h6><strong>designator : </strong>{{ item.designator }}</h6></div>
                                        <div class="col-md-12"><h6> <strong>trueHeading : </strong>{{ item.trueHeading }}</h6></div>
                                                                
                                        <div class="col-md-12"><h6><strong>operations : </strong>{{ item.operations  }}</h6></div>
                                        <div class="col-md-12"><h6><strong>mainRunway : </strong>{{ item.mainRunway  }}</h6></div>
                                        <div class="col-md-12"><h6><strong>alignedTrueNorth : </strong>{{ item.alignedTrueNorth  }}</h6></div>

                                    </div>
                                    
                                    
                                </div>
                                
                                
                            </div>
                            
                            <div class="card col-md-4" >
                                <div class="card-body text-start" style="background-color: var(--primary-transparent);">
                                    <div class="row">
                                        <h4><strong>Surface Info</strong></h4>
                                        <div class="col-md-12"><h6><strong>surface_composition : </strong>{{ item.surface_composition }}</h6></div>
                                        <div class="col-md-12"><h6> <strong>surface_mainComposite : </strong>{{ item.surface_mainComposite }}</h6></div>
                                                                
                                        <div class="col-md-12"><h6><strong>operations : </strong>{{ item.operations  }}</h6></div>
                                        <div class="col-md-12"><h6><strong>mainRunway : </strong>{{ item.mainRunway  }}</h6></div>
                                        <div class="col-md-12"><h6><strong>surface_condition : </strong>{{ item.surface_condition  }}</h6></div>
                                        <div class="col-md-12"><h6><strong>MTOW(In Ton) : </strong>{{ item.surface_mtow_value  }}</h6></div>

                                    </div>
                                    
                                    
                                </div>
                                
                                
                            </div>
                            <div class="card col-md-4" >
                                <div class="card-body text-start" style="background-color: var(--primary-transparent);">
                                    <div class="row">
                                        <h4><strong>Declared Distance</strong></h4>
                                        <div class="col-md-12"><h6><strong>Length(m) : </strong>{{ item.dimension_length_value }}</h6></div>
                                        <div class="col-md-12"><h6> <strong>Width(m) : </strong>{{ item.dimension_width_value }}</h6></div>
                                                                
                                        <div class="col-md-12"><h6><strong>TORA : </strong>{{ item.declaredDistance_tora_value  }}</h6></div>
                                        <div class="col-md-12"><h6><strong>LDA : </strong>{{ item.declaredDistance_lda_value  }}</h6></div>
                                        <div class="col-md-12"><h6><strong>surface_condition : </strong>{{ item.surface_condition  }}</h6></div>
                                        <div class="col-md-12"><h6><strong>Source : </strong>Open AIP</h6></div>

                                    </div>
                                    
                                    
                                </div>
                                
                                
                            </div>
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
            airportDetail: null,
            frequency_set: null,
            runway_set: null,
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
          console.log("DATA FROM API CCCCCCC", response.data)
          this.airportDetail = response.data;
          this.airportDetail.geometry_coordinates = this.airportDetail.geometry_coordinates.slice(2,-2).split(',').reverse()
          this.airportDetail.services_fuelTypes = this.airportDetail.services_fuelTypes.slice(2,-2).split(',').reverse()
          this.airportDetail.services_gliderTowing = this.airportDetail.services_gliderTowing.slice(2,-2).split(',').reverse()

          console.log("FREQUENCY SET")
          console.log(this.airportDetail.runway_set)
          this.frequency_set = this.airportDetail.frequency_set
          this.runway_set = this.airportDetail.runway_set
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
  