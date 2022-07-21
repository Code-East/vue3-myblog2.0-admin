<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#34495e"
    class="el-menu-vertical-demo"
    :default-active="nowPath"
    text-color="#fff"
    router
  >
    <template v-for="item in asideList" :key="item.id">
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

const route = useRoute();
const adminList = reactive([
  {
    id: 1,
    name: "首页",
    path: "/index",
    icon: "House",
  },
  {
    id: 2,
    name: "用户管理",
    path: "/user",
    icon: "User",
  },
  {
    id: 3,
    name: "文章管理",
    path: "/article",
    icon: "Document",
  },
  {
    id: 4,
    name: "类别管理",
    path: "/category",
    icon: "Paperclip",
  },
  {
    id: 5,
    name: "标签管理",
    path: "/tag",
    icon: "CollectionTag",
  },
  {
    id: 6,
    name: "评论管理",
    path: "/comment",
    icon: "ChatLineSquare",
  },
]);
const commonList = reactive([
  {
    id: 1,
    name: "首页",
    path: "/index",
    icon: "House",
  },
  {
    id: 2,
    name: "个人中心",
    path: "/personal",
    icon: "User",
  },
  {
    id: 3,
    name: "文章管理",
    path: "/article",
    icon: "Document",
  },
]);

const isadmin = JSON.parse(localStorage.getItem("userinfo")).isadmin;
//查看是否是admin用户从而选择性绚烂左侧列表
const asideList = isadmin == 1 ? adminList : commonList;
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