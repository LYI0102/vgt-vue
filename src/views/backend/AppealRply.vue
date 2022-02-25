<template lang="pug">
.title
  div
    h1 申訴回覆
    el-button(@click = 'handleOpen()') +
    el-input(style='width:20%' v-model='searchID' placeholder="搜尋訂單") 

el-table(:data ="appealRplyList" border fit max-height='850px'  :header-cell-style="{textAlign: 'center',backgroundColor:'rgb(38, 86, 99)',color:'white'}" :cell-style="{textAlign: 'center'}" )
        el-table-column(label='申訴編號' prop='appealid' width="100px" )
        el-table-column(label='管理人ID' prop='managerid')
        el-table-column(label='回覆內容' prop='rplydesc')
        el-table-column(label='回覆日期' prop='rplydate')
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
    el-form-item(label="申訴編號")
      el-input(v-model="currentItem.appelid")   
    el-form-item(label="管理人ID")
      el-input(v-model="currentItem.managerid") 
    el-form-item(label="回覆內容" )
      el-input(v-model="currentItem.rplydesc" )
  template(#footer)
    span(class="dialog-footer")
        el-button(@click="okButton()") 儲存
        el-button(type="primary" @click="dialogVisible = false") 關閉      
</template>
<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import _ from "lodash";
export default {
  name: "AppealRply",
  setup() {
    const appealRplyList = ref([]);
    const fetchPosts = async () => {
      await axios
        .get("http://localhost:3000/Vgt/vgtserver/appealrply")
        .then((res) => {
          appealRplyList.value = _.chain(res.data).cloneDeep().value();
          appealRplyList.value.map((val) => {
            val.rplydate = new Date(val.rplydate).toLocaleDateString();
          });
        });
    };
    onMounted(() => {
      fetchPosts();
    });
    return {
      appealRplyList,
      fetchPosts,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "view";
</style>
