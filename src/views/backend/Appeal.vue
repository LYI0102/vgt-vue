<template lang="pug">
.title
  div
    h1 申訴資料
    //- el-button(@click = 'handleOpen()') +
    el-input(style='width:20%' v-model='searchID' placeholder="搜尋未回覆") 

el-table(:data ="searching" border fit max-height='850px'  :header-cell-style="{textAlign: 'center',backgroundColor:'rgb(38, 86, 99)',color:'white'}" :cell-style="{textAlign: 'center'}" )
        el-table-column(label='申訴編號' prop='appealid' width="100px" )
        el-table-column(label='申訴人ID' prop='appellantid')
        el-table-column(label='訂單編號' prop='orderid')
        el-table-column(label='申訴分類' prop='appealclass')
        el-table-column(label='申訴內容' prop='appealdesc')
        el-table-column(label='申訴時間' prop='appealdate')
        el-table-column(label='申訴圖片' prop='appealimg'  width="200px")
        el-table-column(label='申訴狀態' prop='appealstate')
        el-table-column(label='操作' width="150px")
          template(#default="scope")
            el-button(size='small' @click='handleEdit(scope.row)') 回覆
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
      el-input(v-model="currentItem.appealid")   
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
import { computed, onMounted, reactive, ref } from "vue";
import axios from "axios";
import _ from "lodash";
export default {
  name: "Appeal",
  setup() {
    const appealList = ref([]);
    const dialogVisible = ref(false);
    const searchID = ref(undefined);
    const formData = () => ({
      appealid: -1,
      appellantid: "",
      orderid: "",
      appealclassname: "",
      appealdesc: "",
      appealdate: "",
      appealimg: "",
      rplyid: "",
    });
    const currentItem = reactive(formData());
    const fetchPosts = async () => {
      await axios
        .get("http://localhost:3030/Vgt/vgtserver/appeal")
        .then((res) => {
          appealList.value = _.chain(res.data).cloneDeep().value();
          appealList.value.map((val) => {
            val.appealdate = new Date(val.appealdate).toLocaleDateString();
          });
        });
    };
    const handleEdit = (scope) => {
      dialogVisible.value = !dialogVisible.value;
      return _.assign(currentItem, scope);
    };
    const okButton = () => {
      postData();
      putData();
      dialogVisible.value = false;
    };
    const postData = () => {
      axios
        .post(
          "http://localhost:3030/Vgt/vgtserver/appealrply",
          JSON.stringify(currentItem),
          { headers: { "Content-Type": "application/json" } }
        )

        .then((response) => {
          console.log(response);
          console.log(currentItem);
        });
      fetchPosts();
    };
    const putData = () => {
      axios
        .put(
          "http://localhost:3030/Vgt/vgtserver/appeal",
          JSON.stringify(currentItem),
          { headers: { "Content-Type": "application/json" } }
        )

        .then((response) => {
          console.log(response);
          console.log(currentItem);
        });
      fetchPosts();
    };
    const searching = computed(() => {
      if (searchID.value) {
        return _.chain(appealList.value)
          .filter((val) => {
            return val.appealstate.includes(searchID.value);
          })
          .value();
      } else {
        return appealList.value;
      }
    });
    onMounted(() => {
      fetchPosts();
    });
    return {
      appealList,
      dialogVisible,
      fetchPosts,
      handleEdit,
      currentItem,
      okButton,
      searchID,
      searching,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "view";
</style>
