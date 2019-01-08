<template>
  <div class="main-container">
    <mt-header fixed :title="'车间用' + pickerTypeValue + '量'">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="app-main">
      <div>
        <div class="line"><span @click="popupVisible = true">{{pickerTypeValue}}</span></div>
        <div class="line"><span @click="popupVisibleCJ = true">{{pickerCJValue}}</span></div>
        <div class="line"><span @click="openPikerDate">{{dispDate}}</span></div>
        <div class="chart-line">
          <line-chart :legendData="lineChartData.legendData" :seriesData="lineChartData.seriesData" :titleText="lineChartData.titleText" :xAxisData="lineChartData.xAxisData" />
        </div>
        <div class="line">
          <h3>{{dispDate}}{{pickerCJValue}}能耗统计</h3>
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
    <mt-popup
      class="type-picker"
      v-model="popupVisibleCJ"
      position="bottom">
      <mt-picker :slots="slotsCJ" ref="pickerTypeCJ" :showToolbar="true" v-model="pickerCJValue" @change="onValuesChangeCJ">
        <span class="mint-datetime-action mint-datetime-cancel" @click="popupVisibleCJ = false">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="cjConfirm">确认</span>
      </mt-picker>
    </mt-popup>
    <mt-datetime-picker
      class="only-month"
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
      pickerCJValue: '装备区',
      popupVisible: false,
      popupVisibleCJ: false,
      slots: [
        {
          flex: 1,
          values: ['水', '电', '天然气', '压缩空气', '高温水', '综合能耗'],
          textAlign: 'center'
        }
      ],
      slotsCJ: [
        {
          flex: 1,
          values: ['装备区', '涂装区', '焊装区', '工厂技术', '非照明技术', '生产给水', '生活给水', '锅炉房', '污水站', '空压站', '办公楼', '食堂', '机加区'],
          textAlign: 'center'
        }
      ],
      lineChartData: [],
      listData: []
    }
  },
  computed: {
    dispDate() {
      return moment(this.pickerValue).format('YYYY年MM月')
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
    },
    cjid() {
      if (this.pickerCJValue === '装备区') {
        return '21'
      } else if (this.pickerCJValue === '涂装区') {
        return '22'
      } else if (this.pickerCJValue === '焊装区') {
        return '23'
      } else if (this.pickerCJValue === '工厂技术') {
        return '24'
      } else if (this.pickerCJValue === '非照明技术') {
        return '25'
      } else if (this.pickerCJValue === '生产给水') {
        return '26'
      } else if (this.pickerCJValue === '生活给水') {
        return '27'
      } else if (this.pickerCJValue === '锅炉房') {
        return '28'
      } else if (this.pickerCJValue === '污水站') {
        return '29'
      } else if (this.pickerCJValue === '空压站') {
        return '30'
      } else if (this.pickerCJValue === '办公楼') {
        return '31'
      } else if (this.pickerCJValue === '食堂') {
        return '32'
      } else if (this.pickerCJValue === '机加区') {
        return '33'
      } else {
        return '21'
      }
    }
  },
  methods: {
    initData() {
      fetch('post', api.EntElectricIndexchart, {date: moment(this.pickerValue).format('YYYY-MM'), energytype: this.energytype, cjid: this.cjid}, false).then((res) => {
        this.lineChartData = res.data.line
      }).catch(() => {
      })
      fetch('post', api.EntElectricIndextable, {date: moment(this.pickerValue).format('YYYY-MM'), energytype: this.energytype, cjid: this.cjid}, false).then((res) => {
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
    goBack() {
      this.$router.go(-1)
    },
    onValuesChange(picker, values) {
      this.pickerTypeValue = values[0]
    },
    onValuesChangeCJ(picker, values) {
      this.pickerCJValue = values[0]
    },
    dateConfirm() {
      this.initData()
    },
    lxConfirm() {
      this.popupVisible = false
      this.initData()
    },
    cjConfirm() {
      this.popupVisibleCJ = false
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
