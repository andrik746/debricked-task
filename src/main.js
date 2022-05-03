import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import separate ui components instead of the whole livrary
import { Progress, Button, Upload, Result } from 'ant-design-vue'

const app = createApp(App)

app.use(router)
app.use(Progress).use(Button).use(Upload).use(Result)

app.mount('#app')
