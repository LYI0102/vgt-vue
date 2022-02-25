<template lang="pug">
.title
  div
    h1 訂單留言
    //- el-button(@click = 'handleOpen()') +
    //- el-input(style='width:20%' v-model='searchID' placeholder="搜尋訂單") 

el-table(:data ="orderCmmtList" border fit max-height='850px'  :header-cell-style="{textAlign: 'center',backgroundColor:'rgb(38, 86, 99)',color:'white'}" :cell-style="{textAlign: 'center'}" )
        el-table-column(label='訂單編號' prop='orderid' width="100px" )
        el-table-column(label='留言ID' prop='cmmtid')
        el-table-column(label='留言內容' prop='cmmtdesc')
        el-table-column(label='留言時間' prop='cmmtdate')
        el-table-column(label='操作' )
          template(#default="scope")
            //- el-button(size='small' @click='handleEdit(scope.row)') 修改
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
    title="新增"
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
import { onMounted, ref } from "vue";
import axios from "axios";
import _ from "lodash";
export default {
  name: "OrderCmmt",
  setup() {
    const orderCmmtList = ref([]);
    const fetchPosts = async () => {
      await axios
        .get("http://localhost:3030/Vgt/vgtserver/ordercmmt")
        .then((res) => {
          orderCmmtList.value = _.chain(res.data).cloneDeep().value();
          orderCmmtList.value.map((val) => {
            val.cmmtdate = new Date(val.cmmtdate).toLocaleDateString();
          });
        });
    };
    const delButton = (scope) => {
      axios
        .delete(
          `http://localhost:3030/Vgt/vgtserver/ordercmmt/${scope.orderidset}`,
          { scope },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          console.log(res);
        });
      fetchPosts();
    };
    onMounted(() => {
      fetchPosts();
    });
    return {
      orderCmmtList,
      fetchPosts,
      delButton,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "view";
</style>
