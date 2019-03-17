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
                const response = await userService.signInWithToken(userToken).catch(e =>{
                    console.log(e);
                })

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
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: -webkit-fill-available;;
    }
    html{
        background-color: #C0C4CC;
    }
    .text-align-center {
        text-align: center;
    }


    .mvod-width-95 {
        width: 95%;
    }

    .mvod-avatar {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        border: lightsteelblue solid;
        display: inline-block;
    }

    .mvod-content{
        flex: 1 0 auto;
    }
    .mvod-video-simple {
        margin-top: 2rem;
    }
    .mvod-margin-left-3{
        margin-left: 3rem;
    }
    .mvod-margin-top-1{
        margin-top: 1rem;
    }
    .video-name{
        color: #606266;
    }
    .video-description{
        color: #909399;
    }
    .mvod-hidden{
        visibility: hidden;
    }
    header{
        flex: 0 0 auto;
    }
    footer{
        /* 和 header 一样，footer 也采用固定高度*/
        /* 0 flex-grow, 0 flex-shrink, auto flex-basis */
        flex: 0 0 auto;
    }
</style>
