<template>
    <el-scrollbar class="tags-wrapper">
        <span class="tags-view-item" :class="getRoutes">
            首页
            <span class="el-icon-close"></span> 
        </span>
    </el-scrollbar>
</template>

<script type='text/ecmascript-6'>
export default{
    data(){
        return {

        }
    },
    computed: {
        getRoutes(){
           console.log('this.$route.path=>',this.$route) 
        }
    },
}
</script>

<style lang='scss' rel='stylesheet/scss'>
.tags-wrapper{
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 36px;
   box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
}
.el-scrollbar__wrap.default-scrollbar__wrap {
  overflow-x: auto;
}
.tags-view-item{
    padding:0 8px;
    font-size: 12px;
    line-height: 26px;
    border:1px solid #dedede;
    border-radius:2px;
    margin:4px 0;
    display: inline-block;
}
.tags-view-item:hover{
    cursor: pointer;
}
.tags-view-item:first-of-type{
    margin-left: 15px;
}
.el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>
