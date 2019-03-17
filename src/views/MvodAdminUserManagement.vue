<template>
    <div>
        <el-form class="mvod-align-center" inline>
            <el-form-item>
                <el-select placeholder="Please select" v-model="conditionName">
                    <el-option value="name">By Name</el-option>
                    <el-option value="account">By Account</el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input
                        @keyup.prevent.enter="search"
                        v-model="conditionValue"/>
            </el-form-item>
            <el-button @click="search">Search</el-button>
        </el-form>
        <el-form :model="userForm" :rules="rules" inline ref="userForm">
            <el-form-item
                    label="Name"
                    prop="name">
                <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item
                    label="Account"
                    prop="account">
                <el-input v-model="userForm.account"></el-input>
            </el-form-item>
            <el-form-item
                    label="Password"
                    prop="password">
                <el-input type="password" v-model="userForm.password"></el-input>
            </el-form-item>
            <el-form-item
                    label="Admin Role">
                <el-radio-group v-model="userForm.adminRole">
                    <el-radio :label="true">Admin</el-radio>
                    <el-radio :label="false">User</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-button @click="save('userForm')" type="primary">Add</el-button>
        </el-form>
        <el-table
                :data="data"
                border
                stripe
        >
            <el-table-column
                    type="expand"
            >
                <template slot-scope="props">
                    <el-form :model="props.row" class="mvod-align-center" label-position="left" ref="'props">
                        <el-form-item
                                label="Name:"
                                prop="name">
                            <el-input v-model="props.row.name"></el-input>
                        </el-form-item>
                        <el-form-item
                                label="Account:"
                                prop="account">
                            <el-input @change="validateUserExist(props.row.account)"
                                      @keyup.prevent="validateUserExist(props.row.account)"
                                      v-model="props.row.account"></el-input>
                        </el-form-item>
                        <el-form-item
                                label="Admin Role:"
                                prop="adminRole">
                            <el-radio-group v-model="props.row.adminRole">
                                <el-radio :label="true" border/>
                                <el-radio :label="false" border/>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="update(props.row)" type="primary">Save</el-button>
                            <el-button @click="deleteUser(props.row)" type="danger">Delete</el-button>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="Name"
                    prop="name"
            />
            <el-table-column
                    label="Account"
                    prop="account"/>
            <el-table-column
                    :formatter="formatAdminRole"
                    label="Admin Role"
                    prop="adminRole"
            />
        </el-table>

        <el-pagination
                :current-page.sync="currentPage"
                :page-count="total"
                :page-size.sync="pageSize"
                :total="this.userList.length"
                @current-change="currentChange"
                @next-click="next"
                @prev-click="prev"
                class="mvod-align-center"
                layout="prev, pager, next">
        </el-pagination>
    </div>
</template>

<script>
    import commonProvider from '../providers/CommonProvider'
    import userProvider from "../providers/UserProvider";
    import md5 from 'blueimp-md5'

    export default {
        name: "MvodAdminUserManagement",
        data() {
            return {
                data: [],
                pageSize: 2,
                currentPage: 1,
                pageCount: 5,
                total: 0,
                userList: [],
                conditionName: 'name',
                conditionValue: '',
                userForm: {
                    name: '',
                    account: '',
                    password: '',
                    adminRole: false
                },
                rules: {
                    account: [{required: true, message: 'account is required'}],
                    name: [{required: true, message: 'user name is required'}],
                    password: [{required: true, message: 'password is required'}],
                }
            }
        },
        methods: {
            formatAdminRole(row) {
                return row.adminRole ? "Admin" : "User"
            },
            async search() {
                if (this.conditionValue !== "") {
                    const condition = {
                        conditionName: this.conditionName,
                        conditionValue: this.conditionValue
                    };
                    const response = await userProvider.getUserListByCondition(condition, 0, 10000);
                    if (response.success) {
                        this.userList = response.data.userList.slice(0);
                        const userList = this.userList.slice(0);
                        this.data = userList.slice(0, this.pageSize);
                        this.total = (this.userList.length / this.pageSize);
                    } else {
                        this.$message.error(response.message);
                        this.data = [];
                        this.total = 0;
                    }
                } else {
                    this.$message.warning("Please enter some keywords to search")
                }
            },
            async update(user) {
                const response = await userProvider.updateUser(user);
                if (!response.success)
                    this.$message.error(response.message);
                else this.$message.success(response.message)
            },
            async deleteUser(user) {
                this.$confirm(`Delete current row ?`, 'Waring', {
                    type: 'waring',
                    cancelButtonText: 'Cancel',
                    confirmButtonText: 'Delete'
                }).then(() => {
                    userProvider.deleteUserById(user.id).then(response => {
                        if (!response.success)
                            this.$message.error(response.message);
                        else {
                            this.$message.success(response.message)
                        }
                    })
                })
            },
            async validateUserExist(account) {
                if (!account) {
                    const exist = await userProvider.userExist(account);
                    if (exist) this.$message.warning("the account is used, please use another account");
                }
            },
            prev() {
                let userList = this.userList.slice(0);
                this.currentPage = this.currentPage - 1 >= 0 ? this.currentPage - 1 : 0;
                const begin = (this.currentPage - 1) * this.pageSize;
                const end = this.currentPage * this.pageSize;
                this.data = userList.slice(begin, end)

            },
            next() {
                let userList = this.userList.slice(0);
                this.currentPage = this.currentPage + 1 <= this.total ? this.currentPage + 1 : this.total;
                const begin = (this.currentPage - 1) * this.pageSize;
                const end = this.currentPage * this.pageSize;

                this.data = userList.slice(begin, end)
            },
            currentChange(current) {
                let userList = this.userList.slice(0);
                const begin = (current - 1) * this.pageSize;
                const end = current * this.pageSize;
                this.data = userList.slice(begin, end)
            },
            save(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const user = {...this.userForm};
                        user.password = md5(user.password);
                        const response = await userProvider.saveUser(user);
                        if (!response.success) {
                            this.$message.error(response.message)
                        } else {
                            const response = await commonProvider.getListByCondition({}, 0, 10000, "/user");
                            if (response.success) {
                                this.userList = response.data.userList.slice(0);
                                const userList = this.userList.slice(0);
                                this.data = userList.slice(0, this.pageSize);
                                this.total = this.userList.length;
                                this.$refs[formName].resetFields();
                            }
                        }
                    }
                });
            }
        },
        async mounted() {
            const response = await commonProvider.getListByCondition({}, 0, 10000, "/user");

            if (response.success) {
                this.userList = response.data.userList.slice(0);
                const userList = this.userList.slice(0);
                this.data = userList.slice(0, this.pageSize);
                this.total = this.userList.length;
            }
        }
    }
</script>

<style scoped>

</style>
