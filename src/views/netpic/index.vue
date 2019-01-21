<template>
  <div class="main-container">
    <mt-header fixed title="动力网络图">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="app-main">
      <div>
        <img class="image" :src="Wangluotu" :preview="Wangluotu">
      </div>
    </div>
  </div>
</template>
<script>
import Wangluotu from './wangluotu.jpg'
export default {
  data() {
    return {
      Wangluotu: Wangluotu
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .main-container
    .app-main
      .image
        width: 100%
</style>
