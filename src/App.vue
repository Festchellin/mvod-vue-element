<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
    import userService from './providers/UserProvider'

    export default {
        async mounted() {
            const userToken = localStorage.getItem('userToken');
            if (userToken) {
                const response = await userService.signInWithToken(userToken);
                if (response.success) {
                    this.$store.commit('setUserToken', response.data.userToken);
                    this.$store.commit('setUser', response.data.user)
                }
            }
        }
    }
</script>
<style>
    #app {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }

    .text-align-center {
        text-align: center;
    }


    .mvod-width-95 {
        width: 95%;
    }
    .mvod-avatar{
        border-radius: 50%;
        width: 50px;
        height: 50px;
        border: lightsteelblue solid;
        display: inline-block;
    }
</style>
