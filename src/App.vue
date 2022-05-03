<script setup>
import { RouterView } from 'vue-router'

</script>

<script>
import MainHeader from '@/components/MainHeader.vue'
import axios from '@/axiosConfig.js'

export default {
  data () {
    return {
      loginLoading: false
    }
  },
  mounted () {
    this.simulateLogin()
  },
  methods: {
    simulateLogin() {
      // setup credentials or warn user to provide them
      const hardcodedUsername = localStorage.getItem('username')
      const hardcodedPassword = localStorage.getItem('password')
      if (!hardcodedUsername || !hardcodedPassword) {
        console.error('Please, add password and username to the local storage')
        return
      }

      this.loginLoading = true

      // reset previous token
      localStorage.setItem('token', '')

      axios.post('login_check', {
        _username: hardcodedUsername,
        _password: hardcodedPassword
      }).then(r => {
        if (r.data?.token) localStorage.setItem('token', r.data.token)
      }).catch(e => {
        console.log(e)
      }).finally(() => { 
        this.loginLoading = false
      })
    }
  }
}
</script>

<template>
  <MainHeader />
  <div v-if="loginLoading">Logging in...</div>

  <RouterView v-else />
</template>

<style>
@import '@/assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

a {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
