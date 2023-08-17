<template>
  <body style="background-color: #010e31;">
    <section class="vh-100">
      <div class="container">
          <div class="card col-xl-5 col-md-8 p-5 mx-auto">
            <form @submit.prevent="submitForm" class="rounded-5">    
  
            <div v-if="errors.wrong_credentials" class="form-group">
              <small class="text-danger">{{ errors.wrong_credentials }}</small>
            </div>
  
            <div class="mb-4">
              <img width="150" src="../assets/logo.png">
            </div>
            <div class="row mb-4 h3">
              <span class="text-center">Create Account </span>
            </div>
            <div class="form-outline mb-4">
            <input class="form-control" v-model="username" type="username" placeholder="Username" name="username">
            <small v-if="errors.username" class="text-danger">{{ errors.username }}</small>
            </div>
  
            <div class="form-outline mb-4">
              <input class="form-control" v-model="password" type="password" placeholder="Password" name="password">
              <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
            </div>
            <div class="form-outline mb-4">
              <input class="form-control" v-model="password2" type="password" placeholder="Repeat Password" name="password2">
              <small v-if="errors.password2" class="text-danger">{{ errors.password2 }}</small>
            </div>
  
  
              <button type="submit" class="btn btn-primary btn-block">Sign Up</button>
              <div class="mt-2">
                Already have an account ? <router-link class="text-decoration-none" to="/">Click Here </router-link>
                </div>
          </form>
      </div>
      </div>
    </section>
  </body>
  </template>
  
  
  <script>
    import axios from 'axios';
  
  export default {
    name: 'SignUp',
    data() {
      return {
        username: "",
        password: "",
        password2: "",
        errors: {
          username: "",
          password: "",
          wrong_credentials: "",
          password2: "",
        }
        
      }
    },
    methods: {
      isValidForm() {
        let valid = true;
        if(!this.username) {
          this.errors.username = "The field cannot be balnk:";
        }
        else {
          this.errors.username = "";
        }
        if(!this.password) {
          this.errors.password = "The field cannot be balnk:";
        }
        else {
          this.errors.password = "";
        }
        if(this.password && this.password2 && this.password != this.password2) {
          this.errors.password2 = "Passwords mismatched";
        }
        else {
          this.errors.password2 = "";
        }
        if(this.errors.username || this.errors.password || this.errors.password2) {
          valid = false;
        }
        return valid;
  
      },
      submitForm() {
        if(this.isValidForm()) {
          const formData = {
            username: this.username,
            password: this.password,
            password2: this.password2,
         }
          const url = '/auth/users/';
          axios.post(url, formData)
          .then(response => {
            console.log(response.data);
            this.$router.push('/');
            this.username = "";
            this.password = "";
            this.password2 = "";
            })
          .catch(error => {
            console.log(error.response.data);
            if(error.response.data.username) {
                this.errors.username = error.response.data.username.join('');
            }
            else {
                this.errors.username = '';
            }
            if(error.response.data.password) {
                this.errors.password = error.response.data.password.join('');
            }
            else {
                this.errors.password = '';
            }
          })
        }
        else {
            console.log("not valid")

        }
      }
  
    }
  }
  </script>
  
  
  
  <style>
  .middle-content {
        height: 100vh;
  }
  </style>