<template>
    <el-card>
        <el-row justify="center" type="flex">
            <el-col :span="16">
                <el-row align="middle" justify="center" type="flex">
                    <el-col :span="6">
                        <h1 @click="navigateToHome" class="logo">Mvod</h1>
                    </el-col>
                    <el-col :offset="16" v-if="!user">
                        <el-menu
                                :router="true"
                                active-text-color="#303133"
                                mode="horizontal">
                            <el-menu-item index="login">Login</el-menu-item>
                            <el-menu-item index="about">About</el-menu-item>
                        </el-menu>
                    </el-col>
                    <el-col :offset="16" v-else>
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
    export default {
        name: "MvodHeaderWithoutSearchBar",
        props: ['user'],
        methods: {
            signOut() {
                this.$store.commit('clearSignInInformation');
                localStorage.clear();
                this.$router.replace("/");
            },
            navigateToUserCenter() {
                if (this.user.adminRole) this.$router.push('admin');
                else this.$router.push('user')
            },
            navigateToHome() {
                this.$router.push("/")
            }
        }
    }
</script>

<style scoped>
    .logo {
        color: #5cadff;
    }
</style>
