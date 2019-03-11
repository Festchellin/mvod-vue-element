<template>
    <el-carousel :interval="3000" indicator-position="outside" type="card">
        <el-carousel-item :key="item" v-for="item in 4">
            <h3>{{ item }}</h3>
            <mvod-video :video="{src:'https://youtu.be/ZfQR2r6rqyE',poster: 'aaaaa.jpg'}"></mvod-video>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
    import MvodVideo from "./MvodVideo";

    export default {
        name: "MvodCarousel",
        components: {MvodVideo}
    }
</script>

<style scoped>

</style>
