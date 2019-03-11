<template>
    <el-container>
        <el-header>
            <mvod-header :user="this.$store.getters.getUser"/>
        </el-header>
        <el-row align="center" class="mvod-content" justify="center" type="flex">
            <el-col :span="6">
                <el-card>
                    <el-row align="middle" justify="center" type="flex">
                        <el-col>
                            <mvod-menu :sub-menus="subMenus"></mvod-menu>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="17" style="margin-left: 1%">
                <el-card>
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
                subMenus: []
            }
        },
        async mounted() {
            if (!localStorage.getItem("categoryMenu")) {
                await this.$store.dispatch("setMenuAsync");
                const categoryMenu = this.$store.getters.getCategoryMenu;
                this.subMenus.push(categoryMenu);
                localStorage.setItem("categoryMenu", JSON.stringify(categoryMenu))
            } else {
                const categoryMenu = JSON.parse(localStorage.getItem('categoryMenu'));
                this.subMenus.push(categoryMenu);
            }
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

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
