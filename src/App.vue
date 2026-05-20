<template>
  <div id="app-workspace">
    <!-- This RouterView component is the dynamic portal where LoginView and DashboardView switch out -->
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
/* Global resets to keep your application looking clean and modern */
body {
  margin: 0;
  padding: 0;
  background-color: #121214;
  color: #e1e1e6;
  font-family: system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}

#app-workspace {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>