import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// import separate ui components instead of the whole livrary
// we will import css files for these components in App.vue
import { Progress, Button, Upload, Select, Spin, Table } from "ant-design-vue";

// plugin for global events
// we use global events instead of global state (vuex) because our app is small
import mitt from "mitt";
const emitter = mitt();

const app = createApp(App);
app.config.globalProperties.emitter = emitter;

app.use(router);
// add components from the ui library as global components
app.use(Progress).use(Button).use(Upload).use(Select).use(Spin).use(Table);

app.mount("#app");
