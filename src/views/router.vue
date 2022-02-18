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
    
   

</template>
<script>
export default {
  name: "Router",
  setup() {},
};
</script>
