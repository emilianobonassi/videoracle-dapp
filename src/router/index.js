import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RequestView from '../views/MakeRequestView.vue'
import SeeRequestsView from '../views/SeeRequestsToAnswerView.vue'
import RequestDetailView from '../views/AnswerRequestView.vue'
import MyRequestsView from '../views/MyRequestsView.vue'
import VoteAnswersView from '../views/VoteAnswersView.vue'


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
    path: '/answerable-requests',
    name: 'SeeRequests',
    component: SeeRequestsView
  },
  {
    path: "/answerable-requests/:id",
    name: "RequestDetail",
    component: RequestDetailView
  },
  {
    path: '/my-requests',
    name: "MyRequests",
    component: MyRequestsView
  },
  {
    path: '/vote-answers/:id',
    name: "VoteAnswersView",
    component: VoteAnswersView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
