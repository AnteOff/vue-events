<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout) // future proofs compoenent, if we add a delete button without this it will still be running, potenially creating a memory leak
  },
  methods: mapActions('notification', ['remove']),
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}` // evaluate to '-text-error' or '-text-success'
    }
  }
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>