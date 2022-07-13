<template>
  <div class="header">
    <div class="card">
      <el-card class="box-card">
        <el-row :gutter="20" class="row">
          <el-col :span="6">
            <el-input
              placeholder="请输入分类名进行查询"
              v-model.trim="searchText"
              class="searchIpn"
              @keydown.enter="searchCategoryClick()"
            ></el-input>
          </el-col>
          <el-col span="6">
            <el-button
              type="primary"
              :icon="Search"
              @click="searchCategoryClick()"
              >搜索</el-button
            >
            <el-button type="primary" @click="clickAddCategory"
              >增加分类</el-button
            >
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
  <div class="body">
    <Table
      :tableList="categoryData"
      :tableColumns="tableColumns"
      @deletecategory="clickDeteleCategory"
      :currentProp="currentID"
      @delete="clickDetele"
      @edit="clickEdit"
      @ckeck="clickCheck"
    >
    </Table>
  </div>
  <div class="pagination">
    <pagination
      :total="categoryCount"
      :changPage="currentPage"
      @changePage="pageChangMethod"
    />
  </div>
  <Dialog
    :dialogStatus="dialogVisible"
    :dialogTitle="title"
    :formData="formData"
    v-if="dialogVisible"
    @closeDialog="dialogClose"
    @reviewCategory="reviewList"
  />
</template>

<script setup>
import { reactive, ref } from "vue";
import Table from "components/Table.vue";
import pagination from "components/pagination.vue";
import Dialog from "./component/Dialog.vue";
import { Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  getCategorys,
  getCategoryCount,
  searchCategory,
  deleteCategory,
  getSingleCategory,
} from "network/category.js";

//当前的id属性
const currentID = "category_id";
//formData传递数据
let formData = ref("");
//当前页面
let currentPage = ref(1);
//表格结构
let tableColumns = reactive([
  {
    label: "id",
    prop: "category_id",
  },
  {
    label: "分类名",
    prop: "category_name",
  },
  {
    label: "创建时间",
    prop: "create_time",
  },
]);
//类别总数
let categoryCount = ref("");
//类别的数据
let categoryData = ref("");
//获取类别列表和总数 将这个方法绑定到子组件分页里面
const getCategoryData = async (currentPage = 1, PageSize = 8) => {
  const res = await getCategorys(currentPage, PageSize);
  categoryData.value = res.data;
};
//获取类别总数
const getAllCategory = async (text = "") => {
  const data = await getCategoryCount(text);
  categoryCount.value = data.data;
};
//搜索类别
const searchCategorys = async (page = 1, pageSize = 8) => {
  const data = {
    searchText: searchText.value,
    page,
    pageSize,
  };
  const res = await searchCategory(data);
  categoryData.value = res.data;
  getAllCategory(searchText.value);
};

//调用获取类别方法
getCategoryData();
getAllCategory();

//搜索
const searchText = ref("");
//点击搜索
const searchCategoryClick = async () => {
  reviewList();
};

//dialog的title
const title = ref("增加类别");
//dialog是否显示
const dialogVisible = ref(false);

//定义点击增加按钮的函数 显示dialog框
const clickAddCategory = () => {
  dialogVisible.value = true;
  title.value = "增加类别";
};
//关闭dialog框
const dialogClose = () => {
  dialogVisible.value = false;
};

//重新获取数据
const anewGetCategoryData = (page = 1, pageSize = 8) => {
  //判断是否是搜索状态
  if (searchText.value) {
    console.log("hello", searchText.value);
    searchCategorys(page, pageSize);
    getAllCategory(searchText.value);
  } else {
    getCategoryData(page, pageSize);
    getAllCategory();
  }
};

//重新的渲染列表
const reviewList = () => {
  //传递当前的页码 让页面不跳动
  anewGetCategoryData(currentPage.value);
};

//点击表单中删除类别
const clickDetele = (id) => {
  //询问用户
  ElMessageBox.confirm("确定要删除类别吗？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    //删除类别
    await deleteCategory(id);
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    //重新绚烂表单
    reviewList();
  });
};
//点击表单中的编辑类别
const clickEdit = async (id) => {
  dialogVisible.value = true;
  title.value = "编辑类别";
  const res = await getSingleCategory(id);
  formData.value = res.data;
};
//点击表单中查看类别
const clickCheck = async (id) => {
  dialogVisible.value = true;
  title.value = "查看类别";
  const res = await getSingleCategory(id);
  formData.value = res.data;
};

//分页变化
const pageChangMethod = (page, pageSize) => {
  currentPage.value = page;
  //重新绚烂表单
  anewGetCategoryData(page, pageSize);
};
</script>


<style scoped>
.row {
  align-items: center;
}
.searchIpn {
  height: 100%;
}
</style>