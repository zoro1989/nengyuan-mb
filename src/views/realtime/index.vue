<template>
  <div class="overview">
    <mt-header fixed title="实时监测">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      <mt-button icon="more" slot="right" @click="popupVisible = true"></mt-button>
    </mt-header>
    <div class="app-main">
      <div>
        <div class="line"><h2>空调设备可视化管理看板</h2></div>
        <div class="line"><span @click="openPiker">选择日期</span></div>
        <div class="line">
          <h3>三相电流</h3>
          <h4>起止日期：2018年10月1日-2018年10月31日</h4>
          <line-chart :chart-data="lineChartData" />
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
    <mt-datetime-picker
      class="only-month"
      v-model="pickerValue"
      type="date"
      ref="picker"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日">
    </mt-datetime-picker>
    <mt-popup
      class="menu-pop"
      v-model="popupVisible"
      position="right">
      <ul class="menu-box">
        <li class="menu-item"><svg-icon icon-class="sum" />企业能源消耗总量</li>
        <li class="menu-item"><svg-icon icon-class="electric" />企业电量</li>
        <li class="menu-item"><svg-icon icon-class="water" />企业水量</li>
        <li class="menu-item"><svg-icon icon-class="air" />企业压缩空气量</li>
        <li class="menu-item"><svg-icon icon-class="heightemp" />企业高温水量</li>
        <li class="menu-item"><svg-icon icon-class="gas" />企业天然气量</li>
        <li class="menu-item logout" @click="logout">退出登录</li>
      </ul>
    </mt-popup>
  </div>
</template>
<script>
import LineChart from 'components/Chart/LineChart'
import { clearToken } from '@/common/js/cache'
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
      pickerValue: '',
      popupVisible: false,
      isOpen: true,
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    openPiker() {
      this.$refs.picker.open()
    },
    goBack() {
      this.$router.go(-1)
    },
    logout() {
      clearToken()
      location.reload()
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .overview
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
