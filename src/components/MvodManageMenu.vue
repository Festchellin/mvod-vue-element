<template>
    <el-menu :router="true">
        <el-menu-item
                :index="item.id.toString()"
                :route="item.navigateLink"
                v-bind:key="item.taName"
                v-for="item of menu"
        >
            <!--<router-link :to="item.navigateLink"> {{ item.tbComment || item.tbName}}</router-link>-->
            {{ item.tbComment || item.tbName}}
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "MvodManageMenu",
        props: ['menu']
    }
</script>

<style scoped>

</style>
