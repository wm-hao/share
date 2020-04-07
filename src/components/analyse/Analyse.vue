<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="both">
    <el-tab-pane label="交易频率" name="tradeFrequency">
      <TradeFrequency/>
    </el-tab-pane>
    <el-tab-pane label="榜单数据" name="topCount"><TopCount/></el-tab-pane>
    <el-tab-pane label="资金数据" name="assetsData"><Assets/></el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>
<script>
    import TradeFrequency from "./TradeFrequency";
    import TopCount from "./TopCount";
    import Assets from "./Assets";

    export default {
        name: "Analyse",
        components: {Assets, TradeFrequency,TopCount},
        data() {
            return {
                activeName: 'tradeFrequency'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style scoped>

</style>
