<template lang="pug">
.app
  VgtrMenu
.container
  router-view 

Home
</template>
<script>
import Home from '../views/backend/Home.vue'
export default {
  name: "Router",
  setup() {},
};
</script>
