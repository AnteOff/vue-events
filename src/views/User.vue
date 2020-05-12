<template>
  <div class="user">
    <h1>This is {{username}}'s page</h1>
  </div>
</template>

<script>
export default {
  // instad of $route.params.username, we accept props. This component can be easily reused (more modular)
  // as a child component for example, sending username as a prop
  props: ['username']
}
</script>

<style scoped>
</style>