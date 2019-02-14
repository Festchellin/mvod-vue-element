<template>
    <el-container>
        <el-header>
            <mvod-header/>
        </el-header>
        <el-row type="flex" justify="center" align="center" class="mvod-content">
            <el-col :span="6">
                <el-card>
                    <el-row justify="center" align="middle" type="flex">
                        <el-col>
                            <mvod-menu :sub-menus="subMenus"></mvod-menu>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="17" style="margin-left: 1%">
                <el-card>
                    <el-row justify="center" align="middle" type="flex">
                        <el-col>
                            <el-row justify="center" align="middle" type="flex">
                                <el-col>
                                    <mvod-carousel></mvod-carousel>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-card>
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
    import MvodMenu from "../components/MvodMenu";
    import MvodCarousel from "../components/MvodCarousel";

    export default {
        name: 'home',
        components: {
            MvodCarousel,
            MvodMenu,
            MvodFooter,
            MvodHeader
        },
        data() {
            return {
                subMenus: [{id: 1, title: 'AAAAAAAAA', items: [{name: 'aaa'}, {name: 'bbb'}, {name: 'ccc'}]}]
            }
        },
        mounted() {
            this.$store.commit('setUser',{id:1,name:'aaaa'});
            this.$store.commit('setUserToken','asdasdadadas');
            this.$store.commit('clearSignInInformation');
        }
    }
</script>
<style>
    .mvod-content {
        margin-top: 4%;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
