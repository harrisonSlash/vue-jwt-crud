import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

Vue.config.productionTip = false

import VueLogger from 'vuejs-logger';

import 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

const options = {
  isEnabled: true,
  logLevel : 'debug',
  stringifyArguments : false,
  showLogLevel : true,
  showMethodName : false,
  separator: '|',
  showConsoleColors: true
};

Vue.use(VueLogger, options);

//registramos HighCharts como Plugin
//Vue.use(HighchartsVue)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

/*new Vue({
  router,//Inyectamos el router para hacer la app consciente del enrutador
  render: h => h(App),
  el: '#app',
  template: '<App/>',
  components: { App }
}).$mount('#app');
*/