import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import {i18n} from './i18n.js'

const emitter = mitt()
const app = createApp(App)
app.config.globalProperties.emitter = emitter
app.use(router)
app.use(i18n)
app.mount('#app')