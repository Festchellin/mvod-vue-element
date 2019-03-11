<template>
    <el-menu>
        <mvod-sub-menu v-bind:key="subMenu.id" v-bind:sub-menu="subMenu"
                       v-for="subMenu in subMenus"></mvod-sub-menu>
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
