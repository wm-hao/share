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
    import {mapState} from 'vuex'
    import {store_f_changeLogin} from "../const";

    export default {
        data() {
            var validateUserName = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入用户名"));
                } else {
                    callback();
                }
            };
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error("年龄不能为空"));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error("请输入数字值"));
                    } else {
                        if (value < 18) {
                            callback(new Error("必须年满18岁"));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入密码"));
                } else {
                    if (this.userForm.checkPass !== "") {
                        this.$refs.userForm.validateField("checkPass");
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入密码"));
                } else if (value !== this.userForm.pass) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };
            return {
                checked: false,
                userForm: {
                    userName: "",
                    pass: "",
                    checkPass: "",
                    age: ""
                },
                rules: {
                    userName: [{validator: validateUserName, trigger: "blur"}],
                    pass: [{validator: validatePass, trigger: "blur"}],
                    checkPass: [{validator: validatePass2, trigger: "blur"}],
                    age: [{validator: checkAge, trigger: "blur"}]
                }
            };
        },
        computed: mapState({
            msg: state => state.token,
        }),
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        console.log("提交");
                        this.$store.commit(store_f_changeLogin, 'my1026token');
                        this.$router.push({path: "/home"});
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
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
