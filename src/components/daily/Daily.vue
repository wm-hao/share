<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="both">
    <el-tab-pane label="历史日志" name="qry">
      <DailiesQry/>
    </el-tab-pane>
    <el-tab-pane label="添加日志" name="save">
      <Save/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
    import DailiesQry from "./DailiesQry";
    import Save from "./Save";

    export default {
        name: "Daily",
        components: {Save, DailiesQry},
        data() {
            return {
                activeName: 'qry'
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
