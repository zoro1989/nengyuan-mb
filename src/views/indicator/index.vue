<template>
  <div class="main-container">
    <mt-header fixed title="能效指标">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="app-main">
      <div>
        <div class="line"><span @click="popupVisible = true">{{pickerTypeValue}}</span></div>
        <div class="line"><mt-switch v-model="isMonth">{{isMonth? '按月查询' : '按年查询'}}</mt-switch></div>
        <div class="line"><span @click="openPikerDate">{{dispDate}}</span></div>
        <div class="chart-line">
          <line-chart :legendData="lineChartData.legendData" :seriesData="lineChartData.seriesData" :titleText="lineChartData.titleText" :xAxisData="lineChartData.xAxisData" :yAxis="yAxis" />
        </div>
        <div class="line">
          <!--<h3>能源指标：能源消耗总量</h3>-->
          <h3>{{pickerTypeValue}}</h3>
          <h4>累计指标值：{{dataObj.ljzb}}</h4>
          <h4>本月差值：{{dataObj.bycz}}</h4>
          <h4>实际占计划百分比：{{dataObj.sjzjh}}%</h4>
          <!--<h4>本月评价</h4>-->
          <ul class="line-group">
            <li class="line-box" v-for="(item, index) in dataObj.dataList" :key="index">
              <div class="line-item big">{{item.date}}</div>
              <div class="line-item big">
              <span class="legend">
                <span class="c1"></span>
              </span>
                {{item.jhname}}：{{item.jhvalue}}
              </div>
              <div class="line-item big">
              <span class="legend">
                <span class="c2"></span>
              </span>
                {{item.sjname}}：{{item.sjvalue}}
              </div>
              <div class="line-item big">
              <span class="legend">
                <span class="c3"><span class="ball"></span></span>
              </span>
                {{item.jhljname}}：{{item.jhljvalue}}
              </div>
              <div class="line-item big">
              <span class="legend">
                <span class="c4"><span class="ball"></span></span>
              </span>
                {{item.sjljname}}：{{item.sjljvalue}}
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
      pickerTypeValue: '能源消耗总量',
      popupVisible: false,
      slots: [
        {
          flex: 1,
          values: ['能源消耗总量', '万元产值综合能耗', '单台电耗', '单台耗水', '单台耗天然气', '单台耗高温水'],
          textAlign: 'center'
        }
      ],
      lineChartData: [],
      dataObj: {},
      isMonth: true
    }
  },
  computed: {
    yAxis() {
      if (this.pickerTypeValue === '能源消耗总量') {
        return [{name: '吨标煤'}, {name: '吨标煤'}]
      } else if (this.pickerTypeValue === '万元产值综合能耗') {
        return [{name: '吨标煤/万元'}, {name: '吨标煤/万元'}]
      } else if (this.pickerTypeValue === '单台电耗') {
        return [{name: '千瓦时'}, {name: '千瓦时'}]
      } else if (this.pickerTypeValue === '单台耗水') {
        return [{name: '吨'}, {name: '吨'}]
      } else if (this.pickerTypeValue === '单台耗天然气') {
        return [{name: '立方米'}, {name: '立方米'}]
      } else if (this.pickerTypeValue === '单台耗高温水') {
        return [{name: '吨'}, {name: '吨'}]
      } else {
        return []
      }
    },
    dispDate() {
      if (this.isMonth) {
        return moment(this.pickerDateValue).format('YYYY年MM月')
      } else {
        return moment(this.pickerDateValue).format('YYYY年')
      }
    },
    energytype() {
      if (this.pickerTypeValue === '能源消耗总量') {
        return '1'
      } else if (this.pickerTypeValue === '万元产值综合能耗') {
        return '2'
      } else if (this.pickerTypeValue === '单台电耗') {
        return '3'
      } else if (this.pickerTypeValue === '单台耗水') {
        return '4'
      } else if (this.pickerTypeValue === '单台耗天然气') {
        return '5'
      } else if (this.pickerTypeValue === '单台耗高温水') {
        return '6'
      } else {
        return '1'
      }
    }
  },
  methods: {
    initData() {
      let date = this.isMonth ? moment(this.pickerDateValue).format('YYYY-MM') : moment(this.pickerDateValue).format('YYYY')
      fetch('post', api.EntTotalIndexchart, {date: date, energytype: this.energytype}, false).then((res) => {
        this.lineChartData = res.data.line
      }).catch(() => {
      })
      fetch('post', api.EntTotalIndextable, {date: date, energytype: this.energytype}, false).then((res) => {
        this.dataObj = res
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
                    background: #FF005A
                  .c2
                    height: 8px
                    background: #3888fa
                  .c3, .c4
                    .ball
                      background: #2EC7C9
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
                      background: #2EC7C9
                      width: 100%
                      height: 2px
                  .c4
                    .ball
                      background: #B6A2DE
                    &:before
                      background: #B6A2DE
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
