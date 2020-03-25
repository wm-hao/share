<template>
  <div class="bigSize">
    <el-container class="both">
      <el-header>
        <el-row>
          <el-col :span="4"><h1>头部</h1></el-col>
          <el-col :span="16"></el-col>
          <el-col :span="4">
            <el-button @click="logout">登出</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu :default-active="this.$route.path" router>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>交易管理</span>
              </template>
              <el-menu-item index="/rec/qry">记录查询</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <div>
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    import {store_f_changeLogin} from "../const";

    export default {
        name: "Home",
        methods: {
            logout: function () {
                this.$store.commit(store_f_changeLogin, null);
            }
        }
    };
</script>

<style scoped>
  .el-col {
    min-height: 1px
  }

</style>
