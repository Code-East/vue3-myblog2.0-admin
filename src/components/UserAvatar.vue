<template>
  <el-dropdown>
    <div class="userinfo">
      <img :src="userpic" class="avater" />
      <span class="name">{{ username }}</span>
    </div>
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
//获取localStorage中的user信息
const userinfo = JSON.parse(localStorage.getItem("userinfo"));
//判断是否有头像 没有就是有默认头像
const userpic = userinfo.userpic
  ? userinfo.userpic
  : "http://lxoblog-image.test.upcdn.net/userpic/default.png";
const username = userinfo.username;

//点击退出登入
const outLogin = () => {
  store.clearData();
  localStorage.clear();
  router.replace("/login");
};
</script>


<style lang="scss" scoped>
.userinfo {
  display: flex;
  align-items: center;
  .avater {
    width: 50px;
    height: 50px;
    margin-right: 5px;
    border-radius: 50%;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.8);
  }
  .name {
    font-size: 18px;

    font-weight: bold;
  }
}
</style>