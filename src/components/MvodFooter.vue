<template>
    <el-row type="flex" justify="center" align="middle" class="mvod-bottom-1 mvod-width-95">
        <el-col :span="12">
            <p class="copyright text-align-center ">Copyright &copy; Mvod {{new Date().getFullYear()}}</p>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "MvodFooter"
    }
</script>

<style scoped>
    .copyright {
        color: #909399;
    }

    .mvod-bottom-1 {
        position: absolute;
        bottom: 1rem;
    }
</style>
