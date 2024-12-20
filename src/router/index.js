import { createRouter, createWebHistory } from 'vue-router'
import CoachesList from '../pages/coaches/CoachesList.vue'
import CoachDetail from '../pages/coaches/CoachDetail.vue'
import CoachRegistration from '../pages/coaches/CoachRegistration.vue'
import RequestsRecived from '../pages/requests/RequestsRecived.vue'
import ContactCoach from '../pages/requests/ContactCoach.vue'
import NotFound from '../pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }]
    },
    { path: '/register', component: CoachRegistration },
    { path: '/requests', component: RequestsRecived },
    { path: '/:notFound(.*)', component: NotFound }
  ]
})

export default router
