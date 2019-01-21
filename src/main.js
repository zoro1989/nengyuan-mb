import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCorvova from 'vue-cordova'
import '@/common/icons' // icon
import '@/common/js/permission' // permission control
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)

/* eslint-disable no-unused-vars */
// import VConsole from 'vconsole'
/* eslint-disable no-new */
// new VConsole()

Vue.use(MintUI)
Vue.use(VueCorvova)
Vue.config.productionTip = false
/* eslint-disable no-new */
// fastclick.attach(document.body)
// new Vue({
//   el: '#app',
//   router,
//   render: h => h(App)
// })
Vue.cordova.on('deviceready', () => {
  console.log('Cordova : device is ready !')
  fastclick.attach(document.body)
  new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })
  document.addEventListener('jpush.receiveRegistrationId', function (event) {
    console.log(event.registrationId)
  }, false)
  window.JPush.init()
  window.JPush.setDebugMode(true)
  getRegistrationID()
  document.addEventListener('jpush.openNotification', function (event) {
    let alertContent = ''
    if (window.device.platform === 'Android') {
      alertContent = event.alert
    } else {
      alertContent = event.aps.alert
    }
    alert(alertContent)
    console.log(alertContent)
    router.push('/warning')
  }, false)
})
function getRegistrationID() {
  window.JPush.getRegistrationID(onGetRegistrationID)
}
function onGetRegistrationID(data) {
  if (data.length === 0) {
    window.setTimeout(getRegistrationID, 1000)
  }
}
