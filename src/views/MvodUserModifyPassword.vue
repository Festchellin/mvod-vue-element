<template>
    <el-form inline>
        <el-form-item
                label="Modify Password">
            <el-input v-model="password" type="password"/>
        </el-form-item>
        <el-form-item>
            <el-button @click="submit" type="warning">Change</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import md5 from 'blueimp-md5'
    import userProvider from "../providers/UserProvider";
    export default {
        name: "MvodUserModifyPassword",
        data() {
            return {
                password: ""
            }
        },
        methods: {
            async submit() {
                const user = {...this.$store.getters.getUser}
                user.password = md5(this.password)
                const response = await userProvider.updateUser(user);
                this.$message({
                    type: response.success ? "success" : "error",
                    message: response.message
                })
            }
        }
    }
</script>

<style scoped>

</style>
