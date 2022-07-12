<template>
  <div class="header">
    <div class="card">
      <el-card class="box-card">
        <el-row :gutter="20" class="row">
          <el-col :span="6">
            <el-input
              placeholder="请输入用户名进行查询"
              v-model.trim="searchText"
              class="searchIpn"
              @keydown.enter="searchUserClick(1, 8)"
            ></el-input>
          </el-col>
          <el-col span="6">
            <el-button
              type="primary"
              :icon="Search"
              @click="searchUserClick(1, 8)"
              >搜索</el-button
            >
            <el-button type="primary" @click="clickAddUser">增加用户</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
  <div class="body">
    <Table
      :tableList="userData"
      :tableLabel="tableLabel"
      @deleteUser="clickDeteleUser"
      @editUser="clickEditUser"
      @ckeckUser="clickCheckUser"
    >
    </Table>
  </div>
  <div class="pagination">
    <pagination
      :userTotal="userCount"
      :changPage="currentPage"
      @changePage="pageChangMethod"
    />
  </div>
  <Dialog
    :dialogStatus="dialogVisible"
    :dialogTitle="title"
    :formData="formData"
    @closeDialog="dialogClose"
    @reviewUser="reviewList"
    v-if="dialogVisible"
  />
</template>

<script setup>
import { ref } from "vue";
import Table from "components/Table.vue";
import pagination from "components/pagination.vue";
import Dialog from "./component/Dialog.vue";
import { Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  getUserList,
  getUserCount,
  deleteUser,
  searchUser,
  getSingleUser,
} from "network/user";

//定义表单数据
let formData = ref();
//过滤表格数据函数
const filterData = (arr) => {
  arr.forEach((item) => {
    item.isadmin == 1 ? (item.isadmin = "是") : (item.isadmin = "否");
  });
  return arr;
};
//当前页面
let currentPage = ref(0);
//表格的列名
let tableLabel = ref("");
//用户总数
let userCount = ref("");
//用户的数据
let userData = ref("");
//获取用户列表和总数 将这个方法绑定到子组件分页里面
const getUserData = async (currentPage = 1, PageSize = 8) => {
  const data = await getUserList(currentPage, PageSize);
  //过滤是否是管理员 把过滤的数据传递给表格
  userData.value = filterData(data.data);
  //获取表格的列名
  tableLabel.value = [...Object.keys(userData.value[0])];
};
//获取用户总数
const getAllUserCount = async (text = "") => {
  const data = await getUserCount(text);
  userCount.value = data.data;
};
//调用获取用户方法
getUserData();
getAllUserCount();

//dialog的title
const title = ref("增加用户");
//dialog是否显示
const dialogVisible = ref(false);
//定义点击增加按钮的函数 显示dialog框
const clickAddUser = () => {
  dialogVisible.value = true;
  title.value = "增加用户";
};
//关闭dialog框
const dialogClose = () => {
  dialogVisible.value = false;
};

//重新的渲染列表
const reviewList = (page = 1, pageSize = 8) => {
  //判断是否是搜索状态
  if (searchText.value) {
    getUserData(page, pageSize);
    getAllUserCount(searchText.value);
  } else {
    getUserData(page, pageSize);
    getAllUserCount();
  }
};

//点击删除用户
const clickDeteleUser = (id) => {
  //询问用户
  ElMessageBox.confirm("确定要删除用户吗？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    const data = await deleteUser(id);
    ElMessage({
      type: "success",
      message: "删除成功",
    });

    currentPage.value = 1;
    //重新绚烂表单
    reviewList();
  });
};
//点击编辑用户
const clickEditUser = async (id) => {
  dialogVisible.value = true;
  title.value = "编辑用户";
  const res = await getSingleUser(id);
  formData.value = res.data;
};
//点击查看用户
const clickCheckUser = async (id) => {
  dialogVisible.value = true;
  title.value = "查看用户";
  const res = await getSingleUser(id);
  formData.value = res.data;
};

//搜索
const searchText = ref("");
//点击搜索
const searchUserClick = async (page, pageSize) => {
  const data = {
    searchText: searchText.value,
    page,
    pageSize,
  };
  const res = await searchUser(data);
  userData.value = filterData(res.data);
  getAllUserCount(searchText.value);
};

//分页变化
const pageChangMethod = (page, pageSize) => {
  currentPage.value = page;
  //重新绚烂表单
  reviewList(page, pageSize);
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