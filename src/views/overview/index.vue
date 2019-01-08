<template>
  <div class="main-container">
    <mt-header fixed title="能源总览">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      <mt-button icon="more" slot="right" @click="popupVisible = true"></mt-button>
    </mt-header>
    <div class="app-main">
      <div>
        <div class="line"><h2>{{dispDate}}企业能源消耗总览</h2></div>
        <div class="line"><span @click="openPiker">{{dispDate}}</span></div>
        <div class="line">
          <h3>企业能源消耗总量</h3>
          <div class="line-item" v-for="(item, index) in dataList" :key="index">{{item.cjname}}：{{item.cjyl}}{{item.unit}}</div>
        </div>
        <div class="chart-line">
          <pie-chart :legendData="pie.legendData" :seriesData="pie.seriesData" :titleText="pie.titleText"/>
        </div>
      </div>
    </div>
    <mt-datetime-picker
      class="only-month"
      v-model="pickerValue"
      type="date"
      ref="picker"
      @confirm="dateConfirm"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日">
    </mt-datetime-picker>
    <mt-popup
      class="menu-pop"
      v-model="popupVisible"
      position="right">
      <ul class="menu-box">
        <li class="menu-item"><svg-icon icon-class="sum" @click="changeType('6')" />企业能源消耗总量</li>
        <li class="menu-item"><svg-icon icon-class="water" @click="changeType('1')" />企业水量</li>
        <li class="menu-item"><svg-icon icon-class="electric" @click="changeType('2')" />企业电量</li>
        <li class="menu-item"><svg-icon icon-class="gas" @click="changeType('3')" />企业天然气量</li>
        <li class="menu-item"><svg-icon icon-class="air" @click="changeType('4')" />企业压缩空气量</li>
        <li class="menu-item"><svg-icon icon-class="heightemp" @click="changeType('5')" />企业高温水量</li>
        <li class="menu-item logout" @click="logout">退出登录</li>
      </ul>
    </mt-popup>
  </div>
</template>
<script>
import PieChart from 'components/Chart/PieChart'
import { clearToken } from '@/common/js/cache'
import { api } from '@/config'
import fetch from 'utils/fetch'
let moment = require('moment')
moment.locale('zh-cn')
export default {
  components: {
    PieChart
  },
  created() {
    this.initData()
  },
  data() {
    return {
      pickerValue: (new Date()),
      popupVisible: false,
      pie: {},
      dataList: [],
      energytype: '6'
    }
  },
  computed: {
    dispDate() {
      return moment(this.pickerValue).format('YYYY年MM月')
    }
  },
  methods: {
    initData() {
      fetch('post', api.EntMainIndexchart, {date: moment(this.pickerValue).format('YYYY-MM'), energytype: this.energytype}, false).then((res) => {
        this.pie = res.data.pie
      }).catch(() => {
      })
      fetch('post', api.EntMainIndextable, {date: moment(this.pickerValue).format('YYYY-MM'), energytype: this.energytype}, false).then((res) => {
        this.dataList = res.dataList
      }).catch(() => {
      })
    },
    openPiker() {
      this.$refs.picker.open()
    },
    goBack() {
      this.$router.go(-1)
    },
    logout() {
      clearToken()
      location.reload()
    },
    dateConfirm() {
      this.initData()
    },
    changeType(type) {
      this.energytype = type
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
        .line-item
          height: 20px
          line-height: 20px
        h2
          font-size: 18px
        h3
          font-size: 16px
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
