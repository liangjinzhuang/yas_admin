<template>
  <div class="indexHome">
    <el-container>
      <el-aside width="auto"
                class="aside">
        <asideMenu :isCollapse="isCollapse"></asideMenu>
      </el-aside>
      <el-container class="container-main"
                    :class="isCollapse?'hideSidebar':'openSidebar'">
        <el-header height="auto">
          <v-header ref="header"
                    @toggleClick="toggleSideBar"></v-header>
        </el-header>
        <el-main class="main">
          <transition name="fade-transform"
                      mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>

        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
import asideMenu from "@/layouts/aside/aside";
import header from "@/layouts/header/header";

export default {
  name: 'Layout',
  data () {
    return {
      isCollapse: false
    };
  },

  methods: {
    toggleSideBar () {
      this.isCollapse = !this.isCollapse
    }
  },

  computed: {
    key () {
      return this.$route.path;
    },
  },

  components: {
    asideMenu,
    'v-header': header
  },
};
</script>

<style lang="scss" scoped>
.aside {
  overflow-y: scroll;
  background-color: #545c64 !important;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.openSidebar.container-main {
  margin-left: 200px;
  transition: margin-left 0.3s;
}
.hideSidebar.container-main {
  margin-left: 70px;
  transition: margin-left 0.3s;
}
.container-main .el-header {
  padding: 0;
}
</style>