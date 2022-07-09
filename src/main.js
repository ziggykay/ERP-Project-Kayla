import { createApp } from 'vue'
import App from './App.vue'
// import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "./styles/custom.scss"
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import router from './router' 

createApp(App).use(router).component('Datepicker', Datepicker).mount('#app')
