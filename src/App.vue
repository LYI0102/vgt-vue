<template>
  <div id="app">
    <header>
      <Navigation> </Navigation>
    </header>
    <div class="asideMain">
      <aside class="aside">
        <AsideMenu> </AsideMenu>
      </aside>
      <main class="main">
        <router-view />
      </main>
    </div>
    <!-- <el-container>
      <el-container class="content">
        <el-aside class="aside"> </el-aside>
        <el-main class="main"> </el-main>
      </el-container>
    </el-container> -->
    <!-- <footer>
      <Footer> </Footer>
    </footer> -->
  </div>
</template>
<script>
import AsideMenu from "./views/AsideMenu.vue";
import Navigation from "../src/components/Navigation.vue";
// import Footer from "../src/components/Footer.vue";
export default {
  components: {
    AsideMenu,
    Navigation,
    // Footer,
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: white;
}

.asideMain {
  display: flex;
  width: 100%;
  height: 100%;
  .aside {
    width: 250px;
    height: 100vh;
    // margin-top: 16px;
  }
  .main {
    width: 80%;
    height: 100vh;
    padding-left: 40px;
  }
}
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
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:root {
  background: white;
}
</style>
