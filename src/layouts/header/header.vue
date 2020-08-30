<template>
  <div>
    <div class="n-header">
      <div class="toggle">
        <i class="el-icon-s-fold toggle-icon"
           @click="toggle"></i>
      </div>
      <Breadcrumb></Breadcrumb>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb';
export default {
  data () {
    return {

    };
  },
  components: {
    Breadcrumb
  },
  created () { },
  methods: {
    toggle () {
      this.$emit("toggleClick");
    }
  },
};
</script>

<style lang="scss" scope>
.n-header {
  width: 100%;
  display: flex;
  height: 50px;
}
.toggle {
  line-height: 50px;
  padding: 0 20px;
  .toggle-icon {
    font-size: 20px;
  }
}
.breadcrumb .el-breadcrumb {
  line-height: 50px;
  vertical-align: middle;
}
</style>