<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="both">
    <el-tab-pane label="交易频率" name="tradeFrequency">
      <TradeFrequency/>
    </el-tab-pane>
    <el-tab-pane label="榜单数据" name="topCount">
      <TopCount/>
    </el-tab-pane>
    <el-tab-pane label="持股时长" name="keepDuration">
      <KeepDuration/>
    </el-tab-pane>
    <el-tab-pane label="个股盈利" name="shareProfit">
      <ShareProfit/>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
    import TradeFrequency from "./TradeFrequency";
    import TopCount from "./TopCount";
    import ShareProfit from "./ShareProfit";
    import KeepDuration from "./KeepDuration";

    export default {
        name: "Analyse",
        components: {KeepDuration, TradeFrequency, TopCount, ShareProfit},
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
