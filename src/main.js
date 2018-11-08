// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import '@/assets/reset.scss'
import '@/assets/common.scss'
import axios from 'axios'
import qs from 'qs'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(ElementUI)
Vue.use(VueQuillEditor)

Vue.prototype.$http = axios
Vue.prototype.$qs = qs

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.status == 10) {
      router.replace({
        path: '/',
        query: {redirect: router.currentRoute.fullPath}
      })
      return response;
    } else {
      return response;
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.replace({
              path: '/',
              query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
