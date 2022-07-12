<template>
  <div class="table">
    <el-table
      v-if="tableList"
      :data="tableList"
      @row-click="rowClick"
      stripe
      style="width: 100%"
    >
      <!-- 循环创建表格 -->
      <el-table-column
        v-for="(item, i) in tableLabel"
        :key="item"
        :prop="item"
        :label="item"
      />
      <!-- <el-table-column props="user_id" label="id"></el-table-column>
      <el-table-column props="username" label="用户名"></el-table-column>
      <el-table-column props="nickname" label="昵称"></el-table-column>
      <el-table-column props="email" label="邮箱"></el-table-column>
      <el-table-column props="isadmin" label="管理员"></el-table-column> -->
      <!-- <slot></slot> -->
      <el-table-column label="operation" width="260px">
        <el-button type="primary" @click="editClick">编辑</el-button>
        <el-button type="info" @click="checkClick">查看</el-button>
        <el-button type="danger" @click="deleteClick">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
//获取props
const props = defineProps({
  tableList: Array,
  tableLabel: Object,
});
const emit = defineEmits(["deleteUser", "editUser"]);
let userId = ref("");
//点击表格行触发
const rowClick = (row) => {
  userId.value = row.user_id;
};
//点击删除
const deleteClick = () => {
  setTimeout(() => {
    emit("deleteUser", userId.value);
  });
};
//点击编辑
const editClick = () => {
  setTimeout(() => {
    emit("editUser", userId.value);
  });
};
//点击查看
const checkClick = () => {
  setTimeout(() => {
    emit("ckeckUser", userId.value);
  });
};
</script>


<style lang="scss" scoped>
</style>