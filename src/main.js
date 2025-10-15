// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Importamos nuestra configuración del router
import './assets/main.css' // Importamos los estilos globales

const app = createApp(App)

app.use(router) // Le decimos a Vue que use el router

app.mount('#app')
