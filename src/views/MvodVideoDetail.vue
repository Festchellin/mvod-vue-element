<template>
    <el-container>
        <el-header>
            <mvod-header :user="this.$store.getters.getUser"/>
        </el-header>
        <el-row align="center" class="mvod-content" justify="center" type="flex">
            <el-col :span="17" style="margin-left: 1%">
                <div v-if="!error">
                    <el-card class="mvod-margin-top-1">
                        <video
                                :poster="video.poster"
                                :src="video.url"
                                :width="'100%'"
                                autoplay
                                controls
                                loop
                        >
                            Your browser do not support video tag
                        </video>
                    </el-card>
                    <el-card class="mvod-margin-top-1">
                        {{video.description}}
                    </el-card>
                </div>
                <p v-else>
                    <el-alert
                            title="We can not find such video"
                            type="success"
                            :closable="false">
                    </el-alert>
                </p>
            </el-col>
        </el-row>
        <el-footer>
            <mvod-footer/>
        </el-footer>
    </el-container>
</template>

<script>
    import MvodHeader from "../components/MvodHeader";
    import MvodFooter from "../components/MvodFooter";
    import commonProvider from "../providers/CommonProvider";

    export default {
        name: "MvodVideoDetail",
        components: {MvodFooter, MvodHeader},
        data() {
            return {
                video: {

                },
                error:false
            }
        },
        async mounted() {
            const videoId = this.$route.query.video_id;
            console.log(videoId)
            const response = await commonProvider.getById(videoId, "/video/").catch(() => this.error = true)
            if (response.success) {
                this.video = response.data.video;
            }else {
                this.error = true;
            }
        }
    }
</script>

<style scoped>

</style>
