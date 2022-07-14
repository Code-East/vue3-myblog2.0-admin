<template>
  <div class="header">
    <div class="card">
      <el-card class="box-card">
        <el-row :gutter="20" class="row">
          <el-col :span="6">
            <el-input
              placeholder="请输入标签名进行查询"
              v-model.trim="searchText"
              class="searchIpn"
              @keydown.enter="searchtagClick()"
            ></el-input>
          </el-col>
          <el-col span="6">
            <el-button type="primary" :icon="Search" @click="searchtagClick()"
              >搜索</el-button
            >
            <el-button type="primary" @click="clickAddtag">增加标签</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
  <div class="body">
    <Table
      :tableList="tagData"
      :tableColumns="tableColumns"
      @deletetag="clickDeteletag"
      :currentProp="currentID"
      @delete="clickDetele"
      @edit="clickEdit"
      @ckeck="clickCheck"
    >
    </Table>
  </div>
  <div class="pagination">
    <pagination
      :total="tagCount"
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
    @review="reviewList"
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
  getTags,
  getTagCount,
  searchTag,
  deleteTag,
  getSingleTag,
} from "network/tag.js";

//当前的id属性
const currentID = "tag_id";
//formData传递数据
let formData = ref("");
//当前页面
let currentPage = ref(1);
//表格结构
let tableColumns = reactive([
  {
    label: "id",
    prop: "tag_id",
  },
  {
    label: "标签名",
    prop: "tag_name",
  },
  {
    label: "创建时间",
    prop: "create_time",
  },
]);
//标签总数
let tagCount = ref("");
//标签的数据
let tagData = ref("");
//获取标签列表和总数 将这个方法绑定到子组件分页里面
const gettagData = async (currentPage = 1, PageSize = 8) => {
  const res = await getTags(currentPage, PageSize);
  tagData.value = res.data;
};
//获取标签总数
const getAlltag = async (text = "") => {
  const data = await getTagCount(text);
  tagCount.value = data.data;
};
//搜索标签
const searchtags = async (page = 1, pageSize = 8) => {
  const data = {
    searchText: searchText.value,
    page,
    pageSize,
  };
  const res = await searchTag(data);
  tagData.value = res.data;
  getAlltag(searchText.value);
};

//调用获取标签方法
gettagData();
getAlltag();

//搜索
const searchText = ref("");
//点击搜索
const searchtagClick = async () => {
  reviewList();
};

//dialog的title
const title = ref("增加标签");
//dialog是否显示
const dialogVisible = ref(false);

//定义点击增加按钮的函数 显示dialog框
const clickAddtag = () => {
  dialogVisible.value = true;
  title.value = "增加标签";
};
//关闭dialog框
const dialogClose = () => {
  dialogVisible.value = false;
};

//重新获取数据
const anewGettagData = (page = 1, pageSize = 8) => {
  //判断是否是搜索状态
  if (searchText.value) {
    console.log("hello", searchText.value);
    searchtags(page, pageSize);
    getAlltag(searchText.value);
  } else {
    gettagData(page, pageSize);
    getAlltag();
  }
};

//重新的渲染列表
const reviewList = () => {
  //传递当前的页码 让页面不跳动
  anewGettagData(currentPage.value);
};

//点击表单中删除标签
const clickDetele = (id) => {
  //询问用户
  ElMessageBox.confirm("确定要删除标签吗？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    //删除标签
    await deleteTag(id);
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    //重新绚烂表单
    reviewList();
  });
};
//点击表单中的编辑标签
const clickEdit = async (id) => {
  dialogVisible.value = true;
  title.value = "编辑标签";
  const res = await getSingleTag(id);
  formData.value = res.data;
};
//点击表单中查看标签
const clickCheck = async (id) => {
  dialogVisible.value = true;
  title.value = "查看标签";
  const res = await getSingleTag(id);
  formData.value = res.data;
};

//分页变化
const pageChangMethod = (page, pageSize) => {
  currentPage.value = page;
  //重新绚烂表单
  anewGettagData(page, pageSize);
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