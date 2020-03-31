<template>
  <div class="both">
    <el-row>
      <el-col>
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
          <el-form-item label="状态" prop="operationType">
            <el-select v-model="qryParams.profitState" placeholder="请选择状态">
              <el-option label="盈利" value="Y"></el-option>
              <el-option label="亏损" value="N"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData"
                :header-cell-style="{background:'#eef1f6',color:'#606266',fontWeight:'normal'}">
        <el-table-column align="left" prop="name" label="股票名称" min-width="10%"></el-table-column>
        <el-table-column align="left" prop="code" label="股票代码" min-width="10%"></el-table-column>
        <el-table-column align="left" prop="buyPrice" label="买入价格" :formatter="li2yuan" min-width="10%"></el-table-column>
        <el-table-column align="left" prop="buyCount" label="买入数量" min-width="10%"></el-table-column>
        <el-table-column align="left" prop="buyTime" label="买入时间" min-width="15%"></el-table-column>
        <el-table-column align="left" prop="sellPrice" label="卖出价格" :formatter="li2yuan"
                         min-width="10%"></el-table-column>
        <el-table-column align="left" prop="sellTime" label="卖出时间" min-width="15%"></el-table-column>
        <el-table-column fixed="right" min-width="20%"
                         align="left" label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" size="medium " @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button icon="el-icon-delete" size="medium " type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
            <el-button v-if="scope.row.edit" type="success" size="medium"  icon="el-icon-circle-check-outline"
                       @click="confirmEdit(scope.row)">保存
            </el-button>
            <el-button v-if="scope.row.edit" class="cancel-btn" size="medium" icon="el-icon-refresh"  type="warning"
                       @click="cancelEdit(scope.row)">取消
            </el-button>
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
    import {shareListPage, successCode} from "../../const";

    export default {
        data() {
            return {
                tableData: [
                    {
                        name: '测试',
                        code: '666'
                    }
                ],
                total: 0,
                currentPage: 1,
                qryParams: {
                    profitState: '',
                    endDate: '',
                    startDate: ''
                },
                profitStates: [
                    {
                        value: 'Y',
                        label: '盈利'
                    }, {
                        value: 'N',
                        label: '亏损'
                    }
                ],
                rules: {}
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
                console.log(this.qryParams);
                console.log("表单提交");
                this.queryPage(this.currentPage);
            },
            handleEdit(index, row) {
                row.edit = !row.edit;
                row.disabled = true;
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            confirmEdit(row) {

            },
            cancelEdit(row) {

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
</style>


