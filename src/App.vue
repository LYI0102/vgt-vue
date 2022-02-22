<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <router-link to="/">Home</router-link> |
        <router-link to="/vgt/member">member</router-link>
      </el-header>
      <el-container class="content">
        <el-aside class="aside">
          <Home> </Home>
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
import Home from "./views/backend/Home.vue";
export default {
  components: {
    Home,
  },
  setup() {},
};
</script>
<style lang="scss">
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
