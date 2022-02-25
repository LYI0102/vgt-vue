<template lang="pug">
.title
  div
    h1 商品折扣
    el-button(@click = 'handleOpen()') +
    el-input(style='width:20%' v-model='searchID' placeholder="搜尋折扣碼") 

el-table(:data ="serching" border fit max-height='850px'  :header-cell-style="{textAlign: 'center',backgroundColor:'rgb(38, 86, 99)',color:'white'}" :cell-style="{textAlign: 'center'}" )
        el-table-column(label='會員ID' prop='vgtid' width="100px" )
        el-table-column(label='折扣序號' prop='discountid')
        el-table-column(label='折扣金額' prop='discountprice')
        el-table-column(label='折扣訂單' prop='discountorder')
        el-table-column(label='折扣是否使用' prop='discountuse')
        el-table-column(label='操作' width="150px")
          template(#default="scope")
            el-button(size='small' @click='handleEdit(scope.row)') 修改
            el-button(size='small' @click='delButton(scope.row)') 刪除
//- el-pagination( 
//-   v-model:currentPage="currentPage"
//-   v-model:page-size="pageSize" 
//-   background 
//-   layout="total, sizes, prev, pager, next, jumper" 
//-   :total="total"
//-   @current-change="handleCurrentChange"
//-   )
el-dialog(
    v-model="dialogVisible"
    :title=" currentItem.discountidid===-1?'新增':'修改'"
    width="30%"
    
   )
  el-form(
  :modal='currentItem' 
  label-width="100px"
  label-position='right'
  )
    el-form-item(label="會員ID")
      el-input(v-model="currentItem.vgtid")   
    el-form-item(label="折扣序號")
      el-input(v-model="currentItem.discountid") 
    el-form-item(label="折扣金額" )
      el-input(v-model="currentItem.discountprice" )
    el-form-item(label="折扣訂單")
      el-input(v-model="currentItem.discountorder") 
    el-form-item(label="折扣是否使用")
      el-input(v-model="currentItem.discountuse" ) 
  template(#footer)
    span(class="dialog-footer")
        el-button(@click="okButton()") 儲存
        el-button(type="primary" @click="dialogVisible = false") 關閉  
</template>
<script>
import { onMounted, reactive, ref, computed } from "vue";
import axios from "axios";
import _ from "lodash";
export default {
  name: "Discount",
  setup() {
    const discountList = ref([]);
    const dialogVisible = ref(false);
    const searchID = ref(undefined);
    const formData = () => ({
      vgtid: "",
      discountidid: -1,
      discountid: "",
      discountprice: "",
      discountorder: "",
      discountuse: "",
    });
    const currentItem = reactive(formData());
    const fetchPosts = async () => {
      await axios
        .get("http://localhost:3000/Vgt/vgtserver/vgtdiscount")
        .then((res) => {
          discountList.value = _.chain(res.data).cloneDeep().value();
        });
    };

    const handleOpen = () => {
      dialogVisible.value = !dialogVisible.value;
      return _.assign(currentItem, formData());
    };
    const handleEdit = (scope) => {
      dialogVisible.value = !dialogVisible.value;
      return _.assign(currentItem, scope);
    };
    const okButton = async () => {
      if (currentItem.discountidid === -1) {
        await axios
          .post(
            "http://localhost:3000/Vgt/vgtserver/vgtdiscount",
            JSON.stringify(currentItem),
            { headers: { "Content-Type": "application/json" } }
          )
          .then((res) => {
            console.log(res);
          });
      } else {
        await axios
          .put(
            "http://localhost:3000/Vgt/vgtserver/vgtdiscount",
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
          `http://localhost:3000/Vgt/vgtserver/vgtdiscount/${scope.vgtid}`,
          { scope },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          console.log(res);
        });
      fetchPosts();
    };
    const serching = computed(() => {
      if (searchID.value) {
        // return memberList.value.filter((val) => {
        //   return val.truename
        //     .toLowerCase()
        //     .includes(searchID.value.toLowerCase());
        // });
        return _.chain(discountList.value)
          .filter((val) => {
            return val.discountid
              .toLowerCase()
              .includes(searchID.value.toLowerCase());
          })
          .value();
      } else {
        return discountList.value;
      }
    });
    onMounted(() => {
      fetchPosts();
    });
    return {
      discountList,
      handleOpen,
      dialogVisible,
      currentItem,
      handleEdit,
      okButton,
      delButton,
      searchID,
      serching,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "view";
</style>
