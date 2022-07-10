<template>
  <div class="table">
    <el-table :data="tableList" stripe style="width: 100%">
      <!-- 循环创建表格 -->
      <el-table-column
        v-for="(item, i) in props.tableLabel"
        :key="item"
        :prop="item"
        :label="item"
      />
      <el-table-column label="operation">
        <el-button type="primary">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { defineProps, reactive } from "vue";
//获取props
const props = defineProps({
  tableList: Array,
  tableLabel: Object,
});
</script>


<style lang="scss" scoped>
</style>