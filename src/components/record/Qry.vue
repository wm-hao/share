<template>
  <div style="height: 100%">
    <el-row>
      <el-col :span="2">
        <div style="text-align: left;color: #606266;font-size: 16px;line-height:40px">查询条件</div>
      </el-col>
      <el-col :span="23"></el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
      </el-col>
      <el-col :span="23">
        <el-form :inline="true" :model="qryParams" :rules="rules" ref="qryForm">
          <el-form-item label="开始日期">
            <el-date-picker
              v-model="qryParams.startDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyyMMdd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label=结束日期>
            <el-date-picker
              v-model="qryParams.endDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyyMMdd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="操作类型" prop="operationType">
            <el-select v-model="qryParams.operationType" placeholder="请选择操作类型">
              <el-option label="买入" value="buy"></el-option>
              <el-option label="卖出" value="sell"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div style="text-align: left;color: #606266;font-size: 16px;line-height:40px">查询结果</div>
      </el-col>
      <el-col :span="23"></el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%;color:#606266">
        <el-table-column align="left" prop="name" label="股票名称" style="color: #606266"></el-table-column>
        <el-table-column align="left" prop="code" label="股票代码"></el-table-column>
        <el-table-column align="left" prop="buyPrice" label="买入价格" :formatter="li2yuan"></el-table-column>
        <el-table-column align="left" prop="buyCount" label="买入数量"></el-table-column>
        <el-table-column align="left" prop="buyTime" label="买入时间" width="160"></el-table-column>
        <el-table-column align="left" prop="sellPrice" label="卖出价格" :formatter="li2yuan"></el-table-column>
        <el-table-column align="left" prop="sellTime" label="卖出时间" width="160"></el-table-column>
        <el-table-column align="left" prop="highPrice" label="最高价格" :formatter="li2yuan"></el-table-column>
        <el-table-column align="left" prop="lowPrice" label="最低价格" :formatter="li2yuan"></el-table-column>
        <el-table-column align="left" prop="openPrice" label="开盘价格" :formatter="li2yuan"></el-table-column>
        <el-table-column align="left" prop="closePrice" label="收盘价格" :formatter="li2yuan"></el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-col :span="8"></el-col>
      <el-col :span="8" style="text-align: center">
        <el-pagination
          background
          layout="prev, pager, next, total"
          :total="total"
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange"
          @prev-click="handlePrevClick"
          @next-click="handleNextClick"
        >
        </el-pagination>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
  </div>
</template>

<script>
    import {shareListPage} from "../../const";

    export default {
        data() {
            return {
                tableData: [],
                total: 0,
                currentPage: 1,
                qryParams: {
                    operationType: '',
                    endDate: '',
                    startDate: ''
                },
                operations: [
                    {
                        value: 'B',
                        label: '买入'
                    }, {
                        value: 'S',
                        label: '卖出'
                    }
                ],
                rules: {
                    operationType: [{
                        // required: true, message: '请选择操作类型', trigger: 'blur'
                    }]
                }
            }
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
            li2yuan(row, col, cell) {
                return cell / 1000;
            },
            handlePrevClick(pageNum) {
                this.queryPage(pageNum);
            },
            handleNextClick(pageNum) {
                this.queryPage(pageNum);
            },
            handleCurrentChange(pageNum) {
                this.queryPage(pageNum);
            },
            queryPage(pageNum) {
                let self = this;
                this.$http
                    .get(shareListPage, {
                        params: {
                            pageNum: pageNum - 1,
                            pageSize: 10
                        }
                    })
                    .then(function (response) {
                        console.log(response);
                        if (response) {
                            self.setTableData(response.data.rows);
                            self.total = response.data.total;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            query() {
                console.log(this.qryParams);
                console.log("表单提交");
                this.queryPage(this.currentPage);
            }
        },
        created: function () {

        }
    }
    ;
</script>

<style scoped>
  .el-col {
    min-height: 20px;
  }

  .el-pagination {
    margin-top: 10px;
  }

  .el-table cell {
    color: #606266;
  }

</style>


