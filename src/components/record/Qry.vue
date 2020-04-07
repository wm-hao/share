<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="both">
    <el-tab-pane label="交易查询" name="tradeQry">
      <HistoryQry/>
    </el-tab-pane>
    <el-tab-pane label="盈利查询" name="profitQry">
      <ProfitQry/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
    import HistoryQry from "./qry/HistoryQry";
    import ProfitQry from "./qry/ProfitQry";

    export default {
        name: "Qry",
        components: {HistoryQry,ProfitQry},
        data() {
            return {
                activeName: 'tradeQry'
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
