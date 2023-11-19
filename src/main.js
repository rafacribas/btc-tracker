import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia(), PrimeVue)
app.directive('tooltip', Tooltip)

app.mount('#app')
