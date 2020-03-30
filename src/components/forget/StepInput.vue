<template>
  <div class="both">
    <el-form :model="forgetForm" :rules="rules" ref="forgetForm" label-width="100px" label-position="left">
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="forgetForm.name" placeholder="请输入您要找回的用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址" prop="email">
        <el-input v-model="forgetForm.email" placeholder="请输入用户绑定的邮箱"></el-input>
      </el-form-item>
      <el-form-item style="display: inline">
        <el-row>
          <el-col :span="16">
            <el-input v-model="forgetForm.verifyCode" placeholder="请输入邮箱验证码"></el-input>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="7">
            <el-button type="primary" @click="submitForm('forgetForm')"
                       style="width: 100%;text-align: left;padding-left: 3px"
                       :disabled="hasReqVerifyCode">获取验证码<span v-if="hasReqVerifyCode">{{leftSeconds}}秒</span>
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item style="padding-top: 25px">
        <el-button @click="nextStep" type="warning" style="width: 100%">下一步</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="goHome" style="width: 100%">返回登录页面</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import {
        store_f_changeStep,
        successCode,
        userExists,
        userInfo,
        userValidate,
        userVerifyCode,
        verify_code
    } from "../../const";

    export default {
        name: "StepInput",
        data() {
            let validateUserName = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入用户名"));
                }
                let errMsg = "用户名不存在";
                let success = true;
                this.$http.get(userExists, {
                    params: {
                        userName: value
                    }
                }).then(function (resp) {
                    if (resp.data.code === successCode) {
                        success = false;
                    }
                }).catch(function (err) {
                    errMsg = "调用后台用户校验服务失败";
                });
                setTimeout(() => {
                    if (success) {
                        callback();
                    } else {
                        callback(new Error(errMsg));
                    }
                }, 1000);
            };
            let validateEmail = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入用户录入的邮箱"));
                }
                if (this.forgetForm.name === "") {
                    callback(new Error("请先输入要找回的用户名"));
                }
                let errMsg = "此邮箱必须是用户注册时填写的邮箱";
                let success = false;
                this.$http.post(userValidate, {
                    userName: this.forgetForm.name,
                    email: value
                }).then(function (resp) {
                    if (resp.data.code == successCode) {
                        console.log('成功');
                        success = true;
                    }
                }).catch(function (err) {
                    errMsg = "调用后台用户校验服务失败";
                });
                setTimeout(() => {
                    if (success) {
                        callback();
                    } else {
                        console.log('失败');
                        callback(new Error(errMsg));
                    }
                }, 1000);
            };
            return {
                forgetForm: {
                    name: '',
                    email: '',
                    verifyCode: ''
                },
                leftSeconds: 60,
                hasReqVerifyCode: false,
                rules: {
                    name: [
                        {required: true, message: '请输入您要找回的用户名', trigger: 'blur'},
                        {validator: validateUserName, trigger: "blur"},
                        {min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入用户绑定的邮箱', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']},
                        {validator: validateEmail, trigger: "blur"},
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                console.log("开始获取验证码");
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let self = this;
                        let userName = self.forgetForm.name;
                        let email = self.forgetForm.email;
                        this.$http.get(userVerifyCode, {
                            params: {
                                userName: userName,
                                email: email
                            }
                        }).then(function (rsp) {
                            if (rsp.data.code === successCode) {
                                let verifyCode = rsp.data.message;
                                console.log("验证码:" + verifyCode);
                                localStorage.setItem(userInfo, userName);
                                localStorage.setItem(verify_code, verifyCode);
                                self.hasReqVerifyCode = true;
                                self.countDown();
                            }
                        }).catch(function (err) {
                            self.$message.error(err.message);
                        });
                    } else {
                        this.$message.error('输入信息有误');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            countDown() {
                let interval = setInterval(() => {
                    if (this.leftSeconds <= 0) {
                        clearInterval(interval);
                        this.leftSeconds = 60;
                        this.hasReqVerifyCode = false;
                    } else {
                        this.leftSeconds = this.leftSeconds - 1;
                    }
                }, 1000);
            },
            nextStep() {
                console.log("下一步");
                let serverVerifyCode = localStorage.getItem(verify_code);
                if (serverVerifyCode === this.forgetForm.verifyCode) {
                    this.$store.commit(store_f_changeStep, 'next');
                    this.$router.push('/forget/check');
                } else {
                    this.$message.error('验证码不正确');
                }
            },
            goHome() {
                this.$router.push('/login');
            }
        },
        created() {
            this.$store.commit(store_f_changeStep, false);
        }
    }
</script>

<style scoped>
  .el-col {
    min-height: 20px;
  }
</style>
