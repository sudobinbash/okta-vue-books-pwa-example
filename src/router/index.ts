import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import Auth from '@okta/okta-vue';

Vue.use(Auth, {
  issuer: 'https://frederico.oktapreview.com',
  client_id: '0oa153wiydzZI897W0h8',
  redirect_uri: window.location.origin + '/callback',
});

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "search" */ '../views/Home.vue')
    },
    {
      path: '/search',
      name: 'search',
      meta: {
        requiresAuth: true,
      },
      component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
    },
    {
      path: '/details',
      name: 'details',
      meta: {
        requiresAuth: true,
      },
      component: () => import(/* webpackChunkName: "details" */ '../views/Details.vue')
    },
    {
      path: '/callback',
      component: Auth.handleCallback()
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;