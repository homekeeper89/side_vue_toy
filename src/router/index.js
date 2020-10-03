import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
// import ButtonClick from '@/components/example/ButtonPage.vue';
// import UserRegister from '@/components/user/UserRegister.vue';
import { userRoutes } from './UserRoutes.js';
Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: userRoutes,
});
export default router;

// const routes = [
//   { path: '/registerUser', component: UserRegister },
//   {
//     path: '/',
//     name: 'Home',
//     component: Home,
//   },
//   {
//     path: '/button',
//     name: 'ButtonClick',
//     component: ButtonClick,
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ '../views/About.vue'),
//   },
// ];
// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes,
// });
// console.log(userRouter, router);
// export default router;
