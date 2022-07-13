import { createApp} from 'vue'
import App from './App.vue'
import router from './router' 
// import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "./styles/custom.scss"
// data-picker
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// e-chart
import * as echarts from 'echarts'
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart,  BarChart, LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from "echarts/components";	

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);	

// table
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

createApp(App).use(router).component('Datepicker', Datepicker).component('v-chart', echarts).use(VXETable)
.mount('#app')
