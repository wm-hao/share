<template>
  <div class="both bg">
    <el-row class="both">
      <el-col :span="18">

      </el-col>
      <el-col :span="6">
        <div class="center" style="width: 80%">
          <el-form
            :model="userForm"
            status-icon
            :rules="rules"
            ref="userForm"
            label-position="left"
            class="form"
          >
            <el-form-item style="text-align: center">
              <span style="color:#ff7d0a;font-size: 16px">欢迎登录</span>
            </el-form-item>
            <el-form-item prop="userName">
              <el-input
                v-model="userForm.userName"
                autocomplete="off"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input
                type="password"
                v-model="userForm.pass"
                autocomplete="off"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-col :span="10">
                  <el-checkbox v-model="checked" @change="changeRemember">&nbsp;记住密码</el-checkbox>
                </el-col>
                <el-col :span="4"></el-col>
                <el-col :span="10">
                  <el-link type="primary" @click="goRegistry">注册用户</el-link>
                </el-col>
              </el-row>
              <el-button
                type="primary"
                @click="submitForm('userForm')"
                class="login-button-box button"
              >登录
              </el-button>
              <el-button
                type="warning"
                @click="forgetPass"
                class="login-button-box button"
              >忘记密码
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
    import {
        rememberPass,
        store_f_changeLogin,
        strTrue,
        successCode,
        userExists,
        userInfo,
        userValidate
    } from "../const";
    import util from "../util";

    export default {
        data() {
            let validateUserName = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入用户名"));
                } else {
                    callback();
                }
            };
            let validatePass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入密码"));
                } else {
                    callback();
                }
            };
            return {
                checked: false,
                userForm: {
                    userName: "",
                    pass: ""
                },
                rules: {
                    userName: [{validator: validateUserName, trigger: "blur"}],
                    pass: [{validator: validatePass, trigger: "blur"}],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let self = this;
                        let newPass = util.MD5(this.userForm.pass).toString();
                        // let storePass = this.$cookies.get(this.userForm.userName);
                        // if (this.userForm.pass === storePass) {
                        //     newPass = this.userForm.pass;
                        // }
                        this.$http.post(userValidate, {
                            userName: self.userForm.userName,
                            password: newPass
                        }).then(function (resp) {
                            if (resp.data.code === successCode) {
                                let msg = resp.data.message;
                                let index = msg.indexOf('-');
                                let userId = msg.substr(0, index);
                                let token = msg.substr(index + 1);
                                self.$store.commit(store_f_changeLogin, {
                                    authToken: token,
                                    userId: userId
                                });
                                if (self.checked) {
                                    self.$cookies.set(rememberPass, strTrue, '1d');
                                    self.$cookies.set(userInfo, self.userForm.userName);
                                    self.$cookies.set(self.userForm.userName, self.userForm.pass);
                                } else {
                                    self.$cookies.remove(rememberPass);
                                    self.$cookies.remove(userInfo);
                                    self.$cookies.remove(self.userForm.userName);
                                }
                                self.$router.push({path: "/home"});
                            } else {
                                self.$message.error({
                                        message: '用户登录验证失败',
                                        center: true,
                                        type: 'error'
                                    }
                                );
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
            existsUserName(userName) {
                this.$http.get(userExists, {
                    params: {
                        userName: userName
                    }
                }).then(function (resp) {
                    if (resp.data.code === successCode) {
                        return true;
                    }
                }).catch(function (err) {

                });
                return false;
            },
            forgetPass() {
                this.$router.push('/forget');
            },
            goRegistry() {
                this.$router.push('/registry');
            },
            changeRemember() {
                this.$cookies.remove(rememberPass);
                this.$cookies.remove(userInfo);
                this.$cookies.remove(this.userForm.userName);
            }
        },
        created() {
            let rp = this.$cookies.get(rememberPass);
            if (rp === strTrue) {
                let userName = this.$cookies.get(userInfo);
                this.userForm.userName = userName;
                this.userForm.pass = this.$cookies.get(userName);
                this.checked = true;
                console.log('user=' + userName + ';pass=' + this.userForm.pass);
            }
        }
    };
</script>

<style scoped>

  .login-input-box input:hover {
    border: 1px solid #ff7d0a;
  }

  .login-input-box input:after {
    border: 1px solid #ff7d0a;
  }

  .login-button-box {
    margin-top: 12px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    display: inline-block;
  }

  .login-button-box button {
    background-color: #ff7d0a;
    color: #ffffff;
    font-size: 14px;
    height: 40px;
    margin-left: 18px;
    border: 1px solid #ff7d0a;
    border-radius: 4px;
  }

  .login-button-box button:hover {
    background-color: #ee7204;
  }

  .login-button-box button:active {
    background-color: #ee7204;
  }

  .el-col {
    min-height: 1px;
    height: 100%;
  }

  .form {
    margin: 20px;
    padding: 20px;
    background-color: white;
  }
</style>
