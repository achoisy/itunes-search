import Vue from 'vue';
import AllIosIcon from 'vue-ionicons/dist/ionicons';
import App from './App';

Vue.use(AllIosIcon);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
});
