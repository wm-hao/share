<template>
  <div class="both">
    <div style="background: #545c64;height: 10%">
      <el-row class="height">
        <el-col :span="23"></el-col>
        <el-col :span="1">
          <div class="center">
            <el-dropdown @command="handleCommand">
              <el-avatar icon="el-icon-user-solid"></el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出</el-dropdown-item>
                <el-dropdown-item command="update">修改</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="height: 90%">
      <el-container class="both">
        <el-aside style="background-color: #545c64" width="220px">
          <el-menu :default-active="this.$route.path" router
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b"
                   style="border-right-color: #545c64;">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>交易管理</span>
              </template>
              <el-menu-item index="/rec/qry"><span style="margin-left: 25px">记录查询</span></el-menu-item>
              <el-menu-item index="/rec/save"><span style="margin-left: 25px">新增记录</span></el-menu-item>
            </el-submenu>
            <el-menu-item index="/analyse">
              <i class="el-icon-menu"></i>
              <span>数据分析</span></el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
    import {store_f_changeLogin} from "../const";

    export default {
        name: "Home",
        methods: {
            logout: function () {
                this.$store.commit(store_f_changeLogin, {
                    authToken: null,
                    userId: null
                });
                localStorage.clear();
                this.$router.replace('/login');
            },
            update() {
                console.log(this.$router.path);
                this.$router.replace('/user/update')
            },
            handleCommand: function (command) {
                if (command === 'logout') {
                    this.logout();
                }
                if (command === 'update') {
                    this.update();
                }
            }
        }
    };
</script>

<style scoped>

  .el-col {
    height: 100%;
  }

  span {
    font-size: 16px;
  }

</style>
