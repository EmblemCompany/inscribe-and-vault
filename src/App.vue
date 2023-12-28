<template>
  <AppMenu />

  <div class="main">
    <div class="container">
      <router-view :key="route.fullPath" />
    </div>
  </div>

  <AppFooter />
</template>

<script setup>
import { useRoute } from 'vue-router'
import AppMenu from './components/Menu.vue'
import AppFooter from './components/Footer.vue'
const route = useRoute()
</script>

<style>
@import './css/modal.css';

.main {
  flex-grow: 1;
  margin: 6.5rem 0 2rem 0;
  background: linear-gradient(to left, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1));
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 2rem 3rem 2rem;
}

@media screen and (max-width: 768px) {
  .main {
    margin: 5.8rem 0 2rem 0;
  }
}
</style>
