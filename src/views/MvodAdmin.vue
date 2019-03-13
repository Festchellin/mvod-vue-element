<template>
    <el-container>
        <el-header>
            <mvod-header-without-search-bar :user="this.$store.getters.getUser"/>
        </el-header>
        <el-row class="mvod-content" type="flex">
            <el-col :span="6">
                <el-card>
                    <el-row align="middle" justify="center" type="flex">
                        <el-col>
                            <mvod-manage-menu :menu="this.$store.getters.getAdminMenu"/>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="17" style="margin-left: 1%">
                <el-card>
                    <el-row align="middle" justify="center" type="flex">
                        <el-col>
                            <router-view/>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
    import MvodHeaderWithoutSearchBar from "../components/MvodHeaderWithoutSearchBar";
    import MvodManageMenu from "../components/MvodManageMenu";

    export default {
        name: "MvodAdmin",
        components: {MvodManageMenu, MvodHeaderWithoutSearchBar},
        data() {
            return {
                menu: []
            }
        },
        async mounted() {
            await this.$store.dispatch("setAdminMenuAsync");
            await this.$store.dispatch("setMenuAsync");
        }
    }
</script>

<style scoped>

</style>
