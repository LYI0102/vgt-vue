<template>
  <router-link :to="path">
    <div class="menu-item">{{ title }}</div>
  </router-link>
</template>

<script>
export default {
  name: "MenuItem",
  components: {},
  props: {
    path: {
      // 唯一的routerPath
      type: String,
      required: true,
    },
    title: {
      // 标题
      type: String,
      required: true,
    },
  },
  setup(props) {},
};
</script>
