<template>
    <el-card>
        <el-row justify="center" type="flex">
            <el-col :span="16">
                <el-row align="middle" justify="center" type="flex">
                    <el-col :span="6">
                        <h1 @click="navigateToHome" class="logo">Mvod</h1>
                    </el-col>
                    <el-col :span="8">
                        <el-input
                                @keyup.enter.native="searchVideo"
                                clearable
                                placeholder="search video"
                                v-model="query"
                        />
                    </el-col>
                    <el-col :offset="1" :span="7" v-if="!user">
                        <el-menu
                                :router="true"
                                active-text-color="#303133"
                                mode="horizontal">
                            <el-menu-item index="login">Login</el-menu-item>
                        </el-menu>
                    </el-col>
                    <el-col :offset="1" :span="7" v-else>
                        <el-button @click="navigateToUserCenter" type="text">
                            {{user.name || user.account}}
                        </el-button>
                        <el-button @click="signOut">Sign out</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>

    import commomProvider from "../providers/CommonProvider";

    export default {
        name: "MvodHeader",
        props: ['user'],
        data(){
          return{
              query:""
          }
        },
        computed: {
            video() {
                return this.query || this.$store.getters.getQuery
            }
        },
        methods: {
            signOut() {
                this.$store.commit('clearSignInInformation');
                localStorage.clear();
                this.$router.replace("/")
            },
            navigateToUserCenter() {
                if (this.user.adminRole) this.$router.push('admin');
                else this.$router.push('user')
            },
            navigateToHome() {
                this.$router.push("/")
            },
            async searchVideo() {
                if (this.video !== '') {
                    const response = await commomProvider.getListByCondition({
                        conditionName: "name",
                        conditionValue: this.video
                    }, 0, 10, "/api/video");
                    if (response.success) {
                        const list = response.data.list;
                        this.$store.commit("setQuery", this.video);
                        this.$store.commit("setVideos", list);
                        this.$store.commit("setShowHomeCarousel", false)
                        this.$router.push("/");
                    }
                } else {
                    await this.$store.dispatch("setVideosAsync", {page: 0, pageSize: 10})
                    this.$store.commit("setShowHomeCarousel", true)
                }
            }
        }
    }
</script>

<style scoped>
    .logo {
        color: #5cadff;
    }
</style>
