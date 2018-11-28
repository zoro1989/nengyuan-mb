<template>
  <div class="main-container">
    <mt-header fixed title="实时监测">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      <mt-button icon="more" slot="right" @click="popupVisible = true"></mt-button>
    </mt-header>
    <div class="app-main">
      <div>
        <div class="line">
          <h3>系统运行监测</h3>
          <div class="line-item">一汽大众公司能源管理信息系统数据传输<span class="ball green"></span></div>
          <div class="line-item">一汽轿车公司能源管理信息系统数据传输<span class="ball green"></span></div>
          <div class="line-item">吉林汽车有限公司能源管理信息系统数据传输<span class="ball green"></span></div>
          <div class="line-item">一汽丰越公司能源管理信息系统数据传输<span class="ball red"></span></div>
        </div>
        <div class="line">
          <h3>能源预警/报警</h3>
          <div class="line-item">部门：解放事业部</div>
          <div class="line-item">能源预警/报警内容：3月份累计万元产值综合能耗超标5%</div>
          <div class="line-item small">系统分析结果：3月份实际产值比计划产值减少9.28%，单车电耗高于计划值5.14</div>
        </div>
      </div>
    </div>
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
