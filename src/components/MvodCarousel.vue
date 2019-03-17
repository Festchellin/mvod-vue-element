<template>
    <el-carousel indicator-position="outside" type="card" trigger="click" :autoplay="false">
        <el-carousel-item :key="index" v-for="(video,index) in videos">
            <mvod-video :video="video"></mvod-video>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
    import MvodVideo from "./MvodVideo";
    import commonProvider from "../providers/CommonProvider";

    export default {
        name: "MvodCarousel",
        components: {MvodVideo},
        data() {
            return {
                videos: []
            }
        },
        methods: {
            async getData() {
                const response = await commonProvider.getListByCondition({}, 0, 4, "/video");
                if (response.success) {
                    this.videos = response.data.list;
                }
            }
        },
        async mounted() {
            await this.getData()
        }
    }
</script>

<style scoped>

</style>
