<template>
    <div>
        <el-row :gutter="10" class="both">
            <!-- 左侧 -->
            <el-col :span="4" class="only-height">
                <div>
                    <el-menu
                        default-active
                        @open="handleOpen"
                        @close="handleClose"
                        @select="handleSelect"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        class="both"
                    >
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>导航一</span>
                            </template>
                            <el-menu-item index="1-1">选项1-1</el-menu-item>
                            <el-menu-item index="1-2">选项1-2</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="2">
                            <el-menu-item index="2-1">选项2-1</el-menu-item>
                        </el-menu-item>
                    </el-menu>
                </div>
            </el-col>
            <!-- 右侧 -->
            <el-col :span="20" class="only-height">
                <div>tab内容</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "demo",
    components: {},
    data() {
        return {
            activeIndex: "1"
        };
    },
    methods: {
        handleOpen: function(key, keyPath) {
            console.log("open事件");
            console.log(key, keyPath);
        },
        handleClose: function(key, keyPath) {
            console.log("close事件");
            console.log(key, keyPath);
        },
        handleSelect(index, indexPath) {
            console.log("select事件");
            console.log(index, indexPath);
            console.log("path长度" + indexPath.length);
        }
    }
};
</script>

<style>
.el-submenu .el-menu-item {
    min-width: 100px;
    padding-left: 10px;
}
.both {
    height: 100%;
    width: 100%;
}
.only-height {
    height: 100%;
}
.only-width {
    width: 100%;
}
</style>