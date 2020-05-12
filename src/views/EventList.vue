<template>
  <div>
    <!-- module.state.property -->
    <h1>Events for {{ user.user.name }}</h1>
    <!--
    <ol>
      <li
        v-for="notification in notification.notifications"
        :key="notification.id"
      >{{notification.message}}</li>
    </ol>
    -->
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="this.page != 1">
      <router-link :to="{name: 'event-list', query: {page: page - 1}}" rel="prev">Prev Page</router-link>|
    </template>
    <template>
      <router-link
        v-for="index in this.totalPages"
        :key="'B' + index"
        :to="{name: 'event-list', query: {page: index}}"
      >{{index}}</router-link>
    </template>|
    <template v-if="this.event.totalEvents > this.page * 3">
      <router-link :to="{name: 'event-list', query: {page: page + 1}}" rel="next">Next Page</router-link>
    </template>
    <BaseIcon />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
/**
 * look up caching these results, api gets called on every events page, may not want to constantly fetch
 */
export default {
  components: {
    EventCard
  },
  // call vuex action from the created life cycle hook
  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: 3,
      page: this.page // how do we send in a url query param to know what page we're on?
    })
  },
  // watch page computed property & call fetchEvent when it changes
  // reload components when URL changes including query params
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1 // i.e https://localhost:8080/?page=2
    },
    totalPages() {
      let total = this.event.totalEvents / 3
      return Math.ceil(total)
    },
    //$store.state.event = {events: [], totalEvents} since 'event' is referring to the module name
    ...mapState(['event', 'user', 'notification']) // access state via mapState helper
  }
}
</script>

<style scoped>
</style>