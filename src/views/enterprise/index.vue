<template>
  <div class="main-container">
    <mt-header fixed :title="'企业用' + pickerTypeValue + '量'">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="app-main">
      <div>
        <div class="line"><span @click="popupVisible = true">{{pickerTypeValue}}</span></div>
        <div class="line"><mt-switch v-model="isMonth">{{isMonth? '按月查询' : '按年查询'}}</mt-switch></div>
        <div class="line"><span @click="openPikerDate">{{dispDate}}</span></div>
        <div class="chart-line">
          <line-chart :legendData="lineChartData.legendData" :seriesData="lineChartData.seriesData" :titleText="lineChartData.titleText" :xAxisData="lineChartData.xAxisData" />
        </div>
        <div class="line">
          <h3>{{dispDate}}企业能耗统计</h3>
          <h4>能源类别：{{pickerTypeValue}}</h4>
          <!--<h4>起止日期：2018年10月1日-2018年10月31日</h4>-->
          <ul class="line-group">
            <li class="line-box" v-for="(item, index) in listData" :key="index">
              <div class="line-item">日期：{{item.date}}</div>
              <div class="line-item big">用量：{{computedData(item)}}</div>
            </li>
          </ul>
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
    <mt-datetime-picker
      :class="isMonth ? 'only-month' : 'only-year'"
      v-model="pickerDateValue"
      type="date"
      ref="pickerDate"
      @confirm="dateConfirm"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日">
    </mt-datetime-picker>
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
      pickerTypeValue: '电',
      popupVisible: false,
      slots: [
        {
          flex: 1,
          values: ['水', '电', '天然气', '压缩空气', '高温水', '综合能耗'],
          textAlign: 'center'
        }
      ],
      lineChartData: [],
      listData: [],
      isMonth: true
    }
  },
  computed: {
    dispDate() {
      if (this.isMonth) {
        return moment(this.pickerValue).format('YYYY年MM月')
      } else {
        return moment(this.pickerValue).format('YYYY年')
      }
    },
    energytype() {
      if (this.pickerTypeValue === '水') {
        return '1'
      } else if (this.pickerTypeValue === '电') {
        return '2'
      } else if (this.pickerTypeValue === '天然气') {
        return '3'
      } else if (this.pickerTypeValue === '压缩空气') {
        return '4'
      } else if (this.pickerTypeValue === '高温水') {
        return '5'
      } else if (this.pickerTypeValue === '综合能耗') {
        return '6'
      } else {
        return '2'
      }
    }
  },
  methods: {
    initData() {
      let date = this.isMonth ? moment(this.pickerValue).format('YYYY-MM') : moment(this.pickerValue).format('YYYY')
      fetch('post', api.EntElectricIndexchart, {date: date, energytype: this.energytype}, false).then((res) => {
        this.lineChartData = res.data.line
      }).catch(() => {
      })
      fetch('post', api.EntElectricIndextable, {date: date, energytype: this.energytype}, false).then((res) => {
        this.listData = res.data.list
      }).catch(() => {
      })
    },
    computedData(item) {
      if (this.pickerTypeValue === '水') {
        return item['shui']
      } else if (this.pickerTypeValue === '电') {
        return item['dian']
      } else if (this.pickerTypeValue === '天然气') {
        return item['trq']
      } else if (this.pickerTypeValue === '压缩空气') {
        return item['yskq']
      } else if (this.pickerTypeValue === '高温水') {
        return item['gws']
      } else if (this.pickerTypeValue === '综合能耗') {
        return item['zhnh']
      } else {
        return item['dian']
      }
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
      .line
        padding: 10px
        box-sizing: border-box
        margin-bottom: 10px
        background: #fff
        .line-group
          margin-top: 10px
          .line-box
            padding: 10px 0
            border-top: 1px solid rgba(0, 0, 0, .1)
            .line-item
              height: 20px
              line-height: 20px
              &.big
                font-weight: bold
                color: rgb(48, 65, 86)
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
</style>
