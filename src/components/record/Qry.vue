<template>
  <div>
    <el-table :data="tableData" max-height="500" style="width: 100%">
      <el-table-column align="center" prop="name" label="股票名称"></el-table-column>
      <el-table-column align="center" prop="code" label="股票代码"></el-table-column>
      <el-table-column align="center" prop="buyPrice" label="买入价格" :formatter="li2yuan"></el-table-column>
      <el-table-column align="center" prop="buyCount" label="买入数量"></el-table-column>
      <el-table-column align="center" prop="buyTime" label="买入时间" width="160"></el-table-column>
      <el-table-column align="center" prop="sellPrice" label="卖出价格" :formatter="li2yuan"></el-table-column>
      <el-table-column align="center" prop="sellTime" label="卖出时间" width="160"></el-table-column>
      <el-table-column align="center" prop="highPrice" label="最高价格" :formatter="li2yuan"></el-table-column>
      <el-table-column align="center" prop="lowPrice" label="最低价格" :formatter="li2yuan"></el-table-column>
      <el-table-column align="center" prop="openPrice" label="开盘价格" :formatter="li2yuan"></el-table-column>
      <el-table-column align="center" prop="closePrice" label="收盘价格" :formatter="li2yuan"></el-table-column>
    </el-table>
  </div>
</template>

<script>
    import {shareList} from "../../const";

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
                    let item = rows[index];
                    this.tableData.push(item);
                }
            },
            li2yuan(li) {
                let yuan = (parseInt(li) / 1000).toString();
                console.log(yuan);
                return yuan;
            }
        },
        created: function () {
            let self = this;
            this.$http
                .get(shareList)
                .then(function (response) {
                    console.log(response);
                    if (response) {
                        self.setTableData(response.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };
</script>


