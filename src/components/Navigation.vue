<template>
  <header>
    <nav>
      <div class="branding">
        <img src="@/assets/logo.svg" alt="" />
      </div>
      <ul class="navigation">
        <li><router-link class="link" to="/"></router-link></li>
        <li><router-link class="link" to="">會員中心</router-link></li>
        <li><router-link class="link" to="">新手上路</router-link></li>
        <li><router-link class="link" to="">買賣交易流程</router-link></li>
        <li><router-link class="link" to="">付款方式</router-link></li>
        <li><router-link class="link" to="">登入</router-link></li>
      </ul>
      <div class="icon">
        <i v-show="mobile" class="far fa-bars"></i>
      </div>
    </nav>
  </header>
</template>
<script>
export default {
  name: "Navigation",
  setup() {},
};
</script>
<style lang="scss" scoped>
header {
  background-color: white;
  z-index: 99;
  width: 100%;
  // position: fixed;
  transition: 0.5s ease all;
  color: white;
  height: 100px;
  display: flex;
  justify-content: center;
  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 12px 0;
    width: 100%;
    margin: 0 auto;
  }
  ul,
  .link {
    font-weight: bold;
    color: rgb(38, 86, 99);
    list-style: none;
    text-decoration: none;
  }
  li {
    text-transform: uppercase;
    padding: 16px;
    margin-left: 16px;
  }
  .link {
    font-size: 20px;
    transition: 0.5s ease all;

    padding-bottom: 4px;
    border-bottom: 1px solid transparent;
    &:hover {
      color: rgb(25, 161, 135);
      border-color: rgb(25, 161, 135);
    }
  }
  .branding {
    display: flex;
    align-items: center;
    justify-content: start;
    img {
      width: 180px;
    }
  }
  .navigation {
    display: flex;
    justify-content: flex-end;
    flex: 1;
    align-items: center;
  }
}
</style>
