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
          <el-table-column fixed="right" width="250px" align="left" label="操作">
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
    <div style="width: 50%;margin-top: 2%;margin-left: 1%">
      <el-row>
        <el-upload
          ref="upload"
          drag
          :action="uploadUrl"
          multiple
          :file-list="files"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :before-upload="beforeUpload"
          :data="extParas"
          :headers="headers"
          style="width: 100%"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处</div>
          <!--          <el-button style="margin-top: 5px;" size="large" type="success" @click="uploadFile">点击上传到后台服务器</el-button>-->
          <div class="el-upload__tip" slot="tip" style="color: red">{{tip}}</div>
        </el-upload>
      </el-row>
    </div>
    <div style="width: 50%;">
      <el-row style=""></el-row>
    </div>
  </div>
</template>

<script>
    import {shareInsert, store_s_token_key, store_s_userId_key, successCode} from "../../const";

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
                },
                files: [],
                tip: '',
                uploadUrl: 'http://localhost:11111/share/insertByFile',
                extParas: {},
                headers: {}
            }
        },
        methods: {
            add(index, row, formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let self = this;
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
            },
            beforeUpload(file) {
                let fileName = file.name;
                let fileSuffix = fileName.substr(fileName.lastIndexOf('.') + 1);
                if (fileSuffix === 'xlsx' || fileSuffix === 'xls') {
                    this.tip = '';
                    return true;
                } else {
                    this.tip = '请上传xlsx或者xls格式的文件，其余暂不支持';
                    return false;
                }
            },
            uploadSuccess(response, file, fileList) {
                if (response.code === successCode) {
                    this.$message({
                        message: response.message,
                        center: true,
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: response.message,
                        center: true,
                        type: 'error'
                    });
                    this.$refs.upload.clearFiles();
                }
            },
            uploadError(err, file, fileList) {
                this.$message({
                    message: err.message,
                    center: true,
                    type: 'error'
                });
            },
            uploadFile() {
                this.$refs.upload.submit();
            }
        },
        created() {
            this.extParas = {
                userId: localStorage.getItem(store_s_userId_key)
            };
            this.headers = {
                token: localStorage.getItem(store_s_token_key)
            }
        }
    }
</script>

<style scoped>

</style>
