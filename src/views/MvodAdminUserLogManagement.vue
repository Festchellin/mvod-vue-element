<template>
    <div>
        <el-table
                :data="data"
                border
                stripe
        >
            <el-table-column
                    :formatter="formatterUser"
                    label="User"
                    prop="user"/>
            <el-table-column
                    label="Token"
                    prop="userToken"
            />
            <el-table-column
                    :formatter="formatterTime"
                    label="Login Time"
                    prop="loginTime"/>
            <el-table-column
                    label="Operation">
                <template slot-scope="props">
                    <el-form :model="props.row" class="mvod-align-center" label-position="left" ref="'props">
                        <el-form-item>
                            <el-button @click="deleteRow(props.row)" type="danger">Delete</el-button>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                :current-page.sync="currentPage"
                :page-count="pageCount"
                :page-size.sync="pageSize"
                :total="total"
                @current-change="currentChange"
                @next-click="next"
                @prev-click="prev"
                class="mvod-align-center"
                layout="prev, pager, next">
        </el-pagination>
    </div>
</template>

<script>
    import commonService from '../providers/CommonProvider'

    export default {
        name: "MvodAdminUserLogManagement",
        data() {
            return {
                data: [],
                logs: [],
                pageSize: 5,
                currentPage: 1,
                pageCount: 5,
                total: 0
            }
        },
        methods: {
            formatterUser(row) {
                return row.user ? (row.user.name || row.user.account) : "no such user";
            },
            formatterTime(row) {
                const time = Date(row.loginTime);
                return time;
            },
            deleteRow(row) {
                this.$confirm(`Delete current row ?`, 'Waring', {
                    type: 'waring',
                    cancelButtonText: 'Cancel',
                    confirmButtonText: 'Delete'
                }).then(() => {
                    commonService.deleteById(row.id, "/api/userlog/").then(async response => {
                        if (!response.success)
                            this.$message.error(response.message);
                        else {
                            this.$message.success(response.message);
                            await this.getData()
                        }
                    })
                })
            },
            prev() {
                const logs = this.logs.slice(0);
                this.currentPage = this.currentPage - 1 >= 0 ? this.currentPage - 1 : 0;
                const begin = (this.currentPage - 1) * this.pageSize;
                const end = this.currentPage * this.pageSize;
                this.data = logs.slice(begin, end)
            },
            next() {
                const logs = this.logs.slice(0);
                this.currentPage = this.currentPage + 1 <= this.total ? this.currentPage + 1 : this.total;
                const begin = (this.currentPage - 1) * this.pageSize;
                const end = this.currentPage * this.pageSize;
                this.data = logs.slice(begin, end)
            },
            currentChange(current) {
                const logs = this.logs.slice(0);
                const begin = (current - 1) * this.pageSize;
                const end = current * this.pageSize;
                this.data = logs.slice(begin, end)
            },
            async getData() {
                const response = await commonService.getListByCondition({}, 0, 10000, "/api/userlog");
                if (response.success) {
                    this.logs = response.data.logs.slice(0);
                    const logs = this.logs.slice(0);
                    this.data = logs.slice(0, this.pageSize);
                    this.total = this.logs.length;
                }
            }
        },
        async mounted() {
            await this.getData();
        }
    }
</script>

<style scoped>

</style>
