<template>
  <div class="main-container">
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
          <h3>能源指标：能源消耗总量</h3>
          <h4>累计指标值</h4>
          <h4>本月差值：8404</h4>
          <h4>已用占计划百分比：101.05%</h4>
          <h4>本月评价</h4>
          <ul class="line-group">
            <li class="line-box">
              <div class="line-item big">2018年11月1日</div>
              <div class="line-item big">
              <span class="legend">
                <span class="c1"></span>
              </span>
                计划用量：9128.04
              </div>
              <div class="line-item big">
              <span class="legend">
                <span class="c2"></span>
              </span>
                实际用量:4683
              </div>
              <div class="line-item big">
              <span class="legend">
                <span class="c3"><span class="ball"></span></span>
              </span>
                计划累计用量:9128.04
              </div>
              <div class="line-item big">
              <span class="legend">
                <span class="c4"><span class="ball"></span></span>
              </span>
                实际累计用量:4683
              </div>
            </li>
            <li class="line-box">
              <div class="line-item big">2018年11月1日</div>
              <div class="line-item big">
              <span class="legend">
                <span class="c1"></span>
              </span>
                计划用量：9128.04
              </div>
              <div class="line-item big">
              <span class="legend">
                <span class="c2"></span>
              </span>
                实际用量:4683
              </div>
              <div class="line-item big">
              <span class="legend">
                <span class="c3"><span class="ball"></span></span>
              </span>
                计划累计用量:9128.04
              </div>
              <div class="line-item big">
              <span class="legend">
                <span class="c4"><span class="ball"></span></span>
              </span>
                实际累计用量:4683
              </div>
            </li>
            <li class="line-box">
              <div class="line-item big">2018年11月1日</div>
              <div class="line-item big">
              <span class="legend">
                <span class="c1"></span>
              </span>
                计划用量：9128.04
              </div>
              <div class="line-item big">
              <span class="legend">
                <span class="c2"></span>
              </span>
                实际用量:4683
              </div>
              <div class="line-item big">
              <span class="legend">
                <span class="c3"><span class="ball"></span></span>
              </span>
                计划累计用量:9128.04
              </div>
              <div class="line-item big">
              <span class="legend">
                <span class="c4"><span class="ball"></span></span>
              </span>
                实际累计用量:4683
              </div>
            </li>
            <li class="line-box">
              <div class="line-item big">2018年11月1日</div>
              <div class="line-item big">
              <span class="legend">
                <span class="c1"></span>
              </span>
                计划用量：9128.04
              </div>
              <div class="line-item big">
              <span class="legend">
                <span class="c2"></span>
              </span>
                实际用量:4683
              </div>
              <div class="line-item big">
              <span class="legend">
                <span class="c3"><span class="ball"></span></span>
              </span>
                计划累计用量:9128.04
              </div>
              <div class="line-item big">
              <span class="legend">
                <span class="c4"><span class="ball"></span></span>
              </span>
                实际累计用量:4683
              </div>
            </li>
            <li class="line-box">
              <div class="line-item big">2018年11月1日</div>
              <div class="line-item big">
              <span class="legend">
                <span class="c1"></span>
              </span>
                计划用量：9128.04
              </div>
              <div class="line-item big">
              <span class="legend">
                <span class="c2"></span>
              </span>
                实际用量:4683
              </div>
              <div class="line-item big">
              <span class="legend">
                <span class="c3"><span class="ball"></span></span>
              </span>
                计划累计用量:9128.04
              </div>
              <div class="line-item big">
              <span class="legend">
                <span class="c4"><span class="ball"></span></span>
              </span>
                实际累计用量:4683
              </div>
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
                .legend
                  display:inline-block
                  width: 50px
                  height: 20px
                  text-align: center
                  .c1, .c2, .c3, .c4
                    width: 30px
                    display:inline-block
                    text-align: center
                    position: relative
                  .c1
                    height: 8px
                    background: #34bfa3
                  .c2
                    height: 8px
                    background: #36a3f7
                  .c3, .c4
                    .ball
                      background: #f4516c
                      border-radius: 50%
                      display:inline-block
                      width: 10px
                      height: 10px
                    &:before
                      content: ''
                      position: absolute
                      top: 50%
                      left: 0
                      transform: translate3d(0, -100%, 0)
                      background: #f4516c
                      width: 100%
                      height: 2px
                  .c4
                    .ball
                      background: #40c9c6
                    &:before
                      background: #40c9c6
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
