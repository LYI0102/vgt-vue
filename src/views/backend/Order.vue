<template lang="pug">
.title
 
  div
    h1 訂單資料
    el-button(@click = 'handleOpen()') +
    el-input(style='width:20%' v-model='searchID' placeholder="搜尋訂單") 

el-table(:data ="serching" border fit max-height='850px'  :header-cell-style="{textAlign: 'center',backgroundColor:'rgb(38, 86, 99)',color:'white'}" :cell-style="{textAlign: 'center'}" )
        el-table-column(label='訂單編號' prop='orderid' width="100px" )
        el-table-column(label='買家ID' prop='buyerid')
        el-table-column(label='商品編號' prop='productid')
        el-table-column(label='訂單日期' prop='orderdate')
        el-table-column(label='交易狀態' prop='orderstate')
        el-table-column(label='角色名稱' prop='charactername')
        el-table-column(label='角色特徵' prop='characterdesc'  width="200px")
        el-table-column(label='評價' prop='ordereval')
        el-table-column(label='評價留言' prop='orderevalcmmt' )
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
    :title="currentItem.orderid=== undefined ? '新增':'修改'"
    width="30%"
    
   )
  el-form(
  :modal='currentItem' 
  label-width="80px"
  label-position='right'
  )
    el-form-item(label="買家ID")
      el-input(v-model="currentItem.buyerid")   
    el-form-item(label="商品編號")
      el-input(v-model="currentItem.productid") 
    el-form-item(label="交易狀態" )
      el-input(v-model="currentItem.orderstate" )
    el-form-item(label="角色名稱")
      el-input(v-model="currentItem.charactername") 
    el-form-item(label="角色特徵")
      el-input(v-model="currentItem.characterdesc" ) 
    el-form-item(label="評價")
      el-input(v-model="currentItem.ordereval") 
    el-form-item(label="評價留言")
      el-input(v-model="currentItem.orderevalcmmt") 
  template(#footer)
    span(class="dialog-footer")
        el-button(@click="okButton()") 儲存
        el-button(type="primary" @click="dialogVisible = false") 關閉

</template>
<script>
import { ref, onMounted, reactive, computed } from "vue";
import axios from "axios";
import _ from "lodash";
export default {
  name: "Order",
  setup() {
    const orderList = ref([]);
    const dialogVisible = ref(false);
    const searchID = ref(undefined);
    const fetchPosts = async () => {
      await axios
        .get("http://localhost:3000/Vgt/vgtserver/order")
        .then((res) => {
          orderList.value = _.chain(res.data).cloneDeep().value();
        });
    };
    const formData = () => ({
      orderid: undefined,
      buyerid: "",
      productid: "",
      orderdate: "",
      orderstate: "",
      charactername: "",
      characterdesc: "",
      ordereval: "",
      orderevalcmmt: "",
    });
    const currentItem = reactive(formData());
    const handleOpen = () => {
      dialogVisible.value = !dialogVisible.value;
      return _.assign(currentItem, formData());
    };
    const handleEdit = (scope) => {
      dialogVisible.value = !dialogVisible.value;
      return _.assign(currentItem, scope);
    };
    const delButton = (scope) => {
      axios
        .delete(
          `http://localhost:3000/Vgt/vgtserver/order/${scope.orderid}`,
          { scope },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          console.log(res);
        });
      fetchPosts();
    };
    const okButton = async () => {
      if (currentItem.orderid === undefined) {
        await axios
          .post(
            "http://localhost:3000/Vgt/vgtserver/order",
            JSON.stringify(currentItem),
            { headers: { "Content-Type": "application/json" } }
          )
          .then((res) => {
            console.log(res);
          });
      } else {
        await axios
          .put(
            "http://localhost:3000/Vgt/vgtserver/order",
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
    const serching = computed(() => {
      if (searchID.value) {
        return _.chain(orderList.value)
          .filter((val) => {
            return val.orderid.includes(searchID.value);
          })
          .value();
      } else {
        return orderList.value;
      }
    });
    onMounted(() => {
      fetchPosts();
    });
    return {
      orderList,
      fetchPosts,
      dialogVisible,
      handleOpen,
      currentItem,
      formData,
      handleEdit,
      delButton,
      okButton,
      searchID,
      serching,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "view";
</style>
