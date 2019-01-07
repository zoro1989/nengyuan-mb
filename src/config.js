// let apiPath = '/api/';
// let apiPath = 'http://47.95.14.172:8088/web/';
// let apiPath = 'http://rancode.jymenu.com/';
let apiPath = 'app/'
const api = {
  // 能源总览
  EntMainIndexchart: apiPath + 'EntMain.aspx/indexchart',
  EntMainIndextable: apiPath + 'EntMain.aspx/indextable',
  // 企业用电量
  EntElectricIndexchart: apiPath + 'EntElectric.aspx/indexchart',
  EntElectricIndextable: apiPath + 'EntElectric.aspx/indextable'
}

const apiDict = {

}

const apiStatus = {
  success: '0'
}

export { api, apiDict, apiStatus }
