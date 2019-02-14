<template>
    <el-submenu :index="subMenu.id+''">
        <template slot="title">
            <span>
               {{subMenu.title}}
            </span>
        </template>
        <el-menu-item v-for="item in subMenu.items" v-bind:key="item.id" :index="item.name">{{item.name}}</el-menu-item>
    </el-submenu>
</template>

<script>
    export default {
        name: "MvodSubMenu",
        props: ['subMenu']
    }
</script>

<style scoped>

</style>
