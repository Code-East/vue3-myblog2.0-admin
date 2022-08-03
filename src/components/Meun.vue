<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#34495e"
    class="el-menu-vertical-demo"
    :default-active="nowPath"
    text-color="#fff"
    router
  >
    <template v-for="item in list" :key="item.id">
      <el-menu-item :index="item.path" @click="savePath(item.path)">
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getMeunList } from "network/index"

const route = useRoute();
const list = ref('');
//获取aside列表
const get_meun_list = async () => {
  const res = await getMeunList()
  list.value = res.data.list;
}
get_meun_list();

//保存当前点击的path 刷新页面就不会跳转了
let nowPath = ref(localStorage.getItem("nowPath"));
const savePath = (path) => {
  nowPath.value = path;
  localStorage.setItem("nowPath", path);
};
//使用watch监视route的变化
watch(
  route,
  () => {
    nowPath.value = route.fullPath;
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>


<style lang="scss" scoped>
</style>