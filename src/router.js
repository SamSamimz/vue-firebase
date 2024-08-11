import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/components/Home.vue'
import FirebasePosts from '@/components/FirebasePosts.vue'

const routes = [
    { path: '/', component: HomeView },
  { path: '/firebase', component: FirebasePosts },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;