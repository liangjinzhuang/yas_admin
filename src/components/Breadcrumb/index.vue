<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in breadList"
        :key="index"
        :to="{ path: item.path }"
      >{{ item.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      breadList: null
    };
  },
  watch: {
    $route(route) {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods:{
    isIndex(route) {
      return route.name === "dashboard";
    },
    getBreadcrumb() {
      let matched = this.$route.matched;
     /*  this.$log('matched=>',matched) */
      if (!this.isIndex(matched[1])) {
        matched = [{ path: "/dashboard", meta: { title: "首页" } }].concat(
          matched
        );
      }
        this.breadList = matched.filter((item) => item.name !== "home");
       /*  console.log("this.breadList=>", this.breadList); */
    },
  }
};
</script>

<style lang='scss' scoped>
</style>

