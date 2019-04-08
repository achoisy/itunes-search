import Vue from 'vue';
// TODO: Import needed bootstrap modules
import BootstrapVue from 'bootstrap-vue';

// Loading only needed icons
import SearchIcon from 'vue-ionicons/dist/md-search.vue';
import VideacamIcon from 'vue-ionicons/dist/md-videocam.vue';
import MusicalNotesIcon from 'vue-ionicons/dist/md-musical-notes.vue';
import BookIcon from 'vue-ionicons/dist/md-book.vue';
import WifiIcon from 'vue-ionicons/dist/md-wifi.vue';
import TvIcon from 'vue-ionicons/dist/md-tv.vue';

import App from './App';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-ionicons/ionicons.css';

Vue.use(BootstrapVue);

Vue.component('md-search-icon', SearchIcon);
Vue.component('md-videocam-icon', VideacamIcon);
Vue.component('md-musical-notes-icon', MusicalNotesIcon);
Vue.component('md-book-icon', BookIcon);
Vue.component('md-wifi-icon', WifiIcon);
Vue.component('md-tv-icon', TvIcon);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
});
