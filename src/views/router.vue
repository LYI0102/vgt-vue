<template lang="pug">
.nav
  router-link(:to="{name:'Member'}") Member
  router-link(:to="{name:'appeal'}") appeal
  router-link(:to="{name:'appealRply'}") appealRply
  router-link(:to="{name:'discount'}") discount
  router-link(:to="{name:'news'}") news
  router-link(:to="{name:'order'}") order
  router-link(:to="{name:'orderCmmt'}") orderCmmt
  router-link(:to="{name:'product'}") product
  router-link(:to="{name:'productCmmt'}") productCmmt
  router-link(:to="{name:'record'}") record
    
el-menu(
:default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
 )
    el-menu-item index="1" Processing Center
    el-sub-menu index="2"
      template(#title) Workspace
      el-menu-item(index="2-1") item one
      el-menu-item(index="2-2")item two
      el-menu-item(index="2-3") item three
      el-sub-menu(index="2-4") 
        template(#titleitem)  four
        el-menu-item(index="2-4-1") item one
        el-menu-item(index="2-4-2") item two
        el-menu-item(index="2-4-3") item three
    el-menu-item(index="3")  disabledInfo
    el-menu-item(index="4") Orders
   

</template>
<script>
export default {
  name: "Router",
  setup() {},
};
</script>
