import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Points to your src/router/index.js

const app = createApp(App)

app.use(router) // This activates the router engine
app.mount('#app')