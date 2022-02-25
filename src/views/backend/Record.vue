<template lang="pug">
.title
  div
    h1 儲值歷程
    //- el-button(@click = 'handleOpen()') +
    //- el-input(style='width:20%' v-model='searchID' placeholder="搜尋訂單") 

el-table(:data ="recordList" border fit max-height='850px'  :header-cell-style="{textAlign: 'center',backgroundColor:'rgb(38, 86, 99)',color:'white'}" :cell-style="{textAlign: 'center'}" )
        el-table-column(label='會員ID' prop='vgtid' width="100px" )
        el-table-column(label='儲值金額' prop='price')
        el-table-column(label='儲值方式' prop='type')
        el-table-column(label='儲值日期' prop='date')
        el-table-column(label='操作' width="150px")
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
    title=" 新增"
    width="30%"
    
   )
  el-form(
  :modal='currentItem' 
  label-width="80px"
  label-position='right'
  )
    el-form-item(label="會員ID")
      el-input(v-model="currentItem.vgtid")   
    el-form-item(label="儲值金額")
      el-input(v-model="currentItem.productid") 
    el-form-item(label="儲值方式" )
      el-input(v-model="currentItem.type" )
    el-form-item(label="儲值日期")
      el-input(v-model="currentItem.date")
  template(#footer)
    span(class="dialog-footer")
        el-button(@click="okButton()") 儲存
        el-button(type="primary" @click="dialogVisible = false") 關閉 
</template>
<script>
import axios from "axios";
import _ from "lodash";
import { ref, onMounted } from "vue";
export default {
  name: "Record",
  setup() {
    const recordList = ref([]);
    const fetchPosts = async () => {
      await axios
        .get("http://localhost:3030/Vgt/vgtserver/vgtrecord")
        .then((res) => {
          recordList.value = _.chain(res.data).cloneDeep().value();
          recordList.value.map((val) => {
            val.date = new Date(val.date).toLocaleDateString();
          });
        });
    };
    const delButton = (scope) => {
      axios
        .delete(
          `http://localhost:3030/Vgt/vgtserver/vgtrecord/${scope.vgtid}`,
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
      recordList,
      fetchPosts,
      delButton,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "view";
</style>
