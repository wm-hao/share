<template>
  <div class="both">
    <el-row>
      <el-col>
        <el-form :inline="true" :model="qryParams" :rules="rules" ref="qryForm">
          <el-form-item label="股票名称" prop="name" size="small">
            <el-input v-model="qryParams.name" placeholder="请输入名称"/>
          </el-form-item>
          <el-form-item label="股票编码" prop="code" size="small">
            <el-input v-model="qryParams.code" placeholder="请输入编码"/>
          </el-form-item>
          <el-form-item label="顺序" prop="profit" size="small">
            <el-select v-model="qryParams.asc" placeholder="请选择顺序">
              <el-option label="盈利" value="Y"></el-option>
              <el-option label="亏损" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="medium">
            <el-button type="primary" @click="query" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData"
                :header-cell-style="{background:'#eef1f6',color:'#606266',fontWeight:'normal'}"
      >
        <el-table-column align="left" prop="name" label="股票名称" min-width="10%">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="code" label="股票代码" min-width="10%">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="profit" label="盈利" min-width="10%">
          <template slot-scope="scope">
            <span>{{ scope.row.profit}}</span>
          </template>
        </el-table-column>
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
    import {shareProfit, store_s_userId_key, successCode} from "../../../const";

    export default {
        name: "ProfitQry",
        data() {
            return {
                total: 0,
                currentPage: 1,
                tableData: [],
                qryParams: {
                    profit: '',
                    code: '',
                    name: '',
                    asc: ''
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
                let qryParam = this.qryParams;
                qryParam.pageNum = pageNum;
                qryParam.pageSize = 10;
                qryParam.userId = localStorage.getItem(store_s_userId_key);
                this.$http
                    .post(shareProfit, qryParam
                    )
                    .then(function (response) {
                        if (response) {
                            if (response.data.code === successCode) {
                                self.setTableData(response.data.rows);
                                self.total = response.data.total;
                            } else {
                                self.$message({
                                    message: response.data.message,
                                    center: true
                                })
                            }
                        } else {
                            self.$message({
                                message: '后台服务响应失败',
                                type: 'error',
                                center: true
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            query() {
                this.queryPage(this.currentPage);
            }
        }
    }
</script>

<style scoped>
  .el-col {
    min-height: 1px;
  }
</style>
