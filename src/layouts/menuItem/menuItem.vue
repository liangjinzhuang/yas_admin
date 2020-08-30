<template>

<div v-if="!menu.hidden">
    <el-menu-item :index="menu.redirect || menu.path" v-if="hasOneShowingChild(menu.children,menu)&& (!onlyOneChild.children||onlyOneChild.noShowingChildren)">
        <i :class="menu.meta.icon"></i>
        <span slot="title">{{menu.meta.title}}</span>
      </el-menu-item>

     <el-submenu  :index="menu.path"  v-else>
        <template slot="title">
          <i :class="menu.meta.icon"></i>
          <span>{{menu.meta.title}}</span>
        </template>
        <menuItem v-for="item in menu.children" :key="item.path" :menu="item" :base-path="item.path"></menuItem>
      </el-submenu>

    
</div>

</template>

<script>
export default {
  name: "menuItem",
  data() {
    this.onlyOneChild = null
    return {};
  },
  props: {
    menu: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  methods:{
    hasOneShowingChild(children = [], parent){
      const showingChildren = children.filter(item=>{
        if(item.hidden){
          return false
        }else{
          this.onlyOneChild = item
          return true
        }
      })

      if(showingChildren.length ===1){
        return true
      }

      if(showingChildren.length ===0){
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false

    }
  },
  computed: {},
};
</script>

<style lang="scss" spoced>
 /*隐藏文字*/
  .el-menu--collapse  .el-submenu__title span{
    transition: all 0.3s;
    display: none;
  }
  /*隐藏 > */
  .el-menu--collapse  .el-submenu__title .el-submenu__icon-arrow{
    transition: all 0.3s;
    display: none;
  }

</style>