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
      :tableColumns="tableColumns"
      :currentProp="id"
      @delete="clickDeteleUser"
      @edit="clickEditUser"
      @ckeck="clickCheckUser"
    >
    </Table>
  </div>
  <div class="pagination">
    <pagination
      :total="userCount"
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
import { reactive, ref } from "vue";
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

//当前的id为哪个id
const id = ref("user_id");
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
let currentPage = ref(1);
//表格结构
let tableColumns = reactive([
  {
    label: "用户名",
    prop: "username",
  },
  {
    label: "昵称",
    prop: "nickname",
  },
  {
    label: "邮箱",
    prop: "email",
  },
  {
    label: "管理员",
    prop: "isadmin",
  },
]);
//用户总数
let userCount = ref("");
//用户的数据
let userData = ref("");
//获取用户列表和总数 将这个方法绑定到子组件分页里面
const getUserData = async (currentPage = 1, PageSize = 8) => {
  const data = await getUserList(currentPage, PageSize);
  //过滤是否是管理员 把过滤的数据传递给表格
  userData.value = filterData(data.data);
};
//获取用户总数
const getAllUserCount = async (text = "") => {
  const data = await getUserCount(text);
  userCount.value = data.data;
};
//搜索用户
const searchUsers = async (page = 1, pageSize = 8) => {
  const data = {
    searchText: searchText.value,
    page,
    pageSize,
  };
  const res = await searchUser(data);
  userData.value = filterData(res.data);
  getAllUserCount(searchText.value);
};
//调用获取用户方法
getUserData();
getAllUserCount();

//搜索
const searchText = ref("");
//点击搜索
const searchUserClick = async () => {
  reviewList();
};

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

//重新获取数据
const anewGetUserData = (page = 1, pageSize = 8) => {
  //判断是否是搜索状态
  if (searchText.value) {
    searchUsers(page, pageSize);
    getAllUserCount(searchText.value);
  } else {
    getUserData(page, pageSize);
    getAllUserCount();
  }
};
//重新的渲染列表
const reviewList = () => {
  //传递单签页面 不跳动页面
  anewGetUserData(currentPage.value);
};

//点击表单中删除用户
const clickDeteleUser = (id) => {
  //询问用户
  ElMessageBox.confirm("确定要删除用户吗？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    //删除用户
    await deleteUser(id);
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    //重新绚烂表单
    reviewList();
  });
};
//点击表单中的编辑用户
const clickEditUser = async (id) => {
  dialogVisible.value = true;
  title.value = "编辑用户";
  const res = await getSingleUser(id);
  formData.value = res.data;
};
//点击表单中查看用户
const clickCheckUser = async (id) => {
  dialogVisible.value = true;
  title.value = "查看用户";
  const res = await getSingleUser(id);
  formData.value = res.data;
};

//分页变化
const pageChangMethod = (page, pageSize) => {
  currentPage.value = page;
  //重新绚烂表单
  anewGetUserData(page, pageSize);
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