<template>
    <div>
        <el-container class="both">
            <el-header>
                <h1>头部</h1>
            </el-header>
            <el-container>
                <el-aside>
                    <el-menu :default-active="this.$route.path" router class="height">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>交易管理</span>
                            </template>
                            <el-menu-item index="/rec/manage/qry">记录查询</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "Home"
};
</script>

<style scoped>
.height {
    height: 100%;
}
.width {
    width: 100%;
}
.both {
    height: 100%;
    width: 100%;
}
</style>