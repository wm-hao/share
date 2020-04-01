<template>
  <div class="both">
    <el-row>
      <el-form :model="params" ref="myForm" :rules="params.rules">
        <el-table :data="params.rows" :header-cell-style="{background:'#eef1f6',color:'#606266',fontWeight:'normal'}">
          <el-table-column align="left" prop="name" label="股票名称" min-width="10%">
            <template slot-scope="scope">
              <el-form-item :prop="'rows.' + scope.$index + '.name'" :rules="params.rules.name">
                <el-input v-model="scope.row.name"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="alias" label="股票别名" min-width="10%">
            <template slot-scope="scope">
              <el-form-item :prop="'rows.' + scope.$index + '.alias'" :rules="params.rules.alias">
                <el-input v-model="scope.row.alias"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="code" label="股票代码" min-width="10%">
            <template slot-scope="scope">
              <el-form-item :prop="'rows.' + scope.$index + '.code'" :rules="params.rules.code">
                <el-input v-model="scope.row.code"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="buyPrice" label="买入价格" min-width="10%">
            <template slot-scope="scope">
              <el-form-item :prop="'rows.' + scope.$index + '.buyPrice'" :rules="params.rules.buyPrice">
                <el-input v-model.number="scope.row.buyPrice"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="buyCount" label="买入数量" min-width="10%">
            <template slot-scope="scope">
              <el-form-item :prop="'rows.' + scope.$index + '.buyCount'" :rules="params.rules.buyCount">
                <el-input v-model.number="scope.row.buyCount"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="sellPrice" label="卖出价格" min-width="10%">
            <template slot-scope="scope">
              <el-form-item :prop="'rows.' + scope.$index + '.sellPrice'" :rules="params.rules.sellPrice">
                <el-input v-model.number="scope.row.sellPrice"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="buyTime" label="买入时间" min-width="15%">
            <template slot-scope="scope">
              <el-form-item :prop="'rows.' + scope.$index + '.buyTime'" :rules="params.rules.buyTime">
                <el-date-picker v-model="scope.row.buyTime" type="datetime" placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="sellTime" label="卖出时间" min-width="15%">
            <template slot-scope="scope">
              <el-form-item :prop="'rows.' + scope.$index + '.sellTime'" :rules="params.rules.sellTime">
                <el-date-picker v-model="scope.row.sellTime" type="datetime" placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column fixed="right" min-width="20%" align="left" label="操作">
            <template slot-scope="scope">
              <el-button icon="el-icon-plus" size="medium " type="success"
                         @click="add(scope.$index, scope.row, 'myForm')">新增
              </el-button>
              <el-button icon="el-icon-close" size="medium " type="danger"
                         @click="reset(scope.$index, scope.row, 'myForm')">重置
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-row>
  </div>
</template>

<script>
    import {shareInsert, store_s_userId_key, successCode} from "../../const";

    export default {
        name: "Save",
        data() {
            return {
                params: {
                    rows: [{}],
                    rules: {
                        name: [
                            {required: true, message: '请输入股票名称', trigger: 'blur'},
                        ],
                        alias: [
                            {required: true, message: '请输入股票拼音', trigger: 'blur'}
                        ],
                        code: [
                            {required: true, message: '请输入股票代码', trigger: 'blur'},
                            {min: 6, max: 6, message: '长度6个字符', trigger: 'blur'}
                        ],
                        buyTime: [
                            {required: true, message: '请输入买入时间', trigger: 'change'}
                        ],
                        buyPrice: [
                            {required: true, message: '请输入买入价格', trigger: 'blur'},
                            {type: 'number', message: '请输入正确的买入价格', trigger: ['blur', 'change']}
                        ],
                        buyCount: [
                            {required: true, message: '请输入买入数量', trigger: 'blur'},
                            {type: 'number', message: '请输入正确的数量', min: 100, trigger: ['blur', 'change']}
                        ],
                        sellPrice: [
                            {type: 'number', message: '请输入正确的卖出价格', trigger: 'change'}
                        ],
                        sellTime: []
                    }
                }

            }
        },
        methods: {
            add(index, row, formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let self = this;
                        console.log(row);
                        let userId = localStorage.getItem(store_s_userId_key);
                        row.userId = Number.parseInt(userId);
                        this.$http.post(shareInsert, row).then(function (rsp) {
                            if (rsp.data.code === successCode) {
                                self.$message.success({
                                    message: '新增成功',
                                    center: true
                                });
                                self.reset(index, row, formName);
                            } else {
                                self.$message.error({
                                    message: rsp.data.message,
                                    center: true
                                });
                            }
                        }).catch(function (err) {
                            self.$message.error(err.message);
                        });
                    } else {
                        this.$message.error({
                            message: '输入信息有误',
                            center: true
                        });
                        return false;
                    }
                });
            },
            reset(index, row, formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>
