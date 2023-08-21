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
              <div class="row button-row">
                  <div class="col-md-6 text-center">
                    <button class="btn btn-success mt-2 filter-button" @click="fetchData">
                      <span class="material-icons align-middle">filter_alt</span>
                      Filter
                    </button>
                  </div>
                  
                  <div class="col-md-6 text-right">
                    <button class="btn btn-secondary mt-2 reset-button" @click="resetFilter">
                      <span class="material-icons align-middle">backspace</span>
                      Reset
                    </button>
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
    
  <div class="pagination-container">
    <div class="row align-items-center">
      <div class="pagination-controls">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <button class="page-link" @click="goToPreviousPage" :disabled="!prevPageUrl" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            <li class="page-item"><span class="page-link">{{ currentPage }}</span></li>
            <li class="page-item">
              <button class="page-link" @click="goToNextPage" :disabled="!nextPageUrl" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
          <p>{{ currentPage }} of {{ totalPages }} pages</p>
        </nav>
        <div class="pagination-info">
        <p>Total records: {{ totalCount }}</p>
      </div>
      </div>
      
      
    </div>
  </div>


    <!-- <div class="pagination-container">
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
    </div> -->

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
      pageSize: 100, 
      currentPage: 1, 
      totalPages: 1, 
      totalCount: 0,
      nextPageUrl: null,
      prevPageUrl: null,
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
    goToNextPage() {
      if (this.nextPageUrl) {
        this.currentPage += 1;
        this.fetchData();
      }
    },
    goToPreviousPage() {
      if (this.prevPageUrl) {
        this.currentPage -= 1;
        this.fetchData();
      }
    },

    async fetchData() {
      this.loading = true;
      try {
        const queryParams = new URLSearchParams({
          column: this.selectedColumn,
          condition: this.selectedCondition,
          value: this.filterValue,
          page: this.currentPage,
        });

        const response = await axios.get(`/filter-api/?${queryParams.toString()}`);
        

        // const response = await axios.post('filter-api/', {
        //   column: this.selectedColumn,
        //   condition: this.selectedCondition,
        //   value: this.filterValue,
        // });
        console.log("dataccccccccccccccccccccccc")
        console.log(response.data.results)
        if(response.data.response == 'NO Data') {
            this.message = response.data.message;
          }
        else {
          this.filteredFlights = response.data.results;
          this.message = response.data.message;
          this.totalPages = Math.ceil(response.data.count / this.pageSize);
          this.totalCount = response.data.count;
          console.log("count", this.totalCount)
          this.nextPageUrl = response.data.next;
          this.prevPageUrl = response.data.previous;
          console.log("nextPageUrl", this.nextPageUrl)
          console.log("prevPageUrl", this.prevPageUrl)
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
      this.filteredFlights = '';
      this.currentPage = 1;
    },
  },
  
  
};

</script>

<style>

nav {
    padding: 27px;
    padding-left: 262px;
}

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

.button-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px; /* Adjust as needed */
}

.filter-button, .reset-button {
  display: flex;
  align-items: center;
}

.filter-button .material-icons, .reset-button .material-icons {
  margin-right: 10px; /* Adjust icon spacing */
}

p {
    margin-top: 0;
    margin-bottom: 1rem;
    margin-left: 106px;
}

</style>