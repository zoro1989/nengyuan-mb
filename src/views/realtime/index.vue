<template>
  <div class="main-container">
    <mt-header fixed title="实时监测">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="app-main">
      <div>
        <div class="line"><h2>空调设备可视化管理看板</h2></div>
        <div class="line"><span @click="popupVisible = true">{{pickerTypeValue}}</span></div>
        <div class="line">
          <h3>三相电流</h3>
          <line-chart :legendData="lineChartData.legendData" :seriesData="lineChartData.seriesData" :titleText="lineChartData.titleText" :xAxisData="lineChartData.xAxisData" />
        </div>
        <div class="line">
          <h3>状态</h3>
          <div class="line-item">额定电流le：200A</div>
          <div class="line-item">额定功率Pe</div>
          <div class="line-item">Imax</div>
          <div class="line-item">Iave</div>
          <div class="line-item">Imin</div>
          <div class="line-item">Pmax</div>
          <div class="line-item">Pave</div>
          <div class="line-item">Pmin</div>
          <div class="line-item switch"><mt-switch v-model="isOpen">开关</mt-switch></div>
        </div>
        <div class="flexable">
          <div class="line">
            <h3>峰值</h3>
            <div class="line-item">昨天：<span>200</span></div>
            <div class="line-item">今天：<span>200</span></div>
            <div class="line-item">对比：<span>200</span></div>
          </div>
          <div class="line">
            <h3>谷值</h3>
            <div class="line-item">昨天：<span>200</span></div>
            <div class="line-item">今天：<span>200</span></div>
            <div class="line-item">对比：<span>200</span></div>
          </div>
        </div>
      </div>
    </div>
    <mt-popup
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
      pickerTypeValue: '暖通机组AP11',
      popupVisible: false,
      slots: [
        {
          flex: 1,
          values: ['暖通机组AP11', '暖通机组AP12', '暖通机组AP13', '制冷剂补水', '空压站'],
          textAlign: 'center'
        }
      ],
      lineChartData: [],
      listData: [],
      isOpen: true
    }
  },
  computed: {
    dispDate() {
      return moment(this.pickerValue).format('YYYY年MM月')
    },
    syscode() {
      if (this.pickerTypeValue === '暖通机组AP11') {
        return 'DB4009'
      } else if (this.pickerTypeValue === '暖通机组AP12') {
        return 'DB4010'
      } else if (this.pickerTypeValue === '暖通机组AP13') {
        return 'DB4011'
      } else if (this.pickerTypeValue === '制冷剂补水') {
        return 'DB4012'
      } else if (this.pickerTypeValue === '空压站') {
        return 'DB4023'
      } else {
        return 'DB4009'
      }
    }
  },
  methods: {
    initData() {
      fetch('post', api.SSContorlIndexchart, {date: moment(this.pickerValue).format('YYYY-MM'), syscode: this.syscode}, false).then((res) => {
        this.lineChartData = res.data.line
        console.log(this.lineChartData)
      }).catch(() => {
      })
      fetch('post', api.SSContorlIndextable, {date: moment(this.pickerValue).format('YYYY-MM'), syscode: this.syscode}, false).then((res) => {
        this.listData = res.data.list
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
