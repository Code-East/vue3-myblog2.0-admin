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
const router = useRouter();
const circleUrl = ref(
  "https://img2.baidu.com/it/u=1994380678,3283034272&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
);
const outLogin = () => {
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