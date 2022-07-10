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
            ></el-input>
          </el-col>
          <el-col span="6">
            <el-button type="primary" :icon="Search">搜索</el-button>
            <el-button type="primary" @click="clickAddUser">增加用户</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
  <div class="body">
    <Table :tableList="userData" :tableLabel="tableLabel" />
  </div>
  <div class="pagination">
    <pagination :userTotal="userCount" @changePage="getUserData" />
  </div>
  <Dialog
    :dialogStatus="dialogVisible"
    @closeDialog="dialogClose"
    v-if="dialogVisible"
    :dialogTitle="title"
    @reviewUser="reviewList"
  />
</template>

<script setup>
import { reactive, ref } from "vue";
import Table from "components/Table.vue";
import pagination from "components/pagination.vue";
import Dialog from "./component/Dialog.vue";
import { getUserList, getUserCount } from "network/user";
import { Edit, Search } from "@element-plus/icons-vue";
//表格的列名
let tableLabel = ref("");
//用户总数
let userCount = ref("");
//用户的数据
let userData = ref("");
//获取用户列表和总数 将这个方法绑定到子组件分页里面
const getUserData = async (currentPage = 1, PageSize = 9) => {
  const data = await getUserList(currentPage, PageSize);
  userData.value = data.data;
  userData.value.forEach((item) => {
    item.isadmin == 1 ? (item.isadmin = "是") : (item.isadmin = "否");
  });
  //获取表格的列名
  tableLabel.value = [...Object.keys(data.data[0])];
};
//获取用户总数
const getAllUserCount = async () => {
  const data = await getUserCount();
  userCount.value = data.data;
};
//调用获取用户方法
getUserData(1, 9);
getAllUserCount();

//dialog的title
const title = ref("增加用户");
//dialog是否显示
const dialogVisible = ref(false);
//定义点击增加按钮的函数
const clickAddUser = () => {
  dialogVisible.value = true;
};
//传递给dialog修改dialog显示的函数
const dialogClose = () => {
  dialogVisible.value = false;
};
//重新的绚烂列表
const reviewList = () => {
  getUserData();
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