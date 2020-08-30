<template>
  <div class="asideMenu">
    <el-scrollbar class="menu-scrollbar">
      <div class="nav-logo">
        <span class="nav-logo-wrapper">
          <i class="el-icon-platform-eleme logo"></i>
          <transition name="fade">
            <span v-show="!isCollapse">通讯录管理</span>
          </transition>
        </span>
      </div>
      <el-menu :default-active="getPath"
               class="el-menu-vertical-demo"
               @open="handleOpen"
               @close="handleClose"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               :collapse="isCollapse"
               :router="true">
        <menuItem v-for="route in routes"
                  :key="route.path"
                  :menu="route"
                  :base-path="route.path">
        </menuItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import menuItem from "@/layouts/menuItem/menuItem";
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      path: "",
    };
  },
  computed: {
    getPath () {
      return this.$route.path || '/'
    },
    routes () {
      let routes = [];
      routes = this.$router.options.routes.filter(item => item.path === '/')[0].children;
      return routes;
    },
  },
  mounted () {
  },
  methods: {
    handleOpen (key, keyPath) {
      /* console.log(key, keyPath); */
    },
    handleClose (key, keyPath) {
      /*  console.log(key, keyPath); */
    },
  },
  components: {
    menuItem,
  },
};
</script>

<style lang="scss" scoped>
.asideMenu {
  height: 100%;
}
.menu-scrollbar {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu {
  border-right-width: 0;
}
.asideMenu >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.nav-logo {
  padding: 15px 20px;
  color: #fff;
  .logo {
    margin-left: 5px;
  }
  .icon {
    font-size: 18px;
    vertical-align: top;
    text-align: center;
  }
  .icon:hover {
    cursor: pointer;
  }
  .nav-logo-wrapper {
    margin-right: 10px;
  }
  .fade-enter-active,
  .fade-leave-active {
    will-change: transform;
    transition: all 100ms;
    position: absolute;
    backface-visibility: hidden;
    white-space: nowrap;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>