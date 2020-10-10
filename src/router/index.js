import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import ButtonClick from '@/components/example/ButtonPage.vue';
import { UserRouteService } from './user-routes.js';
Vue.use(VueRouter);
// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: userRoutes,
// });
// export default router;

const baseRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/button',
    name: 'ButtonClick',
    component: ButtonClick,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];
export const routes = baseRoutes.concat(UserRouteService);
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
export default router;
