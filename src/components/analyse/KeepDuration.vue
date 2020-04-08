<template>
  <div>
    <el-row>
      <div id="all" :style="style"></div>
    </el-row>
    <el-row>
      <el-col :span="1"></el-col>
      <el-col :span="11">
        <div id="hi" :style="style2"></div>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="11">
        <div id="ha" :style="style2"></div>
      </el-col>

    </el-row>

  </div>
</template>

<!--<script src="../../assets/layui/layui.all.js"></script>-->
<script>
    import {shareKeepDuration, store_s_userId_key, successCode} from "../../const";

    export default {
        name: "Assets",
        data() {
            return {
                style: '',
                style2: ''
            }
        },
        methods: {
            createAllBar: function (category, data) {
                let myChart = this.$echarts.init(document.getElementById('all'));
                myChart.setOption({
                        title: {
                            text: '持股时长'
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
                        /* grid: {
                             left: '10%'
                         },*/
                        dataZoom: [
                            {
                                id: 'dataZoomX',
                                type: 'slider',
                                xAxisIndex: [0],
                                filterMode: 'filter',
                                start: 0,
                                end: 15
                            }
                        ],
                        series: {
                            type: 'bar',
                            name: '时长/天',
                            data: data,
                            markLine: {
                                data: [
                                    {
                                        type: 'average',
                                        name: '平均时长',
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
            createTopBar: function (category, data) {
                let myChart = this.$echarts.init(document.getElementById('hi'));
                myChart.setOption({
                        title: {
                            text: '持股时长TOP10'
                        },

                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        xAxis: {},

                        yAxis: {
                            data: category.reverse(),
                            axisLabel: {
                                interval: 0
                            }
                        },

                        series: {
                            type: 'bar',
                            name: '时长/天',
                            data: data.reverse(),
                            markLine: {
                                data: [
                                    {
                                        type: 'average',
                                        name: '平均时长',
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
            createBottomBar: function (category, data) {
                let myChart = this.$echarts.init(document.getElementById('ha'));
                myChart.setOption({
                        title: {
                            text: '持股时长BOTTOM10'
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
                                interval: 0
                            }
                        },

                        series: {
                            type: 'bar',
                            name: '时长/天',
                            data: data,
                            markLine: {
                                data: [
                                    {
                                        type: 'average',
                                        name: '平均时长',
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
            this.$http.post(shareKeepDuration, {
                    dataType: '1',
                    userId: localStorage.getItem(store_s_userId_key)
                }
            ).then(function (rsp) {
                if (rsp.data.code === successCode) {
                    self.createAllBar(rsp.data.rows[0], rsp.data.rows[1]);
                } else {
                    self.$message.error(rsp.data.message);
                }
            }).catch(function (err) {
                self.$message.error(err.message);
            });
            this.$http.post(shareKeepDuration, {
                    dataType: '1',
                    userId: localStorage.getItem(store_s_userId_key),
                    pageNum: 1,
                    pageSize: 10,
                    asc: 'N'
                }
            ).then(function (rsp) {
                if (rsp.data.code === successCode) {
                    self.createTopBar(rsp.data.rows[0], rsp.data.rows[1]);
                } else {
                    self.$message.error(rsp.data.message);
                }
            }).catch(function (err) {
                self.$message.error(err.message);
            });
            this.$http.post(shareKeepDuration, {
                    dataType: '1',
                    userId: localStorage.getItem(store_s_userId_key),
                    pageNum: 1,
                    pageSize: 10
                }
            ).then(function (rsp) {
                if (rsp.data.code === successCode) {
                    self.createBottomBar(rsp.data.rows[0], rsp.data.rows[1]);
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
            this.style2 = 'height:' + (0.35 * height) + 'px;width: ' + (0.4 * (width - 220)) + 'px';
        }
    }
</script>

<style scoped>
  /*@import "../../assets/layui/css/layui.css";*/

  .el-col {
    min-height: 1px;
  }
</style>
