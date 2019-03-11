<template>
    <el-container>
        <el-header>
            <mvod-header :user="this.$store.getters.getUser"/>
        </el-header>
        <el-row align="middle" class="mvod-content" justify="center" type="flex">
            <el-col :span="12">
                <el-card>
                    <el-switch active-color="#13ce66"
                               active-text="Sign In"
                               inactive-color="#ff4949"
                               inactive-text="Sign Up"
                               v-model="signIn">
                    </el-switch>
                    <el-row align="middle" justify="center" type="flex" v-if="signIn">
                        <el-form
                                :model="userForm"
                                :rules="rules"
                                label-position="right"
                                ref="userForm">
                            <el-col>
                                <el-form-item
                                        label="Account:"
                                        prop="account">
                                    <el-input
                                            clearable
                                            v-model="userForm.account">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col>
                                <el-form-item
                                        label="Password:"
                                        prop="password">
                                    <el-input
                                            clearable
                                            type="password"
                                            v-model="userForm.password"/>
                                </el-form-item>
                            </el-col>
                            <el-col>
                                <el-form-item
                                        label="Role:">
                                    <el-radio-group v-model="userForm.adminRole">
                                        <el-radio :label="true">Admin</el-radio>
                                        <el-radio :label="false">User</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col class="mvod-align-center">
                                <el-button @click="onSubmit('userForm','signIn')" type="primary">Sign In</el-button>
                                <el-button @click="resetForm('userForm')">Reset</el-button>
                            </el-col>
                        </el-form>
                    </el-row>
                    <el-row align="middle" justify="center" type="flex" v-else>
                        <el-form :model="userForm"
                                 :rules="rules"
                                 label-position="right"
                                 ref="userForm">
                            <el-col>
                                <el-form-item
                                        @change="validateUserExist"
                                        @keyup.native="validateUserExist"
                                        label="Account:"
                                        prop="account">
                                    <el-input
                                            v-model="userForm.account">
                                        <i slot="suffix" v-show="!hidden">
                                            <i class="el-icon-success" style="color: green;" v-if="!exist"></i>
                                            <span v-else>
                                                <i
                                                        class="el-icon-error"
                                                        style="color: red;">
                                                </i>
                                                User exist
                                            </span>
                                        </i>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col>
                                <el-form-item
                                        label="Name:"
                                        prop="name">
                                    <el-input v-model="userForm.name"/>
                                </el-form-item>
                            </el-col>
                            <el-col>
                                <el-form-item
                                        label="Password:"
                                        prop="password">
                                    <el-input
                                            @change="validatePassword"
                                            @keyup="validatePassword"
                                            type="password"
                                            v-model="userForm.password"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col>
                                <el-form-item
                                        label="Confirm Password:"
                                        prop="pass">
                                    <el-input
                                            @change="validatePassword"
                                            @keyup="validatePassword"
                                            type="password"
                                            v-model="userForm.pass"/>
                                </el-form-item>
                            </el-col>
                            <el-col class="mvod-align-center">
                                <el-button @click="onSubmit('userForm','signUp')" type="primary">Sign Up</el-button>
                                <el-button @click="resetForm('userForm')">Reset</el-button>
                            </el-col>
                        </el-form>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
    import MvodHeader from "../components/MvodHeader";
    import userService from '../providers/UserProvider';
    import md5 from 'blueimp-md5';

    export default {
        name: "MvodSignIn",
        data() {
            const validatePassword = (rule, value, callback) => {
                if (value.length < 0) {
                    callback(new Error("can not be empty"))
                } else if (this.userForm.password === this.userForm.pass) {
                    callback()
                }
            };
            return {
                userForm: {
                    account: '',
                    password: '',
                    pass: "",
                    name: "",
                    adminRole: false
                },
                validate: false,
                signIn: true,
                exist: false,
                hidden: true,
                rules: {
                    account: [{required: true, message: 'account is required'}],
                    name: [{required: true, message: 'user name is required'}],
                    password: [{required: true, message: 'password is required'}],
                    pass: [
                        {required: true, message: 'password is required'},
                        {validator: validatePassword, trigger: 'change'}
                    ]
                }
            }
        },
        methods: {
            validatePassword() {
                this.validate = this.userForm.password === this.userForm.pass
            },
            async validateUserExist() {
                this.userForm.account.length > 0 ? this.hidden = false : this.hidden = true;
                const exist = await userService.userExist(this.userForm.account);
                if (exist) this.$message.warning("the account is used, please use another account");
                this.exist = exist;
            },
            onSubmit: function (formName, type) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        let user = {...this.userForm};
                        user.password = md5(user.password);
                        let response;
                        if (type === 'signIn') {
                            response = await userService.signIn(user);
                        } else if (type === 'signUp') {
                            console.log('signUp', this.validate);
                            if (this.validate) {
                                response = await userService.signUp(user);
                            }
                        }
                        if (response.success) {
                            this.$store.commit('setUserToken', response.data.userToken);
                            this.$store.commit('setUser', response.data.user);
                            localStorage.setItem('userToken', response.data.userToken);
                            if (user.adminRole) {
                                this.$router.push("admin")
                            } else {
                                this.$router.go(-1)
                            }
                        } else {
                            this.$message.error(response.message)
                        }
                    } else {
                        console.log("Invalid")
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

        },
        components: {MvodHeader}
    }
</script>

<style scoped>

</style>
