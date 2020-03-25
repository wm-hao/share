<template>
  <div class="bg bigSize">
    <div class="center size">
      <el-form
        :model="userForm"
        status-icon
        :rules="rules"
        ref="userForm"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="用户名" prop="userName">
                    <span slot="label">
                        <span class="span-box">
                            <i class="el-icon-user"></i>
                            <span>用户</span>
                        </span>
                    </span>
          <el-input
            v-model="userForm.userName"
            autocomplete="off"
            placeholder="Please enter your email/phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
                    <span slot="label">
                        <span class="span-box">
                            <i class="el-icon-lock"></i>
                            <span>密码</span>
                        </span>
                    </span>
          <el-input
            type="password"
            v-model="userForm.pass"
            autocomplete="off"
            placeholder="Please enter your password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">&nbsp;Remember Me</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('userForm')"
            class="login-button-box button"
          >Login
          </el-button>
        </el-form-item>
      </el-form>
    </div>
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
            var validateUserName = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入用户名"));
                } else {
                    /*setTimeout(() => {
                        this.$http.get(userExists, {
                            params: {
                                userName: value
                            }
                        }).then(function (resp) {
                            if (resp.data.code == successCode) {
                            } else {
                                callback(new Error("用户名已存在"));
                            }
                        }).catch(function (err) {
                            callback(new Error("用户名是否存在服务失败"));
                        });
                    }, 1000);*/
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
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
                    pass: "",
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
                        let newPass = util.encrypt(this.userForm.pass).toString();
                        console.log("newPass:" + newPass);
                        this.$http.post(userValidate, {
                            userName: self.userForm.userName,
                            password: newPass
                        }).then(function (resp) {
                            if (resp.data.code == successCode) {
                                self.$store.commit(store_f_changeLogin, resp.data.result);
                                if (self.checked) {
                                    self.$cookies.set(rememberPass, strTrue, '1d');
                                    self.$cookies.set(userInfo, self.userForm.userName);
                                    self.$cookies.set(self.userForm.userName, newPass);
                                } else {
                                    self.$cookies.remove(rememberPass);
                                    self.$cookies.remove(userInfo);
                                    self.$cookies.remove(self.userForm.userName);
                                }
                                self.$router.push({path: "/home"});
                            } else {
                                self.$notify.error({
                                    title: '错误',
                                    message: '用户登录验证失败'
                                });
                            }
                        }).catch(function (err) {
                            self.$notify.error({
                                title: '错误',
                                message: err.message
                            });
                        });
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '输入信息有误'
                        });
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
                    if (resp.data.code == successCode) {
                        return true;
                    }
                }).catch(function (err) {

                });
                return false;
            }
        },
        created() {
            console.log("密码;" + util.encrypt("p1"));
            console.log("密码;" + util.encrypt("p1"));
            console.log("密码;" + util.encrypt("p1"));
            let rp = this.$cookies.get(rememberPass);
            if (rp === strTrue) {
                let userName = this.$cookies.get(userInfo);
                this.userForm.userName = userName;
                this.userForm.pass = this.$cookies.get(userName);
            }
        }
    };
</script>

<style scoped>
  .size {
    height: 400px;
    width: 400px;
  }

  .bg {
    background: url("../assets/img/bg.jpg") no-repeat fixed;
    /* set background tensile */
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    margin: 0;
    padding: 0;
  }

  .login-input-box {
    margin-top: 12px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    display: inline-block;
  }

  .login-input-box input {
    width: 340px;
    height: 32px;
    margin-left: 18px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    padding-left: 42px;
  }

  .login-input-box input:hover {
    border: 1px solid #ff7d0a;
  }

  .login-input-box input:after {
    border: 1px solid #ff7d0a;
  }

  .remember-box {
    width: auto;
    height: auto;
    margin-left: 18px;
    margin-top: 12px;
    font-size: 12px;
    color: #6a6765;
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
    font-size: 16px;
    width: 386px;
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
</style>
