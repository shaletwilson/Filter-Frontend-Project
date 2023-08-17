import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import "bootstrap/dist/css/bootstrap.min.css";
import 'vue3-easy-data-table/dist/style.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vue3EasyDataTable from 'vue3-easy-data-table';
// import BootstrapVue from 'bootstrap-vue';
import Paginate from 'vuejs-paginate';

import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000'

// createApp(App).use(store).use(router, axios).mount('#app')

// Vue.use(BootstrapVue);

// new Vue({
//     render: (h) => h(App),
//   }).$mount('#app');

const app = createApp(App);

// Register the 'EasyDataTable' component
app.component('EasyDataTable', Vue3EasyDataTable);

app.component('paginate', Paginate);

// Use plugins
app.use(store).use(router, axios);

// Mount the app to '#app' element
app.mount('#app');
