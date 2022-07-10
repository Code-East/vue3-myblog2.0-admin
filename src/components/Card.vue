<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20" class="row">
        <el-col :span="6">
          <el-input
            :placeholder="props.defaultPlaceholder"
            v-model.trim="searchText"
            class="searchIpn"
          ></el-input>
        </el-col>
        <el-col span="6">
          <el-button type="primary" :icon="Search">搜索</el-button>
          <el-button type="primary" :icon="Edit" @click="addUser"
            >增加</el-button
          >
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { Edit, Search } from "@element-plus/icons-vue";
import { ref } from "vue";
const props = defineProps({
  defaultPlaceholder: String,
});
const searchText = ref("");
</script>


<style lang="scss" scoped>
.row {
  align-items: center;
}
.searchIpn {
  height: 100%;
}
</style>