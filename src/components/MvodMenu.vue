<template>
    <el-menu>
        <mvod-sub-menu v-for="subMenu in subMenus" v-bind:key="subMenu.id"
                       v-bind:sub-menu="subMenu"></mvod-sub-menu>
    </el-menu>
</template>

<script>
    import MvodSubMenu from "./MvodSubMenu";

    export default {
        name: "MvodMenu",
        components: {MvodSubMenu},
        props: ['subMenus']
    }
</script>

<style scoped>

</style>
