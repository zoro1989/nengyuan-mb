// let apiPath = '/api/';
// let apiPath = 'http://47.95.14.172:8088/web/';
// let apiPath = 'http://rancode.jymenu.com/';
let apiPath = 'https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin'
// let apiPath = '/'
const api = {
  userLogin: apiPath + '/user/login',
  userInfo: apiPath + '/user/info',
  userLogout: apiPath + '/user/logout'
}

const apiDict = {

}

const apiStatus = {
  success: 20000
}

export { api, apiDict, apiStatus }
