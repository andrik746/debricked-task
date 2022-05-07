<script setup>
import { RouterView } from "vue-router";
import LoginSimulator from "@/components/LoginSimulator.vue";
</script>

<script>
export default {
  name: "MainRouterConductor",
  components: { LoginSimulator },
  data() {
    return {
      isLogged: false,
      results: [], // results on top level to keep them alive when traveling between pages
    };
  },
  mounted() {
    this.emitter.on("new-result", this.handleNewResult);
  },
  beforeUnmount() {
    this.emitter.off("new-result", this.handleNewResult);
  },
  methods: {
    handleNewResult(result) {
      this.results.push(result);
    },
  },
};
</script>
<template>
  <LoginSimulator @login="isLogged = true" />
  <RouterView v-if="isLogged" :results="results" />
</template>
