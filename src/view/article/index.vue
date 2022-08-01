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
              @keydown.enter="searchClick()"
            ></el-input>
          </el-col>
          <el-col span="6">
            <el-button type="primary" :icon="Search" @click="searchClick()"
              >搜索</el-button
            >
            <el-button type="primary" @click="clickAdd">增加文章</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
  <div class="body">
    <Table
      :tableList="articleData"
      :tableColumns="tableColumns"
      @deleteArticle="clickDeteletag"
      :currentProp="currentID"
      @delete="clickDetele"
      @edit="clickEdit"
      @ckeck="clickCheck"
    >
    </Table>
  </div>
  <div class="pagination">
    <pagination
      :total="articleCount"
      :changPage="currentPage"
      @changePage="pageChangMethod"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Table from "components/Table.vue";
import pagination from "components/pagination.vue";
import { Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  getArticles,
  getArticleCount,
  search,
  deleteArticle,
  getAuthorArticles,
  getAuthorArticleCount,
  searchAuthorArticle,
} from "network/article.js";
import { useRouter } from "vue-router";
const author = JSON.parse(localStorage.getItem("userinfo")).username;
const router = useRouter();
//过滤数据
const filterData = (arr) => {
  arr.forEach((item) => {
    item.status == 1 ? (item.status = "发布") : (item.status = "未发布");
  });
  return arr;
};
//当前的id属性
const currentID = "article_id";
//formData传递数据
let formData = ref("");
//当前页面
let currentPage = ref(1);
//表格结构
let tableColumns = reactive([
  {
    label: "文章名",
    prop: "title",
  },
  {
    label: "作者",
    prop: "author",
  },
  {
    label: "创建时间",
    prop: "created_time",
  },
  {
    label: "状态",
    prop: "status",
  },
]);
//文章总数
let articleCount = ref("");
//文章的数据
let articleData = ref("");
//获取文章列表和总数 将这个方法绑定到子组件分页里面
const getArticleData = async (currentPage = 1, PageSize = 8) => {
  const res = await getArticles(currentPage, PageSize);
  articleData.value = filterData(res.data);
};
//获取文章总数
const getAllArticle = async (text = "") => {
  const data = await getArticleCount(text);
  articleCount.value = data.data;
};

//获取非管理员文章列表
const getAuthorArticleData = async (currentPage = 1, PageSize = 8) => {
  const res = await getAuthorArticles(currentPage, PageSize, author);
  articleData.value = filterData(res.data);
};
//获取非管理员文章总数
const getAllAuthorArticle = async (text = "") => {
  const data = await getAuthorArticleCount(text, author);
  articleCount.value = data.data;
};
//搜索文章
const searchArticle = async (page = 1, pageSize = 8) => {
  const data = {
    searchText: searchText.value,
    page,
    pageSize,
  };
  const res = await search(data);
  articleData.value = filterData(res.data);
  getAllArticle(searchText.value);
};
//搜索作者文章
const searchAuthorPassage = async (page = 1, pageSize = 8) => {
  const data = {
    searchText: searchText.value,
    page,
    pageSize,
    author,
  };
  const res = await searchAuthorArticle(data);
  articleData.value = filterData(res.data);
  getAllArticle(searchText.value);
};

if (JSON.parse(localStorage.getItem("userinfo")).isadmin == 1) {
  //调用获取文章方法
  getArticleData();
  getAllArticle();
} else {
  getAuthorArticleData();
  getAllAuthorArticle();
}

//搜索
const searchText = ref("");
//点击搜索
const searchClick = async () => {
  reviewList();
};

//定义点击增加按钮的函数 显示dialog框
const clickAdd = () => {
  router.push("addarticle");
};

//重新获取数据
const anewgetArticleData = (page = 1, pageSize = 8) => {
  //判断是否是搜索状态
  if (JSON.parse(localStorage.getItem("userinfo")).isadmin == 1) {
    //调用获取文章方法
    if (searchText.value) {
      searchArticle(page, pageSize);
      getAllArticle(searchText.value);
    } else {
      getArticleData(page, pageSize);
      getAllArticle();
    }
  } else {
    if (searchText.value) {
      searchAuthorPassage(page, pageSize);
      getAllArticle(searchText.value);
    } else {
      getAuthorArticleData(page, pageSize);
      getAllAuthorArticle();
    }
  }
};

//重新的渲染列表
const reviewList = () => {
  //传递当前的页码 让页面不跳动
  anewgetArticleData(currentPage.value);
};

//点击表单中删除文章
const clickDetele = (id) => {
  //询问用户
  ElMessageBox.confirm("确定要删除文章吗？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    //删除文章
    await deleteArticle(id);
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    //重新绚烂表单
    reviewList();
  });
};
//点击表单中的编辑文章
const clickEdit = async (id) => {
  router.push({
    path: "editorcheck",
    query: {
      id,
      type: "编辑",
    },
  });
};
//点击表单中查看文章
const clickCheck = async (id) => {
  router.push({
    path: "editorcheck",
    query: {
      id,
      type: "查看",
    },
  });
};

//分页变化
const pageChangMethod = (page, pageSize) => {
  currentPage.value = page;
  //重新绚烂表单
  anewgetArticleData(page, pageSize);
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