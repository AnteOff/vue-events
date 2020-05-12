<template>
  <div>
    <h1>Create an Event, {{user.name}}</h1>
    <p>This event was created by {{user.id}}</p>
    <p>There are {{catLength}} categories</p>
    <p>{{ getEventById(2) }}</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{cat}}</li>
    </ul>
    <input v-model.number="incrementBy" type="number" />
    <button @click="incrementCount">Increment</button>
    <span>{{count}}</span>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      incrementBy: null
    }
  },
  methods: {
    incrementCount() {
      this.$store.dispatch('updateCount', this.incrementBy)
    }
  },
  computed: {
    /** can mapGetters instead of doing this
    catLength() {
      return this.$store.getters.catLength
    },
    getEvent() {
      return this.$store.getters.getEventById
    },**/
    ...mapGetters(['getEventById', 'catLength']),
    ...mapState(['user', 'categories', 'count']) //can pass in an object to name our mapstate if we wanted
  }
}
</script>

<style scoped>
</style>