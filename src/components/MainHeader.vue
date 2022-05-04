<script setup>
import { RouterLink } from 'vue-router'

</script>

<script>
export default {
  
}
</script>

<template>
  <header>
    <img src="@/assets/debricked-logo-light-theme.svg" />
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/customizer">Customizer</RouterLink>
    </nav>
  </header>
</template>

<style scoped>

header {
  display: flex;
  align-items: center;
  line-height: 1.5;
  max-height: 100vh;
  margin-bottom: 2rem;
  margin-top: 2rem;
}

header img {
  width: 10rem;
  height: auto;
}

nav {
  padding-left: 1rem;
}
nav a.router-link-exact-active {
  color: var(--active-color);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--border-color);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    font-size: 1rem;
  }
}

</style>
