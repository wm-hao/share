<template>
  <div class="both bg">
    <el-row>
      <el-col :span="9">
      </el-col>
      <el-col :span="6">
        <el-row style="min-height: 100px"></el-row>
        <el-row>
          <el-steps :active="activeStep" finish-status="success" process-status="process">
            <el-step title="填写信息"></el-step>
            <el-step title="新密码"></el-step>
          </el-steps>
        </el-row>
        <el-row style="margin-top: 20px">
          <router-view/>
        </el-row>
      </el-col>
      <el-col :span="9">
      </el-col>
    </el-row>
  </div>
</template>

<script>

    export default {
        name: "ForgetPass",
        data() {
            return {}
        },
        computed: {
            activeStep: function () {
                return Number(this.$store.state.activeStep);
            }
        },
        created() {
            this.$router.push('/forget/input');
        }
    }
</script>

<style scoped>
  .el-col {
    min-height: 200px;
  }
</style>
