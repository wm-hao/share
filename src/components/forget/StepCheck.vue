<template>
  <div class="both">
    <el-form :model="userForm" status-icon :rules="rules" ref="userForm" label-width="100px">
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="userForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="userForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import {store_f_changeStep, successCode, userInfo, userUpdatePass} from "../../const";
    import util from "../../util";

    export default {
        name: "StepCheck",
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.userForm.checkPass !== '') {
                        this.$refs.userForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.userForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                userForm: {
                    pass: '',
                    checkPass: '',
                    userName: ''
                },
                rules: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'},
                        {min: 4, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let self = this;
                        let curUser = localStorage.getItem(userInfo);
                        let pass = util.MD5(self.userForm.pass).toString();
                        self.$http.post(userUpdatePass, {
                            userName: curUser,
                            password: pass
                        }).then(function (rsp) {
                            if (rsp.data.code === successCode) {
                                self.$message({
                                    message: '恭喜您，更新密码成功，将在3秒后切换到登录界面',
                                    center: true
                                });
                                self.resetForm(formName);
                                self.$store.commit(store_f_changeStep, null);
                                let userName = self.$cookies.get(userInfo);
                                if (userName === curUser) {
                                    self.$cookies.set(userName, pass);
                                }
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
            }
        }
    }
</script>

<style scoped>

</style>
