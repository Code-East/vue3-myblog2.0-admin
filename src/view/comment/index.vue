<template>
  <div class="header">
    <div class="card">
      <el-card class="box-card">
        <el-row :gutter="20" class="row">
          <el-col :span="6">
            <el-input
              placeholder="请输入评论用户进行查询"
              v-model.trim="searchText"
              class="searchIpn"
              @keydown.enter="searchCommentClick()"
            ></el-input>
          </el-col>
          <el-col span="6">
            <el-button
              type="primary"
              :icon="Search"
              @click="searchCommentClick()"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
  <div class="body">
    <el-table
      :data="commentData"
      stripe
      style="width: 100%"
      @row-click="rowClick"
    >
      <el-table-column type="index" width="100" label="序号" />
      <el-table-column prop="comment_user" label="评论人" />
      <el-table-column prop="create_time" label="评论时间" />
      <el-table-column prop="article_id" label="评论的文章id" />
      <el-table-column label="操作" width="260px">
        <el-button type="info" @click="checkClick">查看</el-button>
        <el-button type="danger" @click="clickDetele">删除</el-button>
      </el-table-column>
    </el-table>
  </div>

  <div class="pagination">
    <pagination
      :total="commentCount"
      :changPage="currentPage"
      @changePage="pageChangMethod"
    />
  </div>
  <Dialog
    :dialogStatus="dialogVisible"
    :formData="formData"
    v-if="dialogVisible"
    @closeDialog="dialogClose"
    @review="reviewList"
  />
</template>

<script setup>
import { reactive, ref } from "vue";
// import pagination from "components/pagination.vue";
import Dialog from "./component/Dialog.vue";
// import { Search } from "@element-plus/icons-vue";
// import { ElMessage, ElMessageBox } from "element-plus";
import {
  getComments,
  getCommentCount,
  searchComment,
  deleteComment,
  getSingleComment,
  getReplyComment,
} from "network/comment.js";

const id = ref();
//formData传递数据
let formData = ref({
  comment: "",
  reply_comment: [],
});
//当前页面
let currentPage = ref(1);

//评论总数
let commentCount = ref("");
//评论的数据
let commentData = ref("");
//获取评论列表和总数 将这个方法绑定到子组件分页里面
const getCommentData = async (currentPage = 1, PageSize = 8) => {
  const res = await getComments(currentPage, PageSize);
  commentData.value = res.data;
};
//获取评论总数
const getAllComment = async (text = "") => {
  const res = await getCommentCount(text);
  commentCount.value = res.data;
};
// //搜索评论
const searchComments = async (page = 1, pageSize = 8) => {
  const data = {
    searchText: searchText.value,
    page,
    pageSize,
  };
  const res = await searchComment(data);
  console.log(res);
  commentData.value = res.data;
  getAllComment(searchText.value);
};

//调用获取评论方法
getCommentData();
getAllComment();

//搜索
const searchText = ref("");
//点击搜索
const searchCommentClick = async () => {
  reviewList();
};

// //dialog是否显示
const dialogVisible = ref(false);

// //关闭dialog框
const dialogClose = () => {
  dialogVisible.value = false;
};

// //重新获取数据
const anewGetcommentData = (page = 1, pageSize = 8) => {
  //判断是否是搜索状态
  if (searchText.value) {
    searchComments(page, pageSize);
    getAllComment(searchText.value);
  } else {
    getCommentData(page, pageSize);
    getAllComment();
  }
};

//重新的渲染列表
const reviewList = () => {
  //传递当前的页码 让页面不跳动
  anewGetcommentData(currentPage.value);
};

//点击表格
const rowClick = (row) => {
  id.value = row.comment_id;
};

// //点击表单中删除评论
const clickDetele = () => {
  //询问用户
  ElMessageBox.confirm("确定要删除评论吗？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    //删除评论
    await deleteComment(id.value);
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    //重新绚烂表单
    reviewList();
  });
};
//点击表单中查看评论
const checkClick = () => {
  setTimeout(async () => {
    dialogVisible.value = true;
    const res = await getSingleComment(id.value);
    const data = await getReplyComment(id.value);
    formData.value.comment = res.data;
    formData.value.reply_comment = data.data;
  });
  //
  // formData.value = res.data;
};

// //分页变化
const pageChangMethod = (page, pageSize) => {
  currentPage.value = page;
  //重新绚烂表单
  anewGetcommentData(page, pageSize);
};
</script>


<style scoped>
</style>