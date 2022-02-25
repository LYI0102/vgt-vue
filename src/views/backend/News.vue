<template lang="pug">
.title
  div
    h1 公告資料
    el-button(@click = 'handleOpen()') +
    //- el-input(style='width:20%' v-model='searchID' placeholder="搜尋訂單") 

el-table(:data ="newsList" border fit max-height='850px'  :header-cell-style="{textAlign: 'center',backgroundColor:'rgb(38, 86, 99)',color:'white'}" :cell-style="{textAlign: 'center'}" )
        el-table-column(label='管理員ID' prop='manangerid' width="100px" )
        el-table-column(label='公告標題' prop='newstitle')
        el-table-column(label='公告內容' prop='newsdesc')
        el-table-column(label='公告時間' prop='newsdate')
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
    title=" 新增"
    width="30%"
    
   )
  el-form(
  :modal='currentItem' 
  label-width="80px"
  label-position='right'
  )
    el-form-item(label="管理員ID")
      el-input(v-model="currentItem.manangerid")   
    el-form-item(label="公告標題")
      el-input(v-model="currentItem.newstitle") 
    el-form-item(label="公告內容" )
      el-input(v-model="currentItem.newsdesc" )
  template(#footer)
    span(class="dialog-footer")
        el-button(@click="okButton()") 儲存
        el-button(type="primary" @click="dialogVisible = false") 關閉   
</template>
<script>
import axios from "axios";
import _ from "lodash";
import { ref, onMounted, reactive } from "vue";
export default {
  name: "News",
  setup() {
    const newsList = ref([]);
    const dialogVisible = ref(false);
    const formData = () => ({
      newsid: -1,
      manangerid: "",
      newstitle: "",
      newsdesc: "",
      newsdate: "",
    });
    const currentItem = reactive(formData());
    const fetchPosts = async () => {
      await axios
        .get("http://localhost:3000/Vgt/vgtserver/vgtnews")
        .then((res) => {
          newsList.value = _.chain(res.data).cloneDeep().value();
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
      if (currentItem.newsid === -1) {
        await axios
          .post(
            "http://localhost:3000/Vgt/vgtserver/vgtnews",
            JSON.stringify(currentItem),
            { headers: { "Content-Type": "application/json" } }
          )
          .then((res) => {
            console.log(res);
          });
      } else {
        await axios
          .put(
            "http://localhost:3000/Vgt/vgtserver/vgtnews",
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
          `http://localhost:3000/Vgt/vgtserver/vgtnews/${scope.newsid}`,
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
      newsList,
      fetchPosts,
      currentItem,
      dialogVisible,
      handleOpen,
      handleEdit,
      okButton,
      delButton,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "view";
</style>
