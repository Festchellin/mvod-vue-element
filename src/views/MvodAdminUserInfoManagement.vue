<template>
    <div>
        <el-table
                :data="data"
                border
                stripe>
            <el-table-column
                    :formatter="formatter"
                    label="User"
                    prop="user"
            />
            <el-table-column
                    label="Email"
                    prop="email"
            />
            <el-table-column
                    label="Phone"
                    prop="phoneNumber"/>
            <el-table-column
                    :formatter="formatterTime"
                    label="Last Modify Time"
                    prop="lastModifyTime"/>
            <el-table-column
                    :formatter="formatterDate"
                    label="Register Time"
                    prop="registerDate"/>
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
    import commonProvider from "../providers/CommonProvider";

    export default {
        name: "MvodAdminUserInfoManagement",
        data() {
            return {
                data: [],
                userInfoList: [],
                pageCount: 5,
                currentPage: 1,
                pageSize: 5
            }
        },
        computed: {
            total() {
                return this.userInfoList.length;
            }
        },
        methods: {
            formatterTime(row) {
                return Date(row.lastModifyTime)
            },
            formatterDate(row) {
                return Date(row.registerDate)
            },
            formatter(row) {
                return row.user.name || row.user.account;
            },
            async getData() {
                const response = await commonProvider.getListByCondition({}, 0, 10000, '/userInfo');
                if (response.success) {
                    this.userInfoList = response.data.list;
                }
            },
            prev() {
                let userInfoList = this.userInfoList.slice(0);
                this.currentPage = this.currentPage - 1 >= 0 ? this.currentPage - 1 : 0;
                const begin = (this.currentPage - 1) * this.pageSize;
                const end = this.currentPage * this.pageSize;
                this.data = userInfoList.slice(begin, end)
            },
            next() {
                let userInfoList = this.userInfoList.slice(0);
                this.currentPage = this.currentPage + 1 <= this.total ? this.currentPage + 1 : this.total;
                const begin = (this.currentPage - 1) * this.pageSize;
                const end = this.currentPage * this.pageSize;
                this.data = userInfoList.slice(begin, end)
            },
            currentChange(current) {
                let userInfoList = this.userInfoList.slice(0);
                const begin = (current - 1) * this.pageSize;
                const end = current * this.pageSize;
                this.data = userInfoList.slice(begin, end)
            }
        },
        async mounted() {
            await this.getData();
            this.data = this.userInfoList.slice(0, this.pageSize)
        }
    }
</script>

<style scoped>

</style>
