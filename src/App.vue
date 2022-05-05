<script setup>
import { RouterView } from 'vue-router'

</script>

<script>
import MainHeader from '@/components/MainHeader.vue'
import {simulateLoginRequest} from '@/services/LoginService'
import handleError from '@/utils/handleError'

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
    async simulateLogin() {
      try {
        // reset previous token
        localStorage.setItem('token', '')
        this.loginLoading = true

        const response = await simulateLoginRequest()
        if (response.data?.token) localStorage.setItem('token', response.data.token)
      } catch (e) {
        handleError(e)
      } finally {
        this.loginLoading = false
      }
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
