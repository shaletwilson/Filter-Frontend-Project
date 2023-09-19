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
                <div v-for="(filter, index) in filters" :key="index" class="row align-items-center">
  <!-- Column select -->
                <div class="col">
                  <select class="form-control" v-model="filter.column">
                    <option value="">Select Column</option>
                    <option v-for="column in columns" :value="column" :key="column">{{ column }}</option>
                  </select>
                </div>
  <!-- Condition select -->
                  <div class="col">
                    <select class="form-control" v-model="filter.condition">
                      <option value="">Select Condition</option>
                      <option v-for="condition in conditions" :value="condition" :key="condition">{{ condition }}</option>
                    </select>
                  </div>
  <!-- Value input -->
                    <div class="col">
                      <div class="form-control">
                        <input v-model="filter.value" placeholder="Value" />
                      </div>
                    </div>
  <!-- Add filter button -->
                    <div class="col">
                      <button class="btn btn-danger" @click="removeFilter(index)">Remove</button>
                    </div>
      </div>
      <div class="col"><button class="btn btn-primary" @click="addFilter">Advance Filter</button>
</div>
              </div>
              <div class="row button-row justify-content-center">
                  <div class="col-md-6 text-center" style="width: 17%;">
                    <button class="btn btn-success mt-2 filter-button" @click="fetchData">
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
        <tr v-for="flight in filteredFlights" :key="flight.id">
          <td>{{ flight.id }}</td>
          <td>{{ flight.icao_code }}</td>
          <td>{{ flight.manufacturer }}</td>
          <td>{{ flight.type_model }}</td>
          <td>{{ flight.Max_takeoff_weight }}</td>
          <td>
            <router-link :to="{ name: 'details', params: { id: flight.id } }" class="button text-center">
              <span style="color: var(--primary);" class="material-icons">visibility</span>
            </router-link>
          </td>
          
        </tr>
      </tbody>
    
    </table>
    
  <div class="pagination-container ">
    <div class="row md-12">
      <div class="pagination-controls justify-content-center">
        <nav aria-label="Page navigation example">
          <ul class="pagination pagination-md ">
            <li class="page-item">
              <button class="page-link " :class="{disabled:currentPage==1}" @click="goToPage(currentPage-1)" :disabled="!prevPageUrl" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            <li v-if="currentPage > 1" @click="goToPage(currentPage-1)" class="page-item"><span class="btn page-link">{{ currentPage-1}}</span></li>
            <li class="page-item"><span class="btn page-link active ">{{ currentPage }}</span></li>
            <li v-if="currentPage < totalPages" class="page-item"><span class="btn page-link" @click="goToPage(currentPage+1)">{{ currentPage+1}}</span></li>
            <li v-if="currentPage == 1" class="page-item" @click="goToPage(currentPage+2)"><span class="btn page-link">{{ currentPage+2}}</span></li>
            <li class="page-item">
              <button class="page-link" :class="{disabled:currentPage==totalPages}"  @click="goToPage(currentPage+1)" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
    <div class="row pagination-info">
        <span>{{ currentPage }} of {{ totalPages }} pages</span>
        <span>Total records : {{ totalCount }}</span>
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
      filters: [],
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
    addFilter() {
      console.log("in add filter")
      this.filters.push({
        column: '',
        condition: '',
        value: '',
      });
    },
    removeFilter(index) {
      this.filters.splice(index, 1);
    },
    goToPage(page) {
      if (this.nextPageUrl) {
        window.scrollTo(0,0);
        this.currentPage = page;
        this.fetchData();
      }
    },

    async fetchData() {
      this.loading = true;
      this.message = "";
      try {
        const queryParams = new URLSearchParams({
          column: this.selectedColumn,
          condition: this.selectedCondition,
          value: this.filterValue,
          page: this.currentPage,
        });
        
        const response = await axios.get(`/single-filter-api/?${queryParams.toString()}`);
        

        // const response = await axios.post('filter-api/', {
        //   column: this.selectedColumn,
        //   condition: this.selectedCondition,
        //   value: this.filterValue,
        // });
        // console.log("dataccccccccccccccccccccccc")
        // console.log(response.data.results)
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
          console.log("filteredFlights");
          console.log(this.filteredFlights);
        }
        
        

      } 
      
      catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        this.loading = false;
      }
      try {
        console.log("in try")

        const filterData = this.filters.map(filter => ({
          column: filter.column,
          condition: filter.condition,
          value: filter.value,
        }));
        console.log("data", filterData)
        const queryParams = new URLSearchParams({
          filters: JSON.stringify(filterData),
          page: this.currentPage,
        });
  
        const response = await axios.get(`/filter-api/?${queryParams.toString()}`);
        console.log("response", response)
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
          console.log("filteredFlights");
          console.log(this.filteredFlights);
        }
  
      } catch (error) {
        console.error('Error fetching data:', error);
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
.button-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px; 
}



table {
  font-family: 'Open Sans', sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid var(--dark);
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: center;
  background: var(--dark);
  color: #FFF;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: center;
  padding: 8px;
  border-right: 2px solid var(--dark-transparent);
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
  margin-bottom: 20px; 
  margin-left: 346px;
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