<template>
    <el-container>
        <el-header>
            <mvod-header :user="this.$store.getters.getUser"/>
        </el-header>
        <el-row align="center" class="mvod-content" justify="center" type="flex">
            <el-col :span="17" style="margin-left: 1%">
                <el-card v-if="this.$store.getters.getShowHomeCarousel">
                    <el-row align="middle" justify="center" type="flex">
                        <el-col>
                            <el-row align="middle" justify="center" type="flex">
                                <el-col>
                                    <mvod-carousel></mvod-carousel>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-card>

                <div v-if="this.$store.getters.getVideos.length > 0">
                    <mvod-video-simple  :video="video" v-bind:key="index" v-for="(video,index) in this.$store.getters.getVideos"/>
                </div>
                <div v-else class="mvod-align-center">
                    <el-card>
                        no results found.
                    </el-card>
                </div>
            </el-col>
        </el-row>
        <el-footer>
            <mvod-footer/>
        </el-footer>
    </el-container>
</template>

<script>
    // @ is an alias to /src
    import MvodHeader from '../components/MvodHeader';
    import MvodFooter from '../components/MvodFooter';
    import MvodCarousel from "../components/MvodCarousel";
    import MvodVideoSimple from "../components/MvodVideoSimple";


    export default {
        name: 'home',
        components: {
            MvodVideoSimple,
            MvodCarousel,
            MvodFooter,
            MvodHeader
        },
        data() {
            return {
                subMenus: [],
                videos: []
            }
        },
        methods: {
            async getData(condition,page,pageSize) {
              await this.$store.dispatch("setVideosAsync",{condition,page,pageSize})
            }
        },
        async mounted() {
            const query = this.$store.getters.getQuery;
            console.log(query)
            let condition = {}
            if (query !== "") {
                condition = {
                    conditionName: "name",
                    conditionValue: query
                }
            }
            await this.getData(condition,0,10);
        }
    }
</script>
<style>
    .mvod-content {
        margin-top: 4%;
    }

    .mvod-align-center {
        text-align: center;
    }
</style>
