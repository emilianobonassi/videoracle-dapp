import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RequestView from '../views/RequestView.vue'
import SeeRequestsView from '../views/SeeRequestsView.vue'
import RequestDetailView from '../views/RequestDetailView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/request',
    name: 'RequestView',
    component: RequestView
  },
  {
    path: '/see-requests',
    name: 'SeeRequests',
    component: SeeRequestsView
  },
  {
    path: "/see-requests/:id",
    name: "RequestDetail",
    component: RequestDetailView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
