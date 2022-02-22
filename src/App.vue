<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <router-link to="/">Home</router-link> |
        <router-link to="/vgt/member">member</router-link>
      </el-header>
      <el-container class="content">
        <el-aside class="aside">
          <AsideMenu> </AsideMenu>
        </el-aside>
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
      <el-footer>
        <div className="text-center p-3">
          © 2021 Copyright:
          <a className="text-white" href="#">Virtual Goods Trade.com</a>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import AsideMenu from "./views/AsideMenu.vue";
export default {
  components: {
    AsideMenu,
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
// .el-aside {
//   margin-top: 56px;
// }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
