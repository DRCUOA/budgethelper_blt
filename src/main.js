import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import axios from 'axios'

// Configure axios
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
axios.defaults.withCredentials = true

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')