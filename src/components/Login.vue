<template>
    <div class="bg">
        <el-form :model="userForm" status-icon :rules="rules" ref="userForm" label-width="100px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="userForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
            </el-form-item>
            <div class="login-button-box">
                <button>Login</button>
            </div>
            <div class="logon-box">
                <router-link to="/forgetPass">忘记密码?</router-link>
                <router-link to="/forgetPass">注册用户</router-link>
            </div>
        </el-form>

        <el-form :model="userForm" status-icon :rules="rules" ref="userForm" label-width="100px">
            <div class="login-input-box">
                <span class="icon icon-user"></span>
                <input type="text" placeholder="Please enter your email/phone" />
            </div>
            <div class="login-input-box">
                <span class="icon icon-password"></span>
                <input type="password" placeholder="Please enter your password" />
            </div>
        </el-form>
        <div class="remember-box">
            <label>
                <input type="checkbox" />&nbsp;Remember Me
            </label>
        </div>
        <div class="login-button-box">
            <button>Login</button>
        </div>
        <div class="logon-box">
            <a href>Forgot?</a>
            <a href>Register</a>
        </div>
    </div>
</template>



<script>
export default {
    data() {
        var validateUserName = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入用户名"));
            } else {
                if (this.userForm.userName !== "") {
                    this.$refs.userForm.validateField("userName");
                }
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
            userForm: {
                userName: "",
                pass: "",
                checkPass: "",
                age: ""
            },
            rules: {
                userName: [{ validator: validateUserName, trigger: "blur" }],
                pass: [{ validator: validatePass, trigger: "blur" }],
                checkPass: [{ validator: validatePass2, trigger: "blur" }],
                age: [{ validator: checkAge, trigger: "blur" }]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert("submit!");
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
    background: url(../assets/images/bg_login.jpg) no-repeat fixed;
    /* set background tensile */
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    margin: 0;
    padding: 0;
}
#content {
    background-color: rgba(255, 255, 255, 0.95);
    width: 420px;
    height: 300px;
    border: 1px solid #000000;
    border-radius: 6px;
    padding: 10px;
    margin-top: 15%;
    margin-left: auto;
    margin-right: auto;
    display: block;
}

.login-header {
    width: 100%;
    height: 48px;
    margin-bottom: 20px;
    border-bottom: 1px solid #dcdcdc;
}

.login-header img {
    width: 120px;
    margin-left: auto;
    margin-right: auto;
    display: block;
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

.login-input-box .icon {
    width: 24px;
    height: 24px;
    margin: 6px 4px 6px 24px;
    background-color: #ff7d0a;
    display: inline-block;
    position: absolute;
    border-right: 1px solid #dcdcdc;
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

.logon-box {
    margin-top: 20px;
    text-align: center;
}

.logon-box a {
    margin: 30px;
    color: #4a4744;
    font-size: 13px;
    text-decoration: none;
}

.logon-box a:hover {
    color: #ff7d0a;
}

.logon-box a:active {
    color: #ee7204;
}
</style>