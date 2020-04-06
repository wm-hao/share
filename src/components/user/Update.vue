<template>
  <div class="both">
    <el-form :model="userForm" status-icon :rules="rules" ref="userForm" label-width="100px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="userForm.userName" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址" prop="email">
        <el-input v-model="userForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="billId">
        <el-input v-model="userForm.billId" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址信息" prop="address">
        <el-input v-model="userForm.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮政编码" prop="zip">
        <el-input v-model="userForm.zip" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userForm')">提交修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import {store_s_userId_key, successCode, userQry, userUpdate} from "../../const";
    import util from "../../util";

    export default {
        name: "Update",
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.userForm.password2 !== '') {
                        this.$refs.userForm.validateField('password2');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (this.userForm.password !== "") {
                    if (value !== this.userForm.password) {
                        callback(new Error('两次输入密码不一致!'));
                    }
                    callback();
                } else {
                    callback();
                }
            };
            return {
                userForm: {
                    id: '',
                    userName: '',
                    password: '',
                    email: '',
                    billId: '',
                    address: '',
                    zip: ''
                },
                rules: {
                    email: [
                        {required: true, message: '请输入要修改的邮箱', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']},
                    ],
                    password: [
                        {required: true, message: '请输入您的新密码', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'},
                        {min: 8, max: 100, message: '长度在 8 到 100 个字符', trigger: 'blur'}
                    ],
                    password2: [
                        {required: true, message: '请再次输入您的新密码', trigger: 'blur'},
                        {validator: validatePass2, trigger: 'blur'},
                        {min: 8, max: 100, message: '长度在 8 到 100 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let self = this;
                        let pass = this.userForm.password;
                        let changePass = false;
                        if (self.userForm.oldPass !== pass) {
                            changePass = true;
                            self.userForm.beforePassword = pass;
                            self.userForm.password = util.MD5(pass).toString();
                        }
                        self.$http.post(userUpdate, self.userForm).then(function (rsp) {
                            console.log(rsp);
                            if (rsp.data.code === successCode) {
                                self.$message({
                                    message: '恭喜您，更新用户信息成功，将在3秒后切换到登录界面',
                                    center: true
                                });
                                if (changePass) {
                                    self.$cookies.set(self.userForm.userName, self.userForm.beforePassword);
                                }
                                setTimeout(() => {
                                    self.$router.push('/login');
                                }, 3000);
                            }
                        }).catch(function (err) {
                            console.log(err);
                            self.$message.error(err.message);
                        });
                    } else {
                        this.$message.error('输入信息有误');
                        return false;
                    }
                });
            }
        }
        , created() {
            let userId = localStorage.getItem(store_s_userId_key);
            let self = this;
            this.$http.get(userQry, {
                params: {
                    id: userId
                }
            }).then(function (rsp) {
                if (rsp.data.code === successCode) {
                    self.userForm = JSON.parse(rsp.data.message);
                    self.userForm.oldPass = self.userForm.password;
                } else {
                    self.$message({
                        message: rsp.data.message,
                        center: true,
                        type: 'error'
                    });
                }
            }).catch(function (err) {
                self.$message.error(err.message);
            })
        }
    }
</script>

<style scoped>

</style>
