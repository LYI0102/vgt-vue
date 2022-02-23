<template>
  <div class="aside">
    <el-row class="tac">
      <el-col>
        <el-menu
          active-text-color="#ffd04b"
          background-color="linear-gradient(55deg, rgb(2, 147, 82), rgb(54, 134, 150))"
          class="el-menu-vertical-demo"
          :default-active="$route.path"
          text-color="#fff"
          router
        >
          <el-menu-item index="1" :route="{ name: 'member' }">
            <el-icon><icon-menu /></el-icon>
            <span>會員中心</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><location /></el-icon>
              <span>訂單</span>
            </template>
            <el-menu-item index="2-1" :route="{ name: 'order' }"
              >訂單資料
            </el-menu-item>
            <el-menu-item index="2-2" :route="{ name: 'orderCmmt' }"
              >訂單留言</el-menu-item
            >
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><location /></el-icon>
              <span>產品</span>
            </template>
            <el-menu-item index="3-1" :route="{ name: 'product' }"
              >商品資料
            </el-menu-item>
            <el-menu-item index="3-2" :route="{ name: 'discount' }"
              >商品折扣</el-menu-item
            >
            <el-menu-item index="3-3" :route="{ name: 'productCmmt' }"
              >商品留言</el-menu-item
            >
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><location /></el-icon>
              <span>申訴</span>
            </template>
            <el-menu-item index="4-1" :route="{ name: 'appeal' }"
              >申訴資料
            </el-menu-item>
            <el-menu-item index="4-2" :route="{ name: 'appealRply' }"
              >申訴回覆</el-menu-item
            >
          </el-sub-menu>
          <el-menu-item index="5" :route="{ name: 'news' }">
            <el-icon><icon-menu /></el-icon>
            <span>公告</span>
          </el-menu-item>
          <el-menu-item index="6" :route="{ name: 'record' }">
            <el-icon><icon-menu /></el-icon>
            <span>儲值</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "AsideMenu",
  components: {},

  setup() {
    function handleOpen(key, keyPath) {
      console.log(key, keyPath);
    }

    function handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
    return {
      handleOpen,
      handleClose,
    };
  },
};
</script>
<style lang="scss" scoped>
.el-menu {
  height: 100vh;
  width: 100%;
  background: linear-gradient(55deg, rgb(2, 147, 82), rgb(54, 134, 150));
  .el-sub-menu__title:hover {
    background-color: rgb(0, 86, 127);
  }
}
</style>
