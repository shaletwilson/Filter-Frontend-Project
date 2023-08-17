<template>
  <SideBar />
  <div class="container">
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
                <div class="row">
                  <div class="row col-md-3 mx-auto">
                  <button class="btn btn-success mt-2" @click="fetchData">Filter<i class="material-icons">filter_alt</i></button>
                  </div>
                
                  <div class="row col-md-3 mx-auto">
                    <button class="btn btn-secondary mt-2" @click="resetFilter"><span class="material-icons">backspace</span>Reset</button>
                  </div>
              </div>
            </div>
          </div>
    </div>
      </div>

      <div v-if="loading" class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
      <p v-if="message" class="h4 text-danger">{{ this.message }}</p>
      
    <table  v-else class="table-fluid mx-auto mt-4" id="flight-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>ICAO code</th>
          <th>Manufacturer</th>
          <th>Type/ModelName</th>
          <th>Takeoff weight</th>
          <th>View Specification</th>
        </tr>
      </thead>
        
      <tbody>
        <tr v-for="flight in filteredFlights" :key="flight.icao_code">
          <td>{{ flight.id }}</td>
          <td>{{ flight.icao_code }}</td>
          <td>{{ flight.manufacturer }}</td>
          <td>{{ flight.type_model }}</td>
          <td>{{ flight.Max_takeoff_weight }}</td>
          <td>
            <router-link :to="{ name: 'details', params: { id: flight.id } }" class="button">
              <span class="material-icons">visibility</span>
            </router-link>
          </td>
          
        </tr>
      </tbody>
    
    </table>
    </div>
    
</template>

<script>
import axios from 'axios';
import SideBar from '@/components/SideBar.vue';


export default {
  name: 'TestFilter',
  components: {
    SideBar
  },
  data() {
    return {
      loading: false,
      flights: [],
      filteredFlights: [],
      selectedColumn: '',
      selectedCondition: '',
      filterValue: '',
      message: '',
      columns: ['icao_code', 'manufacturer', 'Max_takeoff_weight', 'type_model'],
      conditions: ['<', '>', '<=', '>=', '=', 'contains', 'startswith'],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        console.log("column", this.selectedColumn)
        console.log("selectedCondition", this.selectedCondition)
        console.log("filterValue", this.filterValue)
        const response = await axios.post('filter-api/', {
          column: this.selectedColumn,
          condition: this.selectedCondition,
          value: this.filterValue,
        });
        if(response.data.response == 'NO Data') {
            this.message = response.data.message;
          }
        else {
          this.filteredFlights = response.data.response;
          console.log("this.data", this.filteredFlights)
          this.message = response.data.message
        }
        
        

      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        this.loading = false;
      }
    },
    resetFilter() {
      this.selectedColumn = '';
      this.selectedCondition = '';
      this.filterValue = '';
      // this.filteredFlights = this.filteredFlights;
    },
  },
  
  
};

</script>

<style>

table {
  font-family: 'Open Sans', sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475C;
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475C;
  color: #FFF;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7D82A8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #D4D8F9;
}

.pagination-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

.pagination-controls {
  display: flex;
  align-items: center;
}

.pagination-controls button {
  margin-right: 10px;
}

.pagination-controls .next-button {
  margin-left: auto;
}

.pagination-info {
  text-align: center;
}

.pagination-page-num {
  text-align: right;
}


</style>