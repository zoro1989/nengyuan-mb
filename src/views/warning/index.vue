<template>
  <div class="main-container">
    <mt-header fixed title="异常报警">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      <mt-button icon="more" slot="right" @click="popupVisible = true"></mt-button>
    </mt-header>
    <div class="app-main">
      <div>
        <div class="line">
          <h3>系统运行监测</h3>
          <div class="line-item">{{warningData.sysinfo}}<span class="ball" :class=" warningData.sysstatus === '0'? 'green' : 'red'"></span></div>
        </div>
        <div class="line">
          <h3>能源预警/报警</h3>
          <div v-for="(item, index) in warningData.list" :key="index" class="line-box">
            <div class="line-item">报警名称：{{item.alarm_fieldName}}</div>
            <div class="line-item">报警内容：{{item.alarm_message}}</div>
            <div class="line-item small">报警时间：{{item.alarm_time}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from 'components/Chart/LineChart'
import { clearToken } from '@/common/js/cache'
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
      pickerValue: '',
      popupVisible: false,
      isOpen: true,
      warningData: {}
    }
  },
  methods: {
    initData() {
      fetch('post', api.AlermAppIndextable, {}, false).then((res) => {
        this.warningData = res
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
        .line-box
          border-bottom: 2px solid #f0f2f5
        .line-item
          min-height: 20px
          line-height: 20px
          &.small
            font-size: 12px
            color: #15a4fa
          .ball
            margin-left: 10px
            display: inline-block
            width: 10px
            height: 10px
            border-radius: 50%
            &.green
              background: #67C23A
            &.red
              background: #F56C6C
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
