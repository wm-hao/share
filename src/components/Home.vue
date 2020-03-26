<template>
  <div class="bigSize">
    <el-container class="both" style=" border: 1px solid #eee">
      <el-header>
        <el-row>
          <el-col :span="4">
          </el-col>
          <el-col :span="19"></el-col>
          <el-col :span="1">
            <el-dropdown @command="handleCommand">
              <el-avatar icon="el-icon-user-solid"></el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">Logout</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="299px">
          <el-menu :default-active="this.$route.path" router
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>交易管理</span>
              </template>
              <el-menu-item index="/rec/qry">记录查询</el-menu-item>
            </el-submenu>
            <el-menu-item index="/other"><i class="el-icon-menu"></i>其他管理</el-menu-item>
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
  }

  .el-header {
    padding: 0;
    background: #545c64;
  }

  .el-dropdown {
    margin-top: 10px;
  }

  .el-row {
    height: 60px
  }

  .el-col {
    min-height: 50px
  }

  .li el-menu-item is-active {
    padding-left: 80px;
  }

</style>
