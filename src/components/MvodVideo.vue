<template>
    <el-card shadow="hover">
        <div>
            <video
                    :height="this.adjustConfig.height"
                    :poster="video.poster"
                    :src="video.src"
                    :width="this.adjustConfig.width">
                你的浏览器不支持该标签，请使用现代浏览器
            </video>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "MvodVideo",
        props: ['config', 'video'],
        computed: {
            adjustConfig: (config) => {
                let adjustConfig = {
                    width: (config != null && config != {}) ? config.width : 60,
                    height: (config != null && config != {}) ? config.height : 60,
                };
                return adjustConfig;
            }
        }
    }
</script>

<style scoped>

</style>
