<template>
  <SideBar />
  <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card mx-auto col-md-8">
            <div class="card-header" @click="toggleFilter">
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
                  
                  <input
                    class="form-control"
                    v-model="filterValue"
                    :disabled="!selectedColumn || !selectedCondition"
                    type="text"
                    placeholder="Enter value"
                  />
                </div>
              </div>
                
                <div class="row col-md-3 mx-auto  ">
                  <button class="btn btn-secondary mt-2" @click="resetFilter">Reset</button>
                </div>
            </div>
          </div>
    </div>
      </div>
    
    <table class="table-fluid mx-auto mt-4" id="flight-table">
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

    <div class="pagination-container">
      <div class="row align-items-center">
        <div class="pagination-controls">
          <button class="button" @click="goToPreviousPage" :disabled="!prevPageUrl">
          <span class="material-icons">skip_previous</span>Previous</button>
          <button class="button next-button" @click="goToNextPage" :disabled="!nextPageUrl">
            Next<span class="material-icons">skip_next</span></button>
        </div>
      
      <div class="pagination-info">
        <p>Total records: {{ totalCount }}</p>
      </div>

      <div class="pagination-page-num">
        <p>{{ currentPage }} of {{ totalPages }} pages</p>
      </div>
    </div>
  </div>
    </div>
    
</template>

<script>
import axios from 'axios';
import SideBar from '@/components/SideBar.vue';

export default {
  name: 'Dashboard',
  components: {
    SideBar
  },
  data() {
    return {
      pageSize: 100, 
      currentPage: 1, 
      totalPages: 1, 
      totalCount: 0,
      nextPageUrl: null,
      prevPageUrl: null,
      showFilter: false,
      flights: [],
      filteredFlights: [],
      selectedColumn: '',
      selectedCondition: '',
      filterValue: '',
      columns: ['icao_code', 'manufacturer', 'Max_takeoff_weight'],
      conditions: ['<', '>', '<=', '>=', '=', 'Contains', 'startswith'],
    };
  },
  mounted() {
    this.fetchFlightData();
  },
  methods: {
    goToNextPage() {
      if (this.nextPageUrl) {
        this.currentPage += 1;
        this.fetchFlightData();
      }
    },
    goToPreviousPage() {
      if (this.prevPageUrl) {
        this.currentPage -= 1;
        this.fetchFlightData();
      }
    },
    
    async fetchFlightData() {
      try {
        
        const response = await axios.get(`/flight-list/?page=${this.currentPage}`); 
        console.log(response)
        this.flights = response.data.results;
        this.totalPages = Math.ceil(response.data.count / this.pageSize);
        this.totalCount = response.data.count;
        this.nextPageUrl = response.data.next;
        this.prevPageUrl = response.data.previous;
        
      } catch (error) {
        console.error('Error fetching flight data:', error);
      }
    },
    toggleFilter() {
        this.showFilter = !this.showFilter;
      },
    applyFilter() {
        console.log("Inside filter")
        const column = this.selectedColumn;
        const condition = this.selectedCondition;
        const value = this.filterValue;
  
        if (column && condition && value !== '') {
          this.filteredFlights = this.flights.filter((flight) => {
            switch (condition) {
              case '<':
                return parseFloat(flight[column]) < parseFloat(value);
              case '>':
                return parseFloat(flight[column]) > parseFloat(value);
              case '<=':
                return parseFloat(flight[column]) <= parseFloat(value);
              case '>=':
                return parseFloat(flight[column]) >= parseFloat(value);
              case '=':
                return flight[column].toString().toLowerCase() === value.toLowerCase();
              case 'Contains':
                return flight[column].toString().toLowerCase().includes(value.toLowerCase());
              case 'startswith':
                return flight[column].toString().toLowerCase().startsWith(value.toLowerCase());
              
              default:
                return true;
            }
          });
        } 
      },

    resetFilter() {
      this.selectedColumn = '';
      this.selectedCondition = '';
      this.filterValue = '';
      this.filteredFlights = this.flights;
    },
  },
  computed: {
    
    
    // Updated filteredFlights to handle filtering
    filteredFlights() {
      if (!this.selectedColumn || !this.selectedCondition || !this.filterValue) {
        // If no filter is selected, show all flights
        return this.flights;
      }
      
      const column = this.selectedColumn;
      const condition = this.selectedCondition;
      const value = this.filterValue;

      // Apply filtering based on the selected column, condition, and value
      return this.flights.filter((flight) => {
        switch (condition) {
          case '<':
            return parseFloat(flight[column]) < parseFloat(value);
          case '>':
            return parseFloat(flight[column]) > parseFloat(value);
          case '<=':
            return parseFloat(flight[column]) <= parseFloat(value);
          case '>=':
            return parseFloat(flight[column]) >= parseFloat(value);
          case '=':
            return flight[column].toString().toLowerCase() === value.toLowerCase();
          case 'Contains':
              return flight[column].toString().toLowerCase().includes(value.toLowerCase());
          case 'startswith':
          return flight[column].toString().toLowerCase().startsWith(value.toLowerCase());
          default:
            return true;
        }
      });
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