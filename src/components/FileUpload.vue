<template>
  <SideBar />
  <div class="container ">
    <div class="row justify-content-center">
      <div>
        <h3>Instructions</h3>
        <h5><i>
          * For uploading Aircraft data, 
          <a :href="sampleFileLink" download="flight_data_sample.xlsx">For sample format click here</a><br>
          * For uploading Airport Data, please select the source either from AIP or Other source. <br>
          * For AIP use JSON file. for other source choose excel file or CSV <br>
        </i></h5>
      </div>
    </div>
  <div class="row justify-content-center" style="display: flex;">
    <div class="card mt-4 col-md-8" style="z-index: 0;">
      <div class="card-header" style="background-color: var(--dark); color: white;">
        <h2>Document Upload</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm" id="fileUploadForm">
          <div class="row">
            <!-- Source Selection Column -->
            <div class="col-md-4">
              <div class="form-group">
                <select v-model="selectuploadtype" @change="uploadTypeSelect" class="form-control" id="uploadType">
                  <option value="">Select Upload Type</option>
                  <option v-for="value in uploadtypes" :value="value" :key="value">{{ value }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <select v-model="selectedSource" class="form-control" id="source">
                  <option value="">Select Source</option>
                  <option v-for="source in sources" :value="source" :key="source">{{ source }}</option>
                </select>
              </div>
            </div>

            <!-- File Upload Column -->
            <div class="col-md-4">
              <div class="form-group">
                <input type="file" @change="handleFileChange" class="form-control-file" id="file">
                <span style="color: red; font-size: 10pt;"> <i>Allowed file extensions - csv, xlsx, xls</i> </span>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="text-center mt-4">
            <button @click="uploadFile" type="submit" style="background-color: var(--primary); color: white;" class="btn" :disabled=" !selectedFile">Upload Document</button>
          </div>
        </form>
      </div>
    </div>
    
  </div>
  <div class="row justify-content-center" style="display: flex; margin-top: 20px;">
    <div class="alert alert-success alert-dismissible fade col-md-8" id="successAlert" role="alert">
      <strong>Data imported successfully</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>  
    <div class="alert alert-danger alert-dismissible fade col-md-8" id="errorAlert" role="alert">
      <strong>Failed to import data</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div> 
  </div>
  

  <!-- Display Selected Source and File -->
  
</div>
</template>

<script>
import axios from 'axios';
import SideBar from '@/components/SideBar.vue'
export default {
  name: 'fileupload',
  components: {
    SideBar,
  },
  data() {
    return {
      
      selectedSource: "",
      selectuploadtype: "",
      selectedFile: null,
      sources: ["From AIP", "Other Source"], 
      uploadtypes: ["Airport Data", "Aircraft Data"],
    };
  },
  methods: {
    uploadTypeSelect(event){
      if (this.selectuploadtype == "Aircraft Data"){
        document.getElementById("source").style.display = "none"
      }
      else{
        document.getElementById("source").style.display = "block"
      }
    },
    handleFileChange(event) {
        this.selectedFile = event.target.files[0];

        if (this.selectedFile) {
          // Get the file extension
          const fileExtension = this.selectedFile.name.split('.').pop().toLowerCase();

          // Allowed file extensions
          const allowedExtensions = ['csv', 'xlsx', 'xls'];

          // Check if the selected file extension is allowed
          if (!allowedExtensions.includes(fileExtension)) {
            alert('Invalid file. Please select a CSV or Excel file.');
            // Clear the file input to allow selecting another file
            document.getElementById('file').value = '';
          } 
        }
      },
    async uploadFile() {
      
      
      if (this.selectuploadtype == "Airport Data"){
        var formData = {
          "file": this.selectedFile,
          "selectedSource":this.selectedSource
        }
        try {
          const response = await axios.post('/import-aircrafts/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log("reponse", response)

          if (response.status == 200) {
            console.log(response.data.message);
            document.getElementById("successAlert").classList.add("show");
          } else {
            console.error(response);
            document.getElementById("errorAlert");
          }
        } catch (error) {
          console.error('Error:', error);
          document.getElementById("errorAlert");
        }
      }
      else if (this.selectuploadtype == "Flight Data"){
        var formData = {
          "file": this.selectedFile,
        }
        try {
          const response = await axios.post('/import-aircrafts/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log("reponse", response)

          if (response.status == 200) {
            console.log(response.data.message);
            document.getElementById("successAlert").classList.add("show");
          } else {
            console.error(response);
            document.getElementById("errorAlert");
          }
        } catch (error) {
          console.error('Error:', error);
          document.getElementById("errorAlert");
        }
      } 
    },
  },
};
</script>

<style>
.container {
max-width: 800px; /* Set your desired max-width */
margin: auto; /* Center the container */
}
</style>
