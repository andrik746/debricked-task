<script>
import MainHeader from "@/components/MainHeader.vue";
import MainRouterConductor from "@/components/MainRouterConductor.vue";
import MainFooter from "@/components/MainFooter.vue";

import initUserStyles from "@/utils/initUserStyles";

export default {
  components: {
    MainHeader,
    MainRouterConductor,
    MainFooter,
  },
  mounted() {
    initUserStyles();
  },
};
</script>

<template>
  <div class="debricked-app">
    <MainHeader />
    <MainRouterConductor />
    <MainFooter style="margin-top: auto" />
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
