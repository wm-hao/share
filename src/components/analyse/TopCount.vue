<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div id="top" :style="style"></div>
      </el-col>
      <el-col :span="12">
        <div id="bottom" :style="style"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div id="count" :style="style"></div>
      </el-col>
      <el-col :span="12">
        <div id="compare" :style="style"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import {shareTopCount, store_s_userId_key, successCode} from "../../const";

    export default {
        name: "TopCount",
        data() {
            return {
                style: ''
            }
        },
        mounted() {
            let self = this;
            this.$http.get(shareTopCount, {
                params: {
                    userId: localStorage.getItem(store_s_userId_key)
                }
            }).then(function (rsp) {
                if (rsp.data.code === successCode) {
                    self.createTop(rsp.data.rows[0], rsp.data.rows[1]);
                    self.createBottom(rsp.data.rows[2], rsp.data.rows[3]);
                    self.createCount(rsp.data.rows[4], rsp.data.rows[5]);
                    self.createCompare(rsp.data.rows[6]);
                } else {
                    self.$message.error(rsp.data.message);
                }
            }).catch(function (err) {
                self.$message.error(err.message);
            });
        },
        methods: {
            createTop: function (category, data) {
                let myChart = this.$echarts.init(document.getElementById('top'));
                myChart.setOption({
                        title: {
                            text: '盈利Top10'
                        },

                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        xAxis: {},

                        yAxis: {
                            data: category,
                            axisLabel: {
                                interval: 0,
                                align: 'right'
                            }
                        },
                        grid: {
                            left: '15%'
                        },
                        series: {
                            type: 'bar',
                            name: '盈利/元',
                            data: data,
                            markLine: {
                                data: [
                                    {
                                        type: 'average',
                                        name: '平均盈利',
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
            createBottom: function (category, data) {
                let myChart = this.$echarts.init(document.getElementById('bottom'));
                myChart.setOption({
                        title: {
                            text: '亏损Top10'
                        },

                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        xAxis: {},

                        yAxis: {
                            data: category,
                            axisLabel: {
                                interval: 0,
                                align: 'right'
                            }
                        },
                        grid: {
                            left: '15%'
                        },
                        series: {
                            type: 'bar',
                            name: '亏损/元',
                            data: data,
                            markLine: {
                                data: [
                                    {
                                        type: 'average',
                                        name: '平均亏损',
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
            createCount: function (category, data) {
                let myChart = this.$echarts.init(document.getElementById('count'));
                myChart.setOption({
                        title: {
                            text: '交易次数Top10'
                        },

                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        xAxis: {},

                        yAxis: {
                            data: category,
                            axisLabel: {
                                interval: 0,
                                align: 'right'
                            }
                        },
                        grid: {
                            left: '15%'
                        },
                        series: {
                            type: 'bar',
                            name: '交易次数',
                            data: data,
                            markLine: {
                                data: [
                                    {
                                        type: 'average',
                                        name: '平均交易次数',
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
            createCompare: function (data) {
                let myChart = this.$echarts.init(document.getElementById('compare'));
                myChart.setOption({
                        title: {
                            text: '盈亏比'
                        },

                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        xAxis: {
                            data: ['盈利', '平衡', '亏损'],
                            axisLabel: {
                                interval: 0,
                                align: 'center'
                            }
                        },

                        yAxis: {},
                        grid: {
                            left: '15%'
                        },
                        series: {
                            type: 'bar',
                            name: '交易次数',
                            data: data
                        }

                    }
                );
            }
        },
        created() {
            let height = window.innerHeight;
            let width = window.innerWidth;
            this.style = 'height:' + (0.35 * height) + 'px;width: ' + (width - 220) * 0.5 + 'px';
        }
    }
</script>

<style scoped>
  .el-col {
    min-height: 1px;
  }
</style>
