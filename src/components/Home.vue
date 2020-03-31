<template>
  <div class="both">
    <div style="background: #545c64;height: 10%">
      <el-row>
        <el-col :span="4">
        </el-col>
        <el-col :span="19"></el-col>
        <el-col :span="1">
          <el-dropdown @command="handleCommand">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
    <div class="height" style="background: red;height: 90%"></div>
    <!--    <el-row >-->
    <!--      <el-col :span="4">-->
    <!--        <el-aside width="100%">-->
    <!--          <el-menu :default-active="this.$route.path" router-->
    <!--                   background-color="#545c64"-->
    <!--                   text-color="#fff"-->
    <!--                   active-text-color="#ffd04b"-->
    <!--                   style="border-right-color: #545c64;">-->
    <!--            <el-submenu index="1">-->
    <!--              <template slot="title">-->
    <!--                <i class="el-icon-menu"></i>-->
    <!--                <span>交易管理</span>-->
    <!--              </template>-->
    <!--              <el-menu-item index="/rec/qry"><span style="margin-left: 40px">记录查询</span></el-menu-item>-->
    <!--              <el-menu-item index="/rec/save"><span style="margin-left: 40px">新增记录</span></el-menu-item>-->
    <!--            </el-submenu>-->
    <!--            <el-menu-item index="/analyse">-->
    <!--              <i class="el-icon-menu"></i>-->
    <!--              <span>数据分析</span></el-menu-item>-->
    <!--          </el-menu>-->
    <!--        </el-aside>-->
    <!--      </el-col>-->
    <!--      <el-col :span="20">-->
    <!--        <el-main>-->
    <!--          <div>-->
    <!--            <router-view></router-view>-->
    <!--          </div>-->
    <!--        </el-main>-->
    <!--      </el-col>-->
    <!--    </el-row>-->
  </div>
</template>

<script>
    import {store_f_changeLogin} from "../const";

    export default {
        name: "Home",
        methods: {
            logout: function () {
                this.$store.commit(store_f_changeLogin, null);
                this.$router.push('/login');
            },
            handleCommand: function (command) {
                console.log("下拉菜单处理:" + command);
                if (command === 'logout') {
                    this.logout();
                }
            }
        }
    };
</script>

<style scoped>
  .system {

  }

  .el-aside {
    background: #545c64;
    height: 100%;
    width: 100%;
  }

  .el-dropdown {
    margin-top: auto;
  }

  .el-col {
    min-height: 50px;
    height: 100%;
  }

  .li el-menu-item is-active {
    padding-left: 80px;
  }

  span {
    font-size: 16px;
  }

</style>
