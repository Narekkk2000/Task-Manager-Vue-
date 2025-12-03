import './assets/main.css'
import router from "@/router";
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import {useUserStore} from "../stores/user";
import App from './App.vue'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)
const userStore = useUserStore()
await userStore.fetchUser()
app.mount('#app')
