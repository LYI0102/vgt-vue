<template lang="pug">
.title
  div
    h1 商品資料
    el-button(@click = 'handleOpen()') +
    el-input(style='width:20%' v-model='searchID' placeholder="搜尋伺服器") 

el-table(:data ="serching" border fit max-height='850px'  :header-cell-style="{textAlign: 'center',backgroundColor:'rgb(38, 86, 99)',color:'white'}" :cell-style="{textAlign: 'center'}" )
        el-table-column(label='會員ID' prop='vgtid' width="100px" )
        el-table-column(label='商品編號' prop='productid')
        el-table-column(label='遊戲分類' prop='gamelist')
        el-table-column(label='伺服器' prop='gameserver')
        el-table-column(label='商品標題' prop='producttitle' )
        el-table-column(label='商品分類' prop='productclass')
        el-table-column(label='商品內容' prop='productdesc'  )
        el-table-column(label='商品數量' prop='productquant')
        el-table-column(label='商品圖片' prop='productimg' )
        el-table-column(label='價錢' prop='productprice' )
        el-table-column(label='刊登日期' prop='productdate' )
        el-table-column(label='是否生成訂單' prop='producttoorder' )
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
  label-width="100px"
  label-position='right'
  )
    el-form-item(label="會員ID")
      el-input(v-model="currentItem.vgtid")    
    el-form-item(label="遊戲分類" )
      el-input(v-model="currentItem.gamelist" )
    el-form-item(label="伺服器")
      el-input(v-model="currentItem.gameserver") 
    el-form-item(label="商品標題")
      el-input(v-model="currentItem.producttitle" ) 
    el-form-item(label="商品分類")
      el-input(v-model="currentItem.productclass")
    el-form-item(label="商品內容")
      el-input(v-model="currentItem.productdesc") 
    el-form-item(label="商品數量")
      el-input(v-model="currentItem.productquant")
    el-form-item(label="商品圖片")
      el-input(v-model="currentItem.productimg" type='file')
    el-form-item(label="價錢")
      el-input(v-model="currentItem.productprice") 
    el-form-item(label="是否生成訂單")
      el-input(v-model="currentItem.producttoorder") 
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
  name: "Product",
  setup() {
    const productList = ref([]);
    const dialogVisible = ref(false);
    const searchID = ref(undefined);
    const fetchPosts = async () => {
      await axios
        .get("http://localhost:3000/Vgt/vgtserver/product")
        .then((res) => {
          productList.value = _.chain(res.data).cloneDeep().value();
          productList.value.map((val) => {
            val.productdate = new Date(val.productdate).toLocaleDateString();
          });
        });
    };
    const formData = () => ({
      vgtid: undefined,
      productid: -1,
      gamelist: "",
      gameserver: "",
      producttitle: "",
      productclassname: "",
      perductdesc: "",
      perductquant: "",
      productimg: "",
      productprice: "",
      productdate: "",
      producttoorder: "",
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
    const okButton = async () => {
      if (currentItem.productid === -1) {
        await axios
          .post(
            "http://localhost:3000/Vgt/vgtserver/product",
            JSON.stringify(currentItem),
            { headers: { "Content-Type": "application/json" } }
          )
          .then((res) => {
            console.log(res);
          });
      } else {
        await axios
          .put(
            "http://localhost:3000/Vgt/vgtserver/product",
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
          `http://localhost:3000/Vgt/vgtserver/product/${scope.vgtid}`,
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
        return _.chain(productList.value)
          .filter((val) => {
            return val.gameserver.toLowerCase().includes(searchID.value.toLowerCase());
          })
          .value();
      } else {
        return productList.value;
      }
    
    });
    onMounted(() => {
      fetchPosts();
    });
    return {
      productList,
      fetchPosts,
      dialogVisible,
      handleOpen,
      currentItem,
      handleEdit,
      okButton,
      delButton,
      serching,
      searchID,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "view";
</style>
