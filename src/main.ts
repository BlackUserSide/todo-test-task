import { createApp } from 'vue'
import './scss/main.scss'
import App from './App.vue'
import {createPinia} from "pinia";
import 'notyf/notyf.min.css'
const app = createApp(App)
const store = createPinia() // Init Pinia (Store-manager)
app.use(store)
app.mount('#app')
