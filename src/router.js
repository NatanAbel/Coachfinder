import { createRouter, createWebHashHistory } from 'vue-router';
import CoachLists from './pages/coaches/CoachLists.vue';
// import CoachDetails from './pages/coaches/CoachDetails.vue';
// import RegisterCoach from './pages/coaches/RegisterCoach.vue';
// import RequestsReceived from './pages/requests/RequestsReceived.vue';
// // import ContactCoach from './pages/requests/ContactCoach.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import store from "./store/index.js";

const CoachDetails = ()=>import('./pages/coaches/CoachDetails.vue')
const RegisterCoach = ()=>import('./pages/coaches/RegisterCoach.vue')
const UpdateCoach = ()=>import('./pages/coaches/UpdateCoach.vue')
const RequestsReceived = ()=>import('./pages/requests/RequestsReceived.vue')
const ContactCoach = ()=>import('./pages/requests/ContactCoach.vue')
const UserAuth = ()=>import('./pages/auth/UserAuth.vue')

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    {
      name: 'coaches',
      path: '/coaches',
      component: CoachLists,
    },
    {
      name:"coach-details",  
      path: '/coaches/:coachId',
      component: CoachDetails,
      props: true,
      children: [
        { name: 'contact', path: 'contact', component: ContactCoach },
      ],
    },
    {
      name:'update-coach',
      path: '/coaches/:coachId/update',
      component: UpdateCoach,
      props: true,
    },
    {
      name: 'register',
      path: '/register',
      component: RegisterCoach,
      meta:{requiresAuth: true},
    },
    {
      name: 'requests',
      path: '/requests',
      component: RequestsReceived,
      meta:{requiresAuth: true},
    },
    
    {
      name: 'auth',
      path: '/auth',
      component: UserAuth,
      meta:{requiresUnauth: true},
    },

    {
      name: 'not-found',
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, _, next)=>{
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
})

export default router;
