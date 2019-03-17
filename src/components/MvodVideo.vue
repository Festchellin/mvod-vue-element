<template>
    <div style="position: relative">
        <div class="des">
            <h3 >{{video.name}}</h3>
        </div>
        <div>
            <video
                    @click="navigateToVideo(video)"
                    :ref="video"
                    @mouseover="playVideo(video)"
                    @mouseleave="pauseVideo(video)"
                    :poster="video.poster"
                    :src="video.url"
                    width="80%">
                你的浏览器不支持该标签，请使用现代浏览器
            </video>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MvodVideo",
        props: ['video'],

        methods: {
            playVideo(video) {
                this.$refs[video].play();
            },
            pauseVideo(video) {
                this.$refs[video].pause()
            },
            navigateToVideo(video){
                console.log(video)
                this.$router.push({path:"video",query:{video_id:video.id}})
            }
        }
    }
</script>

<style scoped>
    .des {
        position: absolute;
        color: white;
        bottom: 1rem;
    }

    .des:hover {
        visibility: hidden;
    }
</style>
