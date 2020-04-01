<template>
  <div class="both">
    <el-row>
      <el-col>
        <el-form :inline="true" :model="qryParams" :rules="rules" ref="qryForm">
          <el-form-item label="开始日期" size="medium">
            <el-date-picker
              v-model="qryParams.startDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyyMMdd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期 " size="medium">
            <el-date-picker
              v-model="qryParams.endDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyyMMdd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="状态" prop="profit" size="medium">
            <el-select v-model="qryParams.profit" placeholder="请选择状态">
              <el-option label="盈利" value="Y"></el-option>
              <el-option label="亏损" value="N"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="asc" size="medium">
            <el-select v-model="qryParams.asc" placeholder="请选择按创建日期排序方式">
              <el-option label="由近到远" value="N"></el-option>
              <el-option label="由远到近" value="Y"></el-option>
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
            <el-input v-model="scope.row.name" v-if="scope.row.seen"
                      ></el-input>
            <span v-else>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="alias" label="股票别名" min-width="10%">
          <template slot-scope="scope">
            <el-input v-model="scope.row.alias" v-if="scope.row.seen"
                      ></el-input>
            <span v-else>{{ scope.row.alias }}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="code" label="股票代码" min-width="10%">
          <template slot-scope="scope">
            <el-input v-model="scope.row.code" v-if="scope.row.seen"
                      ></el-input>
            <span v-else>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="buyPrice" label="买入价格" :formatter="li2yuan"
                         min-width="10%">
          <template slot-scope="scope">
            <el-input v-model="scope.row.buyPrice" v-if="scope.row.seen"
                      ></el-input>
            <span v-else>{{ scope.row.buyPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="buyCount" label="买入数量" min-width="10%">
          <template slot-scope="scope">
            <el-input v-model="scope.row.buyCount" v-if="scope.row.seen"
                      ></el-input>
            <span v-else>{{ scope.row.buyCount }}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="sellPrice" label="卖出价格" :formatter="li2yuan"
                         min-width="10%">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sellPrice" v-if="scope.row.seen"
                      ></el-input>
            <span v-else>{{ scope.row.sellPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="buyTime" label="买入时间" min-width="15%">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.buyTime"
              type="datetime"
              placeholder="选择日期"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-if="scope.row.seen"
              >
            </el-date-picker>
            <span v-else>{{ scope.row.buyTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="sellTime" label="卖出时间" min-width="15%">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.sellTime"
              type="datetime"
              placeholder="选择日期"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-if="scope.row.seen"
              >
            </el-date-picker>
            <span v-else>{{ scope.row.sellTime }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" min-width="20%"
                         align="left" label="操作">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.seen" icon="el-icon-edit" size="medium "
                       @click="handleEdit(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button v-if="!scope.row.seen" icon="el-icon-delete" size="medium " type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
            <el-button v-if="scope.row.seen" type="success" size="medium"  icon="el-icon-circle-check"
                       @click="confirmEdit(scope.row)">保存
            </el-button>
            <el-button v-if="scope.row.seen" size="medium" icon="el-icon-refresh"  type="warning"
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
    import {shareDelete, shareListPage, shareUpdate, successCode} from "../../const";

    export default {
        data() {
            return {
                tableData: [],
                cacheTableData: [],
                total: 0,
                currentPage: 1,
                qryParams: {
                    profit: '',
                    endDate: '',
                    startDate: '',
                    asc: ''
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
                this.cacheTableData.splice(0, this.cacheTableData.length);
                for (let index in rows) {
                    // 加入数据
                    let item = rows[index];
                    item.seen = false;
                    let cacheItem = JSON.parse(JSON.stringify(item));
                    this.cacheTableData.push(cacheItem);
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
                let qryParam = this.qryParams;
                qryParam.pageNum = pageNum;
                qryParam.pageSize = 10;
                this.$http
                    .post(shareListPage, qryParam)
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
            },
            handleEdit(index, row) {
                row.seen = true;
            },
            handleDelete(index, row) {
                let self = this;
                this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    self.$http.post(shareDelete, {
                            id: row.id
                        }
                    ).then(function (rsp) {
                        if (rsp.data.code === successCode) {
                            self.$message({
                                message: rsp.data.message,
                                center: true,
                                type: 'success'
                            });
                            let deleteRow = self.getRowInfo(self.tableData, row.id);
                            self.tableData.splice(deleteRow.index, 1);
                        } else {
                            self.$message({
                                message: rsp.data.message,
                                center: true,
                                type: 'error'
                            });
                        }
                    }).catch(function (err) {
                        self.$message.error(err.message);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                        center: true
                    });
                })
            },
            confirmEdit(row) {
                row.seen = false;
                let self = this;
                this.$http.post(shareUpdate, row
                ).then(function (rsp) {
                    self.$message({
                        message: '更新成功',
                        center: true,
                        type: 'success'
                    });
                }).catch(function (err) {
                    self.$message.error(err.message);
                });
            },
            cancelEdit(row) {
                let rowInfo = this.getRowInfo(this.cacheTableData, row.id);
                this.tableData.splice(rowInfo.index, 1, rowInfo.data);
            },
            loseFocus(index, row) {
            },
            cellClick(row, column) {
                row.seen = true;
            },
            getRowInfo(arr, id) {
                let index;
                let newArr = arr.filter(
                    (item, idx) => {
                        if (item.id === id) {
                            index = idx;
                            return true;
                        }
                        return false;
                    }
                );
                return {
                    data: newArr[0],
                    index: index
                }
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


