<template>
  <div>
    <el-table :data="tableData" max-height="500" style="width: 100%">
      <el-table-column v-for="col in cols" :key="col.id" :prop="col.prop" :label="col.label"></el-table-column>
    </el-table>
  </div>
</template>

<script>
    import {serverUrl, err405, shareList} from "../../const";

    export default {
        data() {
            return {
                tableData: [],
                cols: []
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
        created: function () {
            let self = this;
            this.cols.push({
                id: 1,
                prop: "name",
                label: "名称"
            });
            this.$http
                .get(shareList)
                .then(function (response) {
                    console.log(response);
                    self.setTableData(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            this.$http.get(err405)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };
</script>


