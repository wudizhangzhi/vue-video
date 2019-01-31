import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';
import App from './App';
import routes from './router';
import store from './store/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// window.Hls = require('hls.js');

Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({
  routes
});

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app');
