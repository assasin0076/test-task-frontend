import { createMemoryHistory, createRouter } from 'vue-router'

import ListView from '../views/ListView.vue'

const routes = [
    { path: '/', component: ListView },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router