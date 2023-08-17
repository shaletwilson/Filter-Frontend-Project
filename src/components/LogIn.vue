<template>
  <body style="background-color: #010e31;">
  <div class="container">
    <section class="vh-100" >
            <div class="card col-xl-5 col-md-8 p-5 mx-auto  mt-5">
          <form @submit.prevent="submitForm" class="rounded-5">    

          <div v-if="errors.wrong_credentials" class="form-group">
            <small class="text-danger">{{ errors.wrong_credentials }}</small>
          </div>

          <div class="mb-4">
            <img width="150" src="../assets/logo.png">
          </div>
          <div class="row mb-4 h3">
            <span class="text-center">Login </span>
          </div>
          <div class="form-outline mb-4">
          <input class="form-control" v-model="username" type="username" placeholder="Username" name="username">
          <small v-if="errors.username" class="text-danger">{{ errors.username }}</small>
          </div>

          <div class="form-outline mb-4">
            <input class="form-control" v-model="password" type="password" placeholder="Password" name="password">
            <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
          </div>

          <div class="row mb-4">
              <div class="col d-flex justify-content-center">
                <!-- Checkbox -->
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                  <label class="form-check-label" for="form1Example3">
                    Remember me
                  </label>
                </div>
              </div>

              
            </div>

            <button type="submit" class="btn btn-primary btn-block">Login</button>
            <div class="mt-2">
              <router-link class="text-decoration-none" to="/signup">Click Here </router-link>To Register
              </div>
        </form>
    </div>
    </section>
  </div>
</body>
</template>


<script>
  import axios from 'axios';

export default {
  name: 'LogIn',
  data() {
    return {
      username: "",
      password: "",
      errors: {
        username: "",
        password: "",
        wrong_credentials: ""
      }
      
    }
  },
  methods: {
    isValidForm() {
      console.log(this.username)
      let valid = true;
      if(!this.username) {
        this.errors.username = "The field cannot be blank:"
      }
      else {
        this.errors.username = ""
      }
      if(!this.password) {
        this.errors.password = "The field cannot be blank:"
      }
      else {
        this.errors.password = ""
      }
      if(this.errors.username || this.errors.password) {
        valid = false
      }
      return valid

    },
    submitForm() {
      if(this.isValidForm()) {
        const formData = {

          username: this.username,
          password: this.password,
       }
        const url = '/login/';
        axios.post(url, formData)
        .then(response => {
          if (response.data.token && response.data.user_id) {
          console.log('Login successful');
          
          this.$router.push('/');
        } else {
         
          console.log('Login failed');
        }
         
          this.$store.commit('setToken', response.data);
          this.username = "";
          this.password = "";
        })
        .catch(error => {
          console.log(error);
          if(error.reponse.data.non_field_errors) {
            this.errors.wrong_credentials = error.response.data.non_field_errors.join('');
  
          }
          else {
            this.errors.wrong_credentials = "";
          }
        })
      }
    }

  }
}
</script>


<style scoped>

/* Add custom styles for the login page here */
#intro {
  background-color: bisque;
}

/* Height for devices larger than 576px */
@media (min-width: 992px) {
  #intro {
    margin-top: -58.59px;
  }
}

.navbar .nav-link {
  color: #fff !important;
}
      
</style>/






