<template>
  <div class="main-container">
    <mt-header fixed title="实时监测">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="app-main">
      <div>
        <div class="line"><h2>{{pickerTypeValue}}可视化管理看板</h2></div>
        <div class="line"><span @click="popupVisible = true">{{pickerTypeValue}}</span></div>
        <div class="line">
          <h3>三相电流</h3>
          <line-chart :legendData="lineChartData.legendData" :seriesData="lineChartData.seriesData" :titleText="lineChartData.titleText" :xAxisData="lineChartData.xAxisData" />
        </div>
        <div class="line">
          <h3>状态</h3>
          <div class="line-item">总量：{{tableData.total}}</div>
          <div class="line-item">额定电流：{{tableData.edi}}</div>
          <div class="line-item">额定电压：{{tableData.edu}}</div>
          <div class="line-item">额定功率：{{tableData.edp}}</div>
          <div class="line-item">额定功率因数：{{tableData.edf}}</div>
          <div class="line-item">功率因数最大：{{tableData.PFmax}}</div>
          <div class="line-item">功率因数最小：{{tableData.PFmin}}</div>
          <div class="line-item">功率因数平均：{{tableData.PFavg}}</div>
          <div class="line-item">Imax：{{tableData.Imax}}</div>
          <div class="line-item">Iavg：{{tableData.Iavg}}</div>
          <div class="line-item">Imin：{{tableData.Imin}}</div>
          <div class="line-item">Pmax：{{tableData.Pmax}}</div>
          <div class="line-item">Pavg：{{tableData.Pavg}}</div>
          <div class="line-item">Pmin：{{tableData.Pmin}}</div>
          <!--<div class="line-item switch"><mt-switch v-model="isOpen">开关</mt-switch></div>-->
        </div>
        <!--<div class="flexable">-->
          <!--<div class="line">-->
            <!--<h3>峰值</h3>-->
            <!--<div class="line-item">昨天：<span>200</span></div>-->
            <!--<div class="line-item">今天：<span>200</span></div>-->
            <!--<div class="line-item">对比：<span>200</span></div>-->
          <!--</div>-->
          <!--<div class="line">-->
            <!--<h3>谷值</h3>-->
            <!--<div class="line-item">昨天：<span>200</span></div>-->
            <!--<div class="line-item">今天：<span>200</span></div>-->
            <!--<div class="line-item">对比：<span>200</span></div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
    <mt-popup
      v-if="devices.length > 0"
      class="type-picker"
      v-model="popupVisible"
      position="bottom">
      <mt-picker :slots="slots" ref="pickerType" :showToolbar="true" v-model="pickerTypeValue" @change="onValuesChange">
        <span class="mint-datetime-action mint-datetime-cancel" @click="popupVisible = false">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="lxConfirm">确认</span>
      </mt-picker>
    </mt-popup>
  </div>
</template>
<script>
import LineChart from 'components/Chart/LineChart'
import { api } from '@/config'
import fetch from 'utils/fetch'
let moment = require('moment')
moment.locale('zh-cn')
export default {
  components: {
    LineChart
  },
  created() {
    this.initData()
  },
  data() {
    return {
      pickerDateValue: (new Date()),
      pickerTypeValue: '',
      popupVisible: false,
      slots: [
        {
          flex: 1,
          values: [],
          textAlign: 'center'
        }
      ],
      lineChartData: [],
      tableData: {},
      isOpen: true,
      devices: []
    }
  },
  computed: {
    dispDate() {
      return moment(this.pickerDateValue).format('YYYY年MM月')
    },
    syscode() {
      let index = this.devices.findIndex((item) => {
        return item.name === this.pickerTypeValue
      })
      if (index >= 0) {
        return this.devices[index].id
      } else {
        if (this.devices.length > 0) {
          return this.devices[0].id
        } else {
          return ''
        }
      }
    }
  },
  methods: {
    initData() {
      fetch('post', api.DepatmentDevList, {}, false).then((res) => {
        this.devices = res.list
        this.slots[0].values = this.devices.map((item) => {
          return item.name
        })
        fetch('post', api.SSContorlIndexchart, {date: moment(this.pickerDateValue).format('YYYY-MM'), syscode: this.syscode}, false).then((res) => {
          this.lineChartData = res.data.line
        }).catch(() => {
        })
        fetch('post', api.SSContorlIndextable, {date: moment(this.pickerDateValue).format('YYYY-MM'), syscode: this.syscode}, false).then((res) => {
          this.tableData = res.data
        }).catch(() => {
        })
      }).catch(() => {
      })
    },
    openPikerDate() {
      this.$refs.pickerDate.open()
    },
    openPikerType() {
      this.$refs.pickerType.open()
    },
    goBack() {
      this.$router.go(-1)
    },
    onValuesChange(picker, values) {
      this.pickerTypeValue = values[0]
    },
    dateConfirm() {
      this.initData()
    },
    lxConfirm() {
      this.popupVisible = false
      this.initData()
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .main-container
    .app-main
      .chart-line
        background: #fff
        padding-top: 15px
      .flexable
        display: flex
        .line
          flex: 1
          margin-bottom: 0px
          &:nth-child(1)
            margin-right: 5px
          &:nth-child(2)
            margin-left: 5px
      .line
        padding: 10px
        box-sizing: border-box
        margin-bottom: 10px
        background: #fff
        .line-item
          height: 20px
          line-height: 20px
          &.switch
            margin: 10px 0
        h2
          font-size: 18px
        h3
          font-size: 16px
        h4
          height: 20px
          line-height: 20px
        h2, h3
          color: rgb(48, 65, 86)
          padding: 5px 0
          font-weight: bold
    .menu-pop
      height: 100%
      .menu-box
        position: relative
        height: 100%
        background-color: rgb(48, 65, 86)
        width: 180px
        .menu-item
          height: 56px;
          line-height: 56px;
          list-style: none;
          position: relative;
          white-space: nowrap;
          padding-left: 20px
          color: rgb(191, 203, 217)
          .svg-icon
            margin-right: 5px
          &.logout
            padding: 0
            height: 40px
            line-height: 40px
            margin-top: 30px
            background: #ef4f4f
            color: #fff
            position: absolute
            bottom: 0
            left: 0
            width: 100%
            text-align: center
          &.active
            color: rgb(64, 158, 255)
</style>
