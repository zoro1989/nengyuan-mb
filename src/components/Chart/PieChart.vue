<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
require('echarts/theme/macarons') // echarts theme

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    legendData: {
      type: Array,
      default: () => {
        return []
      }
    },
    seriesData: {
      type: Array,
      default: () => {
        return []
      }
    },
    titleText: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },
  watch: {
    seriesData: function () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.initChart()
        this.__resizeHandler = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100)
        window.addEventListener('resize', this.__resizeHandler)
      }, 20)
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }

    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }
    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: this.legendData
        },
        title: {
          text: this.titleText,
          x: 'center'
        },
        calculable: true,
        series: [
          {
            type: 'pie',
            name: this.titleText,
            // roseType: 'radius',
            radius: ['15%', '55%'],
            center: ['50%', '50%'],
            data: this.seriesData,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
