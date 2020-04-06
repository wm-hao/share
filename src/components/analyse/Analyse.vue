<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="both">
    <el-tab-pane label="交易频率" name="tradeFrequency">
      <TradeFrequency/>
    </el-tab-pane>
    <el-tab-pane label="榜单数据" name="topCount"><TopCount/></el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<script>
    import TradeFrequency from "./TradeFrequency";
    import TopCount from "./TopCount";

    export default {
        name: "Analyse",
        components: {TradeFrequency,TopCount},
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
