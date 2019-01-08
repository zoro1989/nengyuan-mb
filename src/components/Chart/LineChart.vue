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
      default: '250px'
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
    xAxisData: {
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
      sidebarElm: null,
      chartColor: ['#FF005A', '#3888fa', '#2EC7C9', '#B6A2DE']
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
        xAxis: {
          data: this.xAxisData,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 25,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: this.legendData
        },
        series: ((vm, series) => {
          let res = []
          for (let i = 0; i < series.length; i++) {
            let item = {
              itemStyle: {
                normal: {
                  color: vm.chartColor[i],
                  lineStyle: {
                    color: vm.chartColor[i],
                    width: 2
                  }
                }
              },
              name: series[i].name,
              smooth: true,
              type: series[i].type || 'line',
              data: series[i].data,
              animationDuration: 2800,
              animationEasing: 'cubicInOut'
            }
            res.push(item)
          }
          return res
        })(this, this.seriesData)
      })
    }
  }
}
</script>
