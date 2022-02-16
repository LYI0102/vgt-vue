<template lang="pug">
div
  h1 會員資料
    el-button(@click = 'handleOpen()') +
  
el-container
  el-main
      el-table(:data ="memberList" border fit  :header-cell-style="{textAlign: 'center',backgroundColor:'rgb(38, 86, 99)',color:'white'}" :cell-style="{textAlign: 'center'}" )
        el-table-column(  prop='vgtid' label='會員ID' width="100px" )
        el-table-column(label='暱稱' prop='vgtname')
        el-table-column(label='帳號' prop='account')
        el-table-column(label='姓名' prop='truename')
        el-table-column(label='生日' prop='birthdate')
        el-table-column(label='身分證' prop='trueid')
        el-table-column(label='信箱' prop='email'  width="200px")
        el-table-column(label='手機' prop='phone')
        el-table-column(label='權限' prop='auth' width="60px")
        el-table-column(label='餘額' prop='vgtpoint')
        el-table-column(label='評價總分' prop='eval')
        el-table-column(label='操作' width="150px")
          template(#default="scope")
            el-button(size='small' @click='handleEdit(scope.row)') 修改
            el-button(size='small') 刪除

el-dialog(
    v-model="dialogVisible"
    title="新增 "
    width="30%"
    
   )
  el-form(
  :modal='currentItem' 
  label-width="80px"
  label-position='right'
  )
    el-form-item(label="會員ID")
      el-input(v-model="currentItem.vgtid") 
    el-form-item(label="暱稱")
      el-input(v-model="currentItem.vgtname")   
    el-form-item(label="帳號")
      el-input(v-model="currentItem.account") 
    el-form-item(label="姓名")
      el-input(v-model="currentItem.truename") 
    el-form-item(label="生日")
      el-input(v-model="currentItem.birthdate") 
    el-form-item(label="身分證")
      el-input(v-model="currentItem.trueid") 
    el-form-item(label="信箱")
      el-input(v-model="currentItem.email") 
    el-form-item(label="手機")
      el-input(v-model="currentItem.phone") 
    el-form-item(label="權限")
      el-input(v-model="currentItem.auth") 
    el-form-item(label="餘額")
      el-input(v-model="currentItem.vgtpoint") 
    el-form-item(label="評價總分")
      el-input(v-model="currentItem.eval")
  template(#footer)
    span(class="dialog-footer")
        el-button(@click="dialogVisible = false") 儲存
        el-button(type="primary" @click="dialogVisible = false") 關閉

</template>
<script>
import axios from "axios";
import _ from 'lodash';
import { onMounted, reactive, ref } from "vue";
export default {
  setup() {
    const dialogVisible = ref(false);
    const currentItem = reactive({
      vgtid: undefined,
      vgtname: "",
      account: "",
      password: "",
      truename: "",
      birthdate: "",
      trueid: "",
      email: "",
      phone: "",
      auth: "",
      vgtpoint: "",
      vgtpassword: "",
      eval: "",
    });
    const memberList = ref([]);
    const handleOpen = () => {
      dialogVisible.value = !dialogVisible.value;
      return _.assign(currentItem,{})
    };
    const handleEdit = (scope)=>{
      dialogVisible.value = !dialogVisible.value;
      return _.assign(currentItem,scope)
    }
    onMounted(() => {
      axios.get("http://localhost:3000/Vgt/vgtserver/member").then((res) => {
        memberList.value = res.data;
      });
    });
    return {
      currentItem,
      memberList,
      handleOpen,
      dialogVisible,
      handleEdit,
    };
  },
};
</script>

<style lang="scss" scoped>
main.el-main {
  display: flex;
  justify-content: center;
  .el-table {
    width: 80%;
  }
}
.el-input{
  width: 80%;
}
.el-table{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
