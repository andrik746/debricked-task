<script setup>
import { RouterLink } from "vue-router";
</script>

<script>
export default {
  data() {
    return {
      theme: localStorage.getItem("theme") || "light",
    };
  },
  mounted() {
    this.emitter.on("theme", this.setTheme);
  },
  beforeUnmount() {
    this.emitter.off("theme", this.setTheme);
  },
  methods: {
    setTheme(value) {
      this.theme = value;
    },
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <header>
    <img
      :src="`src/assets/debricked-logo-${theme}-theme.svg`"
      @click="goHome"
    />

    <nav>
      <RouterLink to="/">Scanner</RouterLink>
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
  cursor: pointer;
}

nav {
  padding-left: 1rem;
  font-size: 1rem;
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
  }

  nav {
    text-align: left;
  }
}
</style>
