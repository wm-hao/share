<template>
    <div class="both">
        <el-table :data="tableData" max-height="500" style="width: 100%">
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="code" label="编码"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="code" label="编码"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="code" label="编码"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="code" label="编码"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { serverUrl, shareList } from "@/const";
export default {
    data() {
        return {
            tableData: []
        };
    },
    methods: {
        setTableData(rows) {
            // 清空数据
            this.tableData.splice(0, this.tableData.length);
            for (let index in rows) {
                // 加入数据
                this.tableData.push(rows[index]);
            }
        }
    },
    created: function() {
        let self = this;
        this.$axios
            .get(serverUrl + shareList)
            .then(function(response) {
                console.log(response);
                self.setTableData(response.data);
            })
            .catch(function(error) {
                console.log(error);
            });
    }
};
</script>


