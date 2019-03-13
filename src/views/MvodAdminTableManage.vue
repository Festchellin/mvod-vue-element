<template>
    <div>
        <el-form inline class="mvod-align-center" ref="menu" :model="menu" :rules="rules">
            <el-form-item
                    prop="tbName"
                    label="Table Name">
                <el-input v-model="menu.tbName"/>
            </el-form-item>
            <el-form-item
                    prop="tbComment"
                    label="Table Comment">
                <el-input v-model="menu.tbComment"/>
            </el-form-item>
            <el-form-item
                    prop="navigateLink"
                    label="Navigate Link">
                <el-input v-model="menu.navigateLink"/>
            </el-form-item>
            <el-form-item
                    label="For User or Admin">
                <el-radio-group v-model="menu.type">
                    <el-radio :label="1">User</el-radio>
                    <el-radio :label="2">Admin</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-button type="primary" @click="add('menu')">Add</el-button>
        </el-form>
        <el-table
                :data="this.$store.getters.getAllMenu"
                border
                stripe>
            <el-table-column
                    type="expand"
            >
                <template slot-scope="props">
                    <el-form class="mvod-align-center" label-position="left">
                        <el-form-item
                                label="Table Name:">
                            <el-input v-model="props.row.tbName"></el-input>
                        </el-form-item>
                        <el-form-item
                                label="Table Comment:">
                            <el-input v-model="props.row.tbComment"></el-input>
                        </el-form-item>
                        <el-form-item
                                label="Navigate Link">
                            <el-input v-model="props.row.navigateLink"></el-input>
                        </el-form-item>
                        <el-form-item
                        label="For User or Admin">
                            <el-radio-group v-model="props.row.type">
                                <el-radio :label="1">User</el-radio>
                                <el-radio :label="2">Admin</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="save(props.row)" type="primary">Save</el-button>
                            <el-button @click="deleteRow(props.row)" type="danger">Delete</el-button>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>

            <el-table-column
                    label="Table Name"
                    prop="tbName"
            />
            <el-table-column
                    label="Table Comment"
                    prop="tbComment"
            />
            <el-table-column
                    label="Front end navigate link or url"
                    prop="navigateLink"
            />
            <el-table-column
                    :formatter="formatterType"
                    label="Menu For User or Admin"
                    prop="type"/>
        </el-table>
    </div>
</template>

<script>
    import commonService from '../providers/CommonProvider'

    export default {
        name: "MvodAdminTableManage",
        data() {
            return {
                menu: {
                    tbName: '',
                    tbComment: '',
                    navigateLink: '',
                    type: 1
                },
                rules: {
                    tbName: [{required: true, message: 'table name is required'}],
                    tbComment: [{required: true, message: 'table comment is required'}],
                    navigateLink: [{required: true, message: 'navigate link is required'}]
                }
            }
        },

        methods: {
            async save(row) {
                console.log(row);
                const response = await commonService.update(row, '/api/table/');
                if (!response.success) {
                    this.$message.error(response.message)
                }
            },
            add(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        const menu = {...this.menu}
                        const response = await commonService.save(menu, '/api/table');
                        this.$message({
                            showClose: true,
                            type: response.success ? 'success' : 'error',
                            message: response.message
                        })
                        await this.$store.dispatch("setMenuAsync")
                    }
                })
            },
            deleteRow(row) {
                this.$confirm(`Delete current row ?`, 'Waring', {
                    type: 'waring',
                    cancelButtonText: 'Cancel',
                    confirmButtonText: 'Delete'
                }).then(() => {
                    console.log("confirm" + row.id);
                    commonService.deleteById(row.id, '/api/table/').then(async response => {
                        if (!response.success) {
                            this.$message.error(response.message)
                        } else {
                            await this.$store.dispatch("setMenuAsync")
                        }
                    })

                })
            },
            formatterType(row) {
                return row.type === 1 ? "User" : "Admin"
            }
        },

    }
</script>

<style scoped>

</style>
