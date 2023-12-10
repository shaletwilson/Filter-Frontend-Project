// Your Vue.js component
<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileChange" />
    <button @click="uploadFile">Upload File</button>
  </div>
</template>

<script>
export default {
  name: 'fileuploadAircraft',
  methods: {
    handleFileChange() {
      this.file = this.$refs.fileInput.files[0];
    },
    async uploadFile() {
      const formData = new FormData();
      formData.append('file', this.file);

      try {
        const response = await fetch('/import-aircrafts/', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result.message);
        } else {
          console.error('Failed to import data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  },
  data() {
    return {
      file: null,
    };
  },
};
</script>
