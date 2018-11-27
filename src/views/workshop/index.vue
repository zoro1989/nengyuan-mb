<template>
  <div class="enterprise">
    <mt-header fixed title="企业用电量">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="app-main">
      <div>
        <div class="line"><span @click="popupVisible = true">选择能源类别</span></div>
        <div class="line"><span @click="openPikerDate">选择日期</span></div>
        <div class="chart-line">
          <line-chart :chart-data="lineChartData" />
        </div>
        <div class="line">
          <h3>2018年1月车间能耗设计</h3>
          <h4>能源类别：电(千瓦时)</h4>
          <h4>起止日期：2018年10月1日-2018年10月31日</h4>
          <ul class="line-group">
            <li class="line-box">
              <div class="line-item">2018年10月1日</div>
              <div class="line-item big">200千瓦时</div>
            </li>
            <li class="line-box">
              <div class="line-item">2018年10月1日</div>
              <div class="line-item big">200千瓦时</div>
            </li>
            <li class="line-box">
              <div class="line-item">2018年10月1日</div>
              <div class="line-item big">200千瓦时</div>
            </li>
            <li class="line-box">
              <div class="line-item">2018年10月1日</div>
              <div class="line-item big">200千瓦时</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <mt-popup
      class="type-picker"
      v-model="popupVisible"
      position="bottom">
      <mt-picker :slots="slots" ref="pickerType" v-model="pickerTypeValue"></mt-picker>
    </mt-popup>
    <mt-datetime-picker
      class="only-month"
      v-model="pickerDateValue"
      type="date"
      ref="pickerDate"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日">
    </mt-datetime-picker>
  </div>
</template>
<script>
import LineChart from 'components/Chart/LineChart'
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
  components: {
    LineChart
  },
  data() {
    return {
      pickerDateValue: '',
      pickerTypeValue: '',
      popupVisible: false,
      slots: [
        {
          flex: 1,
          values: ['电', '水', '天然气', '热力', '煤'],
          textAlign: 'center'
        }
      ],
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    openPikerDate() {
      this.$refs.pickerDate.open()
    },
    openPikerType() {
      this.$refs.pickerType.open()
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .enterprise
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
