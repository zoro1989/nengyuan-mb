<template>
  <div class="main-container">
    <mt-header fixed title="成都变电室远程监控">
      <mt-button slot="right" @click="logout" class="icon-button">
        <svg-icon icon-class="logout" style="font-size: 18px" slot="icon" />
      </mt-button>
    </mt-header>
    <div class="app-main">
      <div>
        <div class="card-box">
          <div class="card-panel" @click="changeRoute('/overview')">
            <div class="card-panel-icon-wrapper">
              <svg-icon icon-class="nyzl" class-name="card-panel-icon" />
              <div class="card-panel-text">能源总览</div>
            </div>
          </div>
          <div class="card-panel" @click="changeRoute('/enterprise')">
            <div class="card-panel-icon-wrapper">
              <svg-icon icon-class="qyydl" class-name="card-panel-icon" />
              <div class="card-panel-text">企业用电量</div>
            </div>
          </div>
          <div class="card-panel" @click="changeRoute('/workshop')">
            <div class="card-panel-icon-wrapper">
              <svg-icon icon-class="cjydl" class-name="card-panel-icon" />
              <div class="card-panel-text">车间用电量</div>
            </div>
          </div>
        </div>
        <div class="card-box">
          <div class="card-panel" @click="changeRoute('/device')">
            <div class="card-panel-icon-wrapper">
              <svg-icon icon-class="sbydl" class-name="card-panel-icon" />
              <div class="card-panel-text">设备用电量</div>
            </div>
          </div>
          <div class="card-panel" @click="changeRoute('/indicator')">
            <div class="card-panel-icon-wrapper">
              <svg-icon icon-class="nxzb" class-name="card-panel-icon" />
              <div class="card-panel-text">能效指标</div>
            </div>
          </div>
          <div class="card-panel" @click="changeRoute('/realtime')">
            <div class="card-panel-icon-wrapper">
              <svg-icon icon-class="ssjc" class-name="card-panel-icon" />
              <div class="card-panel-text">实时监测</div>
            </div>
          </div>
        </div>
        <div class="card-box">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper">
              <svg-icon icon-class="ssjk" class-name="card-panel-icon" />
              <div class="card-panel-text">实时监控</div>
            </div>
          </div>
          <div class="card-panel" @click="changeRoute('/warning')">
            <div class="card-panel-icon-wrapper">
              <svg-icon icon-class="ycbj" class-name="card-panel-icon" />
              <div class="card-panel-text">异常报警</div>
            </div>
          </div>
          <div class="card-panel" @click="changeRoute('/netpic')">
            <div class="card-panel-icon-wrapper">
              <svg-icon icon-class="dlwlt" class-name="card-panel-icon" />
              <div class="card-panel-text">动力网络图</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BarChart from 'components/Chart/BarChart'
import { clearToken } from '@/common/js/cache'
export default {
  components: {
    BarChart
  },
  data() {
    return {
    }
  },
  methods: {
    changeRoute(path) {
      this.$router.push(path)
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
    height: 100%
    .card-box
      display: flex
      .card-panel
        text-align: center
        flex: 1
        cursor: pointer
        font-size: 12px
        position: relative
        overflow: hidden
        color: #666
        background: #fff
        box-shadow: 4px 4px 40px rgba(0, 0, 0, .05)
        border-color: rgba(0, 0, 0, .05)
        margin: 0 10px 10px 0
        border-radius: 6px
        &:nth-child(3)
          margin-right: 0
        .card-panel-icon-wrapper
          text-align: center
          padding: 15px 5px
          transition: all 0.38s ease-out
          .card-panel-icon
            font-size: 48px
            color: #f4516c
        .card-panel-text
          padding-top: 10px
          line-height: 18px
          color: rgba(0, 0, 0, 0.45)
          font-size: 16px
</style>
