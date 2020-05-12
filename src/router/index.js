import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList
  },
  {
    path: '/event:id',
    name: 'event-show',
    component: () =>
      import(/* webpackChunkName: "event-show" */ '../views/EventShow.vue'),
    props: true
  },
  {
    path: '/event/create',
    name: 'event-create',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "event-create" */ '../views/EventCreate.vue')
  },
  {
    path: '/event/:username',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
    props: true // $route.params is set as the component props
  }
]

const router = new VueRouter({
  // Uses browser's history.pushstate API to change URL w/o reloading page (removes hash)
  // supports ie10 and greater only
  // while using history mode: make sure production server is configured so that any route loads index.html
  //
  mode: 'history',
  routes
})

export default router
