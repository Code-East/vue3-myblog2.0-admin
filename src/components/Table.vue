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
        v-for="(item, i) in tableColumns"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
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
  tableColumns: Array,
  currentProp: String,
});
const emit = defineEmits(["delete", "edit"]);
let id = ref("");
//点击表格行触发
const rowClick = (row) => {
  //传递当前表格中的id
  id.value = row[props.currentProp];
};
//点击删除
const deleteClick = () => {
  setTimeout(() => {
    emit("delete", id.value);
  });
};
//点击编辑
const editClick = () => {
  setTimeout(() => {
    emit("edit", id.value);
  });
};
//点击查看
const checkClick = () => {
  setTimeout(() => {
    emit("ckeck", id.value);
  });
};
</script>


<style lang="scss" scoped>
</style>