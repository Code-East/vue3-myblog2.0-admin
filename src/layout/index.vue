<template>
  <div class="common-layout">
    <el-container class="warp_container">
      <el-aside width="170px" class="aside">
        <Meun />
      </el-aside>
      <el-container class="container">
        <el-header class="header"><Header /></el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Meun from "components/Meun.vue";
import Header from "components/Header.vue";
import { tokenTime } from "network/index.js";
import { useRouter } from "vue-router";
const router = useRouter();
//定义判断token是否过期的请求 判断token是否过期 过期需要重新登入
const checkTokenTime = async () => {
  const data = await tokenTime();
  //  判断token是否过期 过期重新登入
  if (data.code == 400) {
    ElMessageBox.alert("诶,你的令牌呢,赶紧重新登入！", "登入失效", {
      confirmButtonText: "OK",
      callback: (action) => {
        localStorage.clear();
        router.replace("/login");
      },
    });
  }
};
checkTokenTime();
</script>


<style lang="scss" scoped>
.common-layout {
  min-width: 1200px;
  max-width: 1536px;
  height: 100vh;
}
.aside {
  height: 100vh;
  background-color: #34495e;
}
</style>