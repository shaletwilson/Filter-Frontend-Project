import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import SignUp from '../views/SignUpView.vue'
import Dashboard from '../views/Dashboard.vue'
import AirportMap from '../views/AirportMap'
import HomeView from '../views/HomeView.vue'
import LogInView from '../views/LogInView.vue'
import Details from '../views/DetailsView.vue'
import AirportDetails from '../views/AirportDetailsView.vue'
import opsm from '../views/OPSM.vue'
import UploadView from '../views/UploadView.vue'
import InfraView from '../views/InfraView'

const routes = [
  {
    path: '/login',
    name: 'LogInView',
    component: LogInView
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignUp
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  }, 
  {
    path: '/airport',
    name: 'AirportMap',
    component: AirportMap
  }, 
  {
    path: '/airports',
    name: 'opsm',
    component: opsm
  },
  {
    path: '/infra',
    name: 'InfraView',
    component: InfraView
  },
  {
    path: '/file-upload',
    name: 'UploadView',
    component: UploadView
  },
  {
    // path: '/details',
    path: '/details:id',
    name: 'details',
    component: Details
  },
  {
    path: '/airport-details:id',
    name: 'airport-details',
    component: AirportDetails
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: (to, from, next) => {
      // Execute logout logic here, such as clearing local storage
      localStorage.clear();
      // Redirect the user to the login page or any other desired page after logout
      next('/login');
    },
  }, 
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const protectedRoutes = [
  'dashboard',
  'Home'
]

router.beforeEach((to, from, next) => {
  const isProtected = protectedRoutes.includes(to.name);
  if(isProtected && !localStorage.getItem('token')) {
    next ({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
  
  else {
    next();
  }
  
})

export default router
