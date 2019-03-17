<template>
    <el-card class="mvod-video-simple">
        <el-row :gutter="20">
            <el-col :span="8" class="mvod-align-center">
                <video
                        :ref="video"
                        controls
                        @mouseover="playVideo(video)"
                        @mouseleave="pauseVideo(video)"
                        :src="video.url"
                        muted
                        width="100%"
                >
                    You browser do not support video tag
                </video>
            </el-col>
            <el-col :span="16">
                <h2 class="video-name" @click="navigateToVideo(video)">
                        {{video.name}}
                </h2>
                <p class="video-description">{{video.description.substr(0,100)+'...'}}</p>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    export default {
        name: "MvodVideoSimple",
        props: ['video'],

        methods:{
            playVideo(video) {
                this.$refs[video].play();
            },
            pauseVideo(video){
                this.$refs[video].pause();
            },
            navigateToVideo(video){
                this.$router.push({path:"video",query:{video_id:video.id}})
            }
        }
    }
</script>

<style scoped>

</style>
