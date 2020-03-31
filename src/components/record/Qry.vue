<template>
  <div style="height: 100%">
    <el-row>
      <el-col :span="2" style="height: 40px">
        <div style="text-align: left;color: #606266;font-size: 16px;line-height:30px">查询条件</div>
      </el-col>
      <el-col :span="22"></el-col>
    </el-row>
    <el-row style="height: 40px">
      <el-col style="margin-left: 5px">
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
    <el-row style="height: 40px;text-align: left;color: #606266;font-size: 16px;line-height:40px">
      <el-col><span>查询结果</span></el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" height="480"
                :header-cell-style="{background:'#eef1f6',color:'#606266',fontWeight:'normal'}">
        <el-table-column align="left" prop="name" label="股票名称" style="color: #606266"></el-table-column>
        <el-table-column align="left" prop="code" label="股票代码"></el-table-column>
        <el-table-column align="left" prop="buyPrice" label="买入价格" :formatter="li2yuan"></el-table-column>
        <el-table-column align="left" prop="buyCount" label="买入数量"></el-table-column>
        <el-table-column align="left" prop="buyTime" label="买入时间" width="160"></el-table-column>
        <el-table-column align="left" prop="sellPrice" label="卖出价格" :formatter="li2yuan"></el-table-column>
        <el-table-column align="left" prop="sellTime" label="卖出时间" width="160"></el-table-column>
        <!--        <el-table-column align="left" prop="highPrice" label="最高价格" :formatter="li2yuan"></el-table-column>-->
        <!--        <el-table-column align="left" prop="lowPrice" label="最低价格" :formatter="li2yuan"></el-table-column>-->
        <!--        <el-table-column align="left" prop="openPrice" label="开盘价格" :formatter="li2yuan"></el-table-column>-->
        <!--        <el-table-column align="left" prop="closePrice" label="收盘价格" :formatter="li2yuan"></el-table-column>-->
        <el-table-column fixed="right" width="220"
                         align="center">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" size="medium " @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button  icon="el-icon-delete" size="medium " type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button v-if="scope.row.edit" type="success" size="medium"  icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">保存</el-button>
            <el-button v-if="scope.row.edit" class="cancel-btn" size="medium" icon="el-icon-refresh"  type="warning" @click="cancelEdit(scope.row)">取消</el-button>
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


