<script setup>
import { RouterView } from "vue-router";
</script>

<script>
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";
import { simulateLoginRequest } from "@/services/LoginService";
import handleError from "@/utils/handleError";

export default {
  data() {
    return {
      loginLoading: false,
      results: [], // results on top level to keep them alive when traveling between pages
    };
  },
  mounted() {
    this.simulateLogin();
    this.initUserStyles();
    this.emitter.on("new-result", this.handleNewResult);
  },
  beforeUnmount() {
    this.emitter.off("new-result", this.handleNewResult);
  },
  methods: {
    handleNewResult(result) {
      this.results.push(result);
    },
    async simulateLogin() {
      try {
        // reset previous token
        localStorage.setItem("token", "");

        this.loginLoading = true;

        const response = await simulateLoginRequest();
        if (response.data?.token)
          localStorage.setItem("token", response.data.token);
      } catch (e) {
        // todo: we could add a warning if the login failes
        handleError(e);
      } finally {
        this.loginLoading = false;
      }
    },
    initUserStyles() {
      document.documentElement.setAttribute(
        "theme",
        localStorage.getItem("theme") || "light"
      );
      document.documentElement.setAttribute(
        "font",
        localStorage.getItem("font") || "medium"
      );
    },
  },
};
</script>

<template>
  <div class="debricked-app">
    <template v-if="loginLoading">
      <div class="debricked-app__loader-container">
        <a-spin class="debricked-app__loader" />Logging in...
      </div>
    </template>

    <template v-else>
      <MainHeader />
      <RouterView :results="results" />
      <MainFooter style="margin-top: auto" />
    </template>
  </div>
</template>

<style>
@import "@/assets/base.css";

/* styles for ui components from the ant-design library */
@import "ant-design-vue/lib/progress/style/index.css";
@import "ant-design-vue/lib/button/style/index.css";
@import "ant-design-vue/lib/upload/style/index.css";
@import "ant-design-vue/lib/result/style/index.css";
@import "ant-design-vue/lib/select/style/index.css";
@import "ant-design-vue/lib/spin/style/index.css";
@import "ant-design-vue/lib/table/style/index.css";
@import "ant-design-vue/lib/message/style/index.css";
</style>

<style scoped>
.debricked-app__loader-container {
  margin-top: 2rem;
}
.debricked-app__loader {
  margin-right: 1rem;
}
</style>
