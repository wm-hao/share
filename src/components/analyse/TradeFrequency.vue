<template>
  <div class="both">
    <el-row>
      <el-col :span="24">
        <div id="dayChart" :style="style"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <div id="monthChart" :style="monthStyle"></div>
      </el-col>
      <el-col :span="5">
        <div id="yearChart" :style="yearStyle">
        </div>
      </el-col>
      <el-col :span="3"></el-col>
    </el-row>
  </div>

</template>


<script>

    import {shareFrequency, store_s_userId_key, successCode} from "../../const";

    export default {
        components: {},
        data() {
            return {
                style: '',
                yearStyle: '',
                monthStyle: ''
            }
        },
        methods: {
            createDayBar: function (category, data) {
                let myChart = this.$echarts.init(document.getElementById('dayChart'));
                myChart.setOption({
                        title: {
                            text: '日交易次数'
                        },

                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        xAxis: {
                            data: category,
                            axisLabel: {
                                interval: 1
                            }
                        },
                        dataZoom: [
                            {
                                id: 'dataZoomX',
                                type: 'slider',
                                xAxisIndex: [0],
                                filterMode: 'filter',
                                start: 0,
                                end: 30
                            }
                        ],
                        yAxis: {},
                        series: {
                            type: 'bar',
                            name: '交易次数',
                            data: data,
                            markLine: {
                                data: [
                                    {
                                        type: 'average',
                                        name: '平均数',
                                        label: {
                                            normal: {
                                                position: 'end',
                                                formatter: '{b}: {c}'
                                            }
                                        }
                                    }
                                ]

                            }
                        }

                    }
                );
            },
            createMonthBar: function (category, data) {
                let myChart = this.$echarts.init(document.getElementById('monthChart'));
                myChart.setOption({
                        title: {
                            text: '月交易次数'
                        },

                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        xAxis: {
                            data: category,
                            axisLabel: {
                                interval: 0
                            }
                        },

                        yAxis: {},
                        series: {
                            type: 'bar',
                            name: '交易次数',
                            data: data,
                            markLine: {
                                data: [
                                    {
                                        type: 'average',
                                        name: '平均数',
                                        label: {
                                            normal: {
                                                position: 'end',
                                                formatter: '{b}: {c}'
                                            }
                                        }
                                    }
                                ]

                            }
                        }

                    }
                );
            },
            createYearBar: function (category, data) {
                let myChart = this.$echarts.init(document.getElementById('yearChart'));
                myChart.setOption({
                        title: {
                            text: '年交易次数'
                        },

                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        xAxis: {
                            data: category,
                            axisLabel: {
                                interval: 0
                            }
                        },

                        yAxis: {},
                        series: {
                            type: 'bar',
                            name: '交易次数',
                            data: data,
                            markLine: {
                                data: [
                                    {
                                        type: 'average',
                                        name: '平均数',
                                        label: {
                                            normal: {
                                                position: 'end',
                                                formatter: '{b}: {c}'
                                            }
                                        }
                                    }
                                ]

                            }
                        }

                    }
                );
            }

        },
        mounted() {
            let self = this;
            this.$http.get(shareFrequency, {
                params: {
                    userId: localStorage.getItem(store_s_userId_key)
                }
            }).then(function (rsp) {
                if (rsp.data.code === successCode) {
                    self.createDayBar(rsp.data.rows[0], rsp.data.rows[1]);
                    self.createMonthBar(rsp.data.rows[2], rsp.data.rows[3]);
                    self.createYearBar(rsp.data.rows[4], rsp.data.rows[5]);
                } else {
                    self.$message.error(rsp.data.message);
                }
            }).catch(function (err) {
                self.$message.error(err.message);
            });


        },
        created() {
            let height = window.innerHeight;
            let width = window.innerWidth;
            this.style = 'height:' + (0.35 * height) + 'px;width: ' + (width - 220) + 'px';
            this.yearStyle = 'height:' + (0.35 * height) + 'px;width: ' + (0.3 * (width - 220)) + 'px';
            this.monthStyle = 'height:' + (0.35 * height) + 'px;width: ' + (0.7 * (width - 220)) + 'px';
        }
    }
</script>


<style scoped>
  .el-col {
    min-height: 1px;
  }
</style>
