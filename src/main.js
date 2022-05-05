import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import separate ui components instead of the whole livrary
import { Progress, Button, Upload, Select, Spin } from 'ant-design-vue'

// plugin for global events
import mitt from 'mitt'
const emitter = mitt()

const app = createApp(App)
app.config.globalProperties.emitter = emitter;

app.use(router)
app.use(Progress).use(Button).use(Upload).use(Select).use(Spin)

app.mount('#app')
