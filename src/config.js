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
  EntElectricIndextable: apiPath + 'EntElectric.aspx/indextable',
  // 车间用电量
  // 设备用电量
  // 能效指标
  EntTotalIndexchart: apiPath + 'EntTotal.aspx/indexchart',
  EntTotalIndextable: apiPath + 'EntTotal.aspx/indextable',
  // 实时监测
  SSContorlIndexchart: apiPath + 'SSContorl.aspx/indexchart',
  SSContorlIndextable: apiPath + 'SSContorl.aspx/indextable',
  // 异常报警
  AlermAppIndextable: apiPath + 'AlermApp.aspx/indextable'
}

const apiDict = {

}

const apiStatus = {
  success: '0'
}

export { api, apiDict, apiStatus }
