<template>
    <el-card>
        <el-row type="flex" justify="center">
            <el-col :span="16">
                <el-row type="flex" justify="center" align="middle">
                    <el-col :span="6">
                        <h1 class="logo">Mvod</h1>
                    </el-col>
                    <el-col :span="8">
                        <el-input
                                placeholder="search video"
                                clearable/>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-menu
                                active-text-color="#303133"
                                mode="horizontal"
                                :router="true">
                            <el-menu-item index="login">Login</el-menu-item>
                            <el-menu-item index="about">About</el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    export default {
        name: "MvodHeader"
    }
</script>

<style scoped>
    .logo {
        color: #5cadff;
    }
</style>
