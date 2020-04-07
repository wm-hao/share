<template>
  <div id="profitChart" :style="style"></div>
</template>

<script>
    import {shareProfitAll, store_s_userId_key, successCode} from "../../const";

    export default {
        name: "ShareProfit",
        data() {
            return {
                style: ''
            }
        },
        methods: {
            createProfitBar: function (category, data) {
                let myChart = this.$echarts.init(document.getElementById('profitChart'));
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
                                interval: 0
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
                            name: '个股盈利',
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
            }
        },
        created() {
            let height = window.innerHeight;
            let width = window.innerWidth;
            this.style = 'height:' + (0.6 * height) + 'px;width: ' + (width - 220) + 'px';
        },
        mounted() {
            let self = this;
            this.$http.get(shareProfitAll, {
                params: {
                    userId: localStorage.getItem(store_s_userId_key)
                }
            }).then(function (rsp) {
                if (rsp.data.code === successCode) {
                    self.createProfitBar(rsp.data.rows[0], rsp.data.rows[1]);
                } else {
                    self.$message.error(rsp.data.message);
                }
            }).catch(function (err) {
                self.$message.error(err.message);
            });
        }
    }
</script>

<style scoped>

</style>
