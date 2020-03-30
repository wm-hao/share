<template>
  <div class="both bg">
    <el-row>
      <el-col :span="9">
      </el-col>
      <el-col :span="6" style="text-align: center">
        <el-row style="min-height: 50px"></el-row>
        <el-row>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <!--            <el-row>-->
            <!--              <el-col :span="12">-->
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入您要注册的用户名称"></el-input>
            </el-form-item>
            <!--              </el-col>-->
            <!--              <el-col :span="12">-->
            <el-form-item label="用户密码" prop="password">
              <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="password2">
              <el-input v-model="form.password2" placeholder="请再次输入密码" type="password"></el-input>
            </el-form-item>
            <!--              </el-col>-->
            <!--            </el-row>-->

            <!--            <el-row>-->
            <!--              <el-col :span="12">-->
            <el-form-item label="邮箱地址" prop="email">
              <el-input v-model="form.email" placeholder="请输入您要绑定的邮箱"></el-input>
            </el-form-item>
            <!--              </el-col>-->
            <!--              <el-col :span="12">-->
            <el-form-item label="手机号码" prop="billId">
              <el-input v-model="form.billId" placeholder="请输入您的手机号"></el-input>
            </el-form-item>
            <!--              </el-col>-->
            <!--            </el-row>-->

            <!--            <el-row>-->
            <!--              <el-col :span="12">-->
            <el-form-item label="地址信息" prop="address">
              <el-input v-model="form.address" placeholder="请输入您的地址信息"></el-input>
            </el-form-item>
            <!--              </el-col>-->
            <!--              <el-col :span="12">-->
            <el-form-item label="邮政编码" prop="zip">
              <el-input v-model="form.zip" placeholder="请输入您所在地邮政编码"></el-input>
            </el-form-item>
            <!--              </el-col>-->
            <!--            </el-row>-->

            <el-form-item>
              <el-row>
                <el-col :span="12" style="text-align: left">
                  <el-button type="primary" @click="onSubmit('form')">立即创建用户</el-button>
                </el-col>
                <el-col :span="12" style="text-align: right">
                  <el-button type="warning" @click="goHome">返回登录页面</el-button>
                </el-col>
              </el-row>
            </el-form-item>


          </el-form>
        </el-row>
      </el-col>
      <el-col :span="9">
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import {failCode, successCode, userExists, userInsert} from "../const";
    import util from "../util";

    export default {
        name: "Registry",
        data() {
            let validateUserName = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入用户名"));
                }
                let errMsg = "用户名已被注册";
                let success = true;
                this.$http.get(userExists, {
                    params: {
                        userName: value
                    }
                }).then(function (resp) {
                    if (resp.data.code === failCode) {
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
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.password2 !== '') {
                        this.$refs.form.validateField('password2');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    userName: '',
                    password: '',
                    password2: '',
                    email: '',
                    billId: '',
                    address: '',
                    zip: ''
                },
                rules: {
                    userName: [
                        {required: true, message: '请输入您要注册的用户名', trigger: 'blur'},
                        {validator: validateUserName, trigger: "blur"},
                        {min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入需要绑定的邮箱', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']},
                    ],
                    password: [
                        {required: true, message: '请输入您的密码', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'},
                        {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'}
                    ],
                    password2: [
                        {required: true, message: '请再次输入您的密码', trigger: 'blur'},
                        {validator: validatePass2, trigger: 'blur'},
                        {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let self = this;
                        let pass = util.MD5(self.form.password).toString();
                        console.log("用户注册密码:" + pass);
                        let user = this.form;
                        user.password = pass;
                        self.$http.post(userInsert, user).then(function (rsp) {
                            if (rsp.data.code === successCode) {
                                self.$message({
                                    message: '恭喜您，用户注册成功，将在3秒后切换到登录界面',
                                    center: true
                                });
                                self.resetForm(formName);
                                setTimeout(() => {
                                    self.$router.push('/login');
                                }, 3000);
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
            goHome() {
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>
  .el-col {
    min-height: 10px;
  }
</style>
