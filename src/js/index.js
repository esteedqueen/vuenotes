// loading manifest (webpack will simply copy it into ./dist)
require("../manifest.json");

import Vue from 'vue';
import App from './components/App.vue';
import Editor from './components/Editor.vue';
Vue.component('editor', Editor);

new Vue({
  el: 'body',
  render: h => h(App)
});