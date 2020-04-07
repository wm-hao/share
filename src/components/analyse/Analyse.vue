<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="both">
    <el-tab-pane label="交易频率" name="tradeFrequency">
      <TradeFrequency/>
    </el-tab-pane>
    <el-tab-pane label="榜单数据" name="topCount">
      <TopCount/>
    </el-tab-pane>
    <el-tab-pane label="资金数据" name="assetsData">
      <Assets/>
    </el-tab-pane>
    <el-tab-pane label="个股盈利" name="shareProfit">
      <ShareProfit/>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
    import TradeFrequency from "./TradeFrequency";
    import TopCount from "./TopCount";
    import Assets from "./Assets";
    import ShareProfit from "./ShareProfit";

    export default {
        name: "Analyse",
        components: {Assets, TradeFrequency, TopCount, ShareProfit},
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
