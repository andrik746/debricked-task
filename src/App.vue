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
    this.initUserStyles()
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
    },
    initUserStyles () {
      document.documentElement.setAttribute('theme', localStorage.getItem('theme') || 'light')
      document.documentElement.setAttribute('font', localStorage.getItem('font') || 'medium')
    }
  }
}
</script>

<template>
  <div v-if="loginLoading">Logging in...</div>

  <div v-else>
    <MainHeader />
    <RouterView />
  </div>
</template>

<style>
@import '@/assets/base.css';

/* styles for components from the ant-design library */
@import 'ant-design-vue/lib/progress/style/index.css';
@import 'ant-design-vue/lib/button/style/index.css';
@import 'ant-design-vue/lib/upload/style/index.css';
@import 'ant-design-vue/lib/result/style/index.css';
@import 'ant-design-vue/lib/select/style/index.css';


</style>
