<script>
import { simulateLoginRequest } from "@/services/LoginService";
import handleError from "@/utils/handleError";

export default {
  name: "LoginSimulator",
  emits: ["login"],
  data() {
    return {
      loginLoading: false,
    };
  },
  mounted() {
    this.simulateLogin();
  },
  methods: {
    async simulateLogin() {
      try {
        // reset previous token
        localStorage.setItem("token", "");

        this.loginLoading = true;

        const response = await simulateLoginRequest();
        if (response.data?.token) {
          localStorage.setItem("token", response.data.token);
          this.$emit("login");
        }
      } catch (e) {
        // todo: we could add a warning if the login failes
        handleError(e);
      } finally {
        this.loginLoading = false;
      }
    },
  },
};
</script>
<template>
  <div class="login-simulator" v-if="loginLoading">
    <div class="mb-1">
      <a-spin class="login-simulator__loader" />Logging in...
    </div>
  </div>
</template>

<style scoped>
.login-simulator__loader {
  margin-right: 1rem;
}
</style>
