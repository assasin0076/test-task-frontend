import './assets/main.css'
import router from './router/index'

import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'

createApp(App).use(router).mount('#app')
