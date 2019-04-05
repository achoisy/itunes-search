import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import AllIosIcon from 'vue-ionicons/dist/ionicons';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(AllIosIcon);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
});
