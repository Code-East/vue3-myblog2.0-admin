<template>
  <div class="header">
    <div class="card">
      <el-card class="box-card">
        <el-row :gutter="20" class="row">
          <el-col :span="6">
            <el-input
              placeholder="请输入文章名进行查询"
              v-model.trim="searchText"
              class="searchIpn"
              @keydown.enter="searchArticle()"
            ></el-input>
          </el-col>
          <el-col span="6">
            <el-button type="primary" :icon="Search" @click="searchArticle()"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
  <div class="body">
    <el-table
      :data="articleData"
      stripe
      style="width: 100%"
      @row-click="rowClick"
    >
      <el-table-column type="index" width="100" label="序号" />
      <el-table-column prop="title" label="文章名" />
      <el-table-column prop="created_time" label="创建时间" />
      <el-table-column prop="article_id" label="评论的文章id" />
      <el-table-column label="操作" width="260px">
        <el-button type="primary" @click="checkClick">操作评论</el-button>
      </el-table-column>
    </el-table>
  </div>

  <div class="pagination">
    <pagination
      :total="articleCount"
      :changPage="currentPage"
      @changePage="pageChangMethod"
    />
  </div>
  <Dialog
    :dialogVisible="dialogVisible"
    :articleId="article_id"
    @dialogClose="closeDialog"
  />
</template>

<script setup>
import { ref } from "vue";
import { getArticles, getArticleCount, search } from "network/article.js";
import { Search } from "@element-plus/icons-vue";
import Dialog from "./component/Dialog.vue";

const searchText = ref("");
//当前页面
let currentPage = ref(1);
//文章总数
let articleCount = ref("");
//文章的数据
let articleData = ref("");
//获取文章列表和总数 将这个方法绑定到子组件分页里面
const getArticleData = async (currentPage = 1, PageSize = 8) => {
  if (searchText.value) {
    const data = {
      searchText: searchText.value,
      page: currentPage,
      pageSize: PageSize,
    };
    const res = await search(data);
    articleData.value = res.data;
  } else {
    const res = await getArticles(currentPage, PageSize);
    articleData.value = res.data;
  }
};
//获取文章总数
const getAllArticle = async (text = "") => {
  const data = await getArticleCount(text);
  articleCount.value = data.data;
};
getArticleData();
getAllArticle();

//搜索文章
const searchArticle = async (page = 1, pageSize = 8) => {
  const data = {
    searchText: searchText.value,
    page,
    pageSize,
  };
  const res = await search(data);
  articleData.value = res.data;
  getAllArticle(searchText.value);
};

//分页变化
const pageChangMethod = (page, pageSize) => {
  currentPage.value = page;
  //重新绚烂表单
  getArticleData(page, pageSize);
};

//dialog的显示
const dialogVisible = ref(false);
const checkClick = () => {
  dialogVisible.value = !dialogVisible.value;
};
const closeDialog = () => {
  dialogVisible.value = !dialogVisible.value;
};
//dialog中的文章
const article_id = ref("");
const rowClick = (row) => {
  article_id.value = row.article_id;
};
</script>


<style scoped>
</style>