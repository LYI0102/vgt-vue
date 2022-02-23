<template lang="pug">
.title
 
  div
    h1 會員資料
    el-button(@click = 'handleOpen()') +
    el-input(style='width:20%' v-model='searchID' placeholder="搜尋姓名") 

el-table(:data ="serching" border fit max-height='850px'  :header-cell-style="{textAlign: 'center',backgroundColor:'rgb(38, 86, 99)',color:'white'}" :cell-style="{textAlign: 'center'}" )
        el-table-column(label='會員ID' prop='vgtid' width="100px" )
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
            el-button(size='small' @click='delButton(scope.row)') 刪除
el-pagination( 
  v-model:currentPage="currentPage"
  v-model:page-size="pageSize" 
  background 
  layout="total, sizes, prev, pager, next, jumper" 
  :total="total"
  @current-change="handleCurrentChange"
  )
el-dialog(
    v-model="dialogVisible"
    :title="currentItem.vgtid=== undefined ? '新增':'修改' "
    width="30%"
    
   )
  el-form(
  :modal='currentItem' 
  label-width="80px"
  label-position='right'
  )
    el-form-item(label="暱稱")
      el-input(v-model="currentItem.vgtname")   
    el-form-item(label="帳號")
      el-input(v-model="currentItem.account") 
    el-form-item(label="密碼" v-if='currentItem.vgtid===undefined')
      el-input(v-model="currentItem.password" )
    el-form-item(label="姓名")
      el-input(v-model="currentItem.truename") 
    el-form-item(label="生日")
      el-input(v-model="currentItem.birthdate" type='date') 
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
        el-button(@click="okButton()") 儲存
        el-button(type="primary" @click="dialogVisible = false") 關閉

</template>
<script>
import axios from "axios";
import _ from "lodash";
import { computed, onMounted, reactive, ref } from "vue";
export default {
  name: "Member",
  setup() {
    const dialogVisible = ref(false);
    const searchID = ref(undefined);
    const total = ref(undefined);
    const pageSize = ref(15);
    const currentPage = ref(1);
    const filter = ref([]);
    const formData = () => ({
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
    const currentItem = reactive(formData());
    const memberList = ref([]);
    const handleOpen = () => {
      dialogVisible.value = !dialogVisible.value;
      return _.assign(currentItem, formData());
    };
    const handleEdit = (scope) => {
      dialogVisible.value = !dialogVisible.value;
      return _.assign(currentItem, scope);
    };

    const transFormsData = (itemArray) => {
      const data = {};
      for (const item of itemArray) {
        data[item.truename] = item;
      }
      return data;
    };
    const fetchPosts = async () => {
      await axios
        .get("http://localhost:3000/Vgt/vgtserver/member")
        .then((res) => {
          memberList.value = _.chain(res.data).cloneDeep().value();
        });
    };
    const okButton = async () => {
      if (currentItem.vgtid === undefined) {
        await axios
          .post(
            "http://localhost:3000/Vgt/vgtserver/member",
            JSON.stringify(currentItem),
            { headers: { "Content-Type": "application/json" } }
          )
          .then((res) => {
            console.log(res);
          });
      } else {
        await axios
          .put(
            "http://localhost:3000/Vgt/vgtserver/member",
            JSON.stringify(currentItem),
            { headers: { "Content-Type": "application/json" } }
          )
          .then((res) => {
            console.log(res);
          });
      }
      dialogVisible.value = false;
      fetchPosts();
    };
    const delButton = (scope) => {
      axios
        .delete(
          `http://localhost:3000/Vgt/vgtserver/member/${scope.vgtid}`,
          { scope },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          console.log(res);
        });
    };
    const serching = computed(() => {
      if (searchID.value) {
        return memberList.value.filter((val) => {
          return val.truename
            .toLowerCase()
            .includes(searchID.value.toLowerCase());
        });
      } else {
        return memberList.value;
      }

      // if (!searchID.value) {
      //   total.value = memberList.value.length;
      //   return memberList.value;
      // }
      // currentPage.value = 1;
      // return memberList.value.filter((val) => {
      //   return val.truename
      //     .toLowerCase()
      //     .includes(searchID.value.toLowerCase());
      // });
    });
    // const displayData = computed(() => {
    //   total.value = serchButton.length;
    //   return serchButton.slice(
    //     pageSize.value * currentPage.value - pageSize.value,
    //     pageSize.value * currentPage.value
    //   );
    // });

    const handleCurrentChange = (val) => {
      currentPage.value = val;
    };

    onMounted(() => {
      fetchPosts();
    });
    return {
      currentItem,
      memberList,
      total,
      pageSize,
      currentPage,
      filter,
      dialogVisible,
      transFormsData,
      handleOpen,
      fetchPosts,
      handleEdit,
      searchID,
      okButton,
      delButton,
      serching,
      handleCurrentChange,
    };
  },
};
</script>

<style lang="scss" scoped>
$width: 80%;
$background-color: rgb(38, 86, 99);
$background-color-hover: rgb(25, 161, 135);
.title {
  > div {
    display: flex;
    justify-content: start;
    align-items: center;
    h1 {
      padding-right: 20px;
      font-size: 2rem;
    }
    .el-input {
      padding-left: 20px;
      width: $width;
    }
  }
}

main.el-main {
  display: flex;
  justify-content: center;
}
.el-input {
  width: $width;
}
.el-button {
  color: #fff;
  background-color: $background-color;
  border-color: $background-color;
  &:hover {
    color: #fff;
    background-color: $background-color-hover;
    border-color: $background-color-hover;
  }
  &:focus {
    color: #fff;
    background-color: $background-color;
    border-color: $background-color;
  }
}
</style>
