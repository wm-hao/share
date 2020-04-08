<template>
  <div>
    <el-row>
      <button type="button" class="layui-btn">一个标准的按钮</button>
    </el-row>
    <el-row>
      <el-col :span="12"></el-col>
      <el-col :span="12"></el-col>
    </el-row>

  </div>
</template>

<script src="../../assets/layui/layui.all.js"></script>
<script>
    export default {
        name: "Assets"
    }
</script>

<style scoped>
  @import "../../assets/layui/css/layui.css";

  .el-col {
    min-height: 1px;
  }
</style>
