<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <router></router>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Router from '../views/router.vue'

export default {
  name: "Home",
  components: {
    HelloWorld,
    Router
  },
};
</script>
