import './assets/css/style.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router/auto'

import V3ScrollLock from 'v3-scroll-lock'

const app = createApp(App)

app.use(
  createRouter({
    history: createWebHistory()
  })
)
app.use(V3ScrollLock, {})

app.mount('#app')
