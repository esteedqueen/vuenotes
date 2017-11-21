// loading manifest (webpack will simply copy it into ./dist)
require("../manifest.json");

import Vue from 'vue';
import App from './components/App.vue';

new Vue({
  el: 'body',
  render: h => h(App)
});