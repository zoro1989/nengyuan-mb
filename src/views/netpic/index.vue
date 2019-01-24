<template>
  <div class="main-container">
    <mt-header fixed title="动力网络图">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="app-main">
      <div>
        <div class="image-box">
          <span class="title">公用管线平面图</span>
          <img class="image" :src="Wangluotu" :preview="1" preview-text="公用管线平面图">
        </div>
        <div class="image-box">
          <span class="title">公用管线平面图</span>
          <img class="image" :src="Wangluotu" :preview="1" preview-text="公用管线平面图">
        </div>
        <div class="image-box">
          <span class="title">公用管线平面图</span>
          <img class="image" :src="Wangluotu" :preview="1" preview-text="公用管线平面图">
        </div>
        <div class="image-box">
          <span class="title">公用管线平面图</span>
          <img class="image" :src="Wangluotu" :preview="1" preview-text="公用管线平面图">
        </div>
        <div class="image-box">
          <span class="title">公用管线平面图</span>
          <img class="image" :src="Wangluotu" :preview="1" preview-text="公用管线平面图">
        </div>
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
      .image-box
        position: relative
        display: inline-block
        width: 30%
        padding: 10px
        .title
          font-size: 12px
        .image
          width: 100%
</style>
