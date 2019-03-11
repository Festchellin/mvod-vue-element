<template>
    <el-submenu :index="subMenu.id+''">
        <template slot="title">
            <span>
               {{subMenu.title}}
            </span>
        </template>
        <el-menu-item :index="item.name" v-bind:key="item.id" v-for="item in subMenu.items">{{item.name}}</el-menu-item>
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
