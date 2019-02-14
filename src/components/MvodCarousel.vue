<template>
    <el-carousel :interval="3000" indicator-position="outside" type="card">
        <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
    export default {
        name: "MvodCarousel"
    }
</script>

<style scoped>

</style>
