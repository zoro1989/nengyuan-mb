<template>
  <div class="overview">
    <mt-header fixed title="能源总览">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      <mt-button icon="more" slot="right" @click="popupVisible = true"></mt-button>
    </mt-header>
    <section class="app-main">
      <bar-chart/>
    </section>
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
import BarChart from 'components/Chart/BarChart'
import { clearToken } from '@/common/js/cache'
export default {
  components: {
    BarChart
  },
  data() {
    return {
      popupVisible: false
    }
  },
  methods: {
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
