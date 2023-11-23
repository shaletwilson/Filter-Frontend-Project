<template>
    <SideBar />
    <div class="container">
    <div class="card mt-4">
      <div class="card-header">
        <h2>Document Upload</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="row">
            <!-- Source Selection Column -->
            <div class="col-md-6">
              <div class="form-group">
                <label for="source">Select Source:</label>
                <select v-model="selectedSource" class="form-control" id="source">
                  <option value="">Select Source</option>
                  <option v-for="source in sources" :value="source" :key="source">{{ source }}</option>
                </select>
              </div>
            </div>

            <!-- File Upload Column -->
            <div class="col-md-6">
              <div class="form-group">
                <label for="file">Choose File:</label>
                <input type="file" @change="handleFileChange" class="form-control-file" id="file">
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="text-center mt-4">
            <button type="submit" class="btn btn-primary" :disabled="!selectedSource || !selectedFile">Upload Document</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Display Selected Source and File -->
    <div v-if="selectedSource && selectedFile" class="mt-4">
      <h3>Selected Source:</h3>
      <p>{{ selectedSource }}</p>

      <h3>Selected File:</h3>
      <p>{{ selectedFile.name }}</p>
    </div>
  </div>
</template>
  
  <script>
  import SideBar from '@/components/SideBar.vue'
  export default {
    name: 'fileupload',
    components: {
      SideBar,
    },
    data() {
      return {
        selectedSource: "",
        selectedFile: null,
        sources: ["Source A", "Source B", "Source C"], // Add your source options here
      };
    },
    methods: {
      handleFileChange(event) {
        this.selectedFile = event.target.files[0];
      },
      submitForm() {
        // Handle form submission logic here
        console.log("Selected Source:", this.selectedSource);
        console.log("Selected File:", this.selectedFile);
        // Add your logic for file upload and API call
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
  