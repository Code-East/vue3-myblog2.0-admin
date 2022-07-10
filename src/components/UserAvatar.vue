<template>
  <el-dropdown>
    <img :src="circleUrl" class="avater" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="outLogin">退出登入</el-dropdown-item>
        <el-dropdown-item>待定</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "store";
const router = useRouter();
const store = useStore();
//判断是否有头像 没有就是有默认头像
const userpic = JSON.parse(localStorage.getItem("userinfo")).userpic
  ? JSON.parse(localStorage.getItem("userinfo")).userpic
  : "http://lxoblog-image.test.upcdn.net/userpic/%E5%A4%B4%E5%83%8F%20%E7%94%B7%E5%AD%A9.png";
const circleUrl = ref(userpic);
const outLogin = () => {
  store.clearData();
  localStorage.clear();
  router.replace("/login");
};
</script>


<style scoped>
.avater {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.8);
}
</style>