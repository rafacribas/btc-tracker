import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import 'primevue/resources/themes/mira/theme.css'

const app = createApp(App)

app.use(createPinia(), PrimeVue)

app.mount('#app')
