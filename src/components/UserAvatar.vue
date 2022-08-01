<template>
  <div class="header_right">
    <el-dropdown>
      <div class="tip">
        <el-icon><Bell /></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in comment_data" :key="item.comment_id">
            <div>
              <span style="color:#3498db;font-weight:900">{{item.comment_nickname}}</span>
              <span>评论文章id为<span style="color:#d35400;font-weight:900">{{item.article_id}}</span>:</span>
              <span>{{item.content}}</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "store";
import { getNewComment } from "@/network/comment"

const router = useRouter();
const store = useStore();
//获取localStorage中的user信息
const userinfo = JSON.parse(localStorage.getItem("userinfo"));
//判断是否有头像 没有就是有默认头像
const userpic = userinfo.userpic
  ? userinfo.userpic
  : "@/assets/img.default.png";
const username = userinfo.username;

//点击退出登入
const outLogin = () => {
  store.clearData();
  localStorage.clear();
  router.replace("/login");
};

const comment_data = ref();
const get_new_comment = async ()=>{
  const res = await getNewComment();
  comment_data.value = res.data;
}
get_new_comment();
</script>


<style lang="scss" scoped>
.header_right {
  display: flex;
  align-items: center;
  .tip{
    font-size: 25px;
    margin-right: 30px;
    position: relative;
    &::after{
      content:'';
      position: absolute;
      top:0;
      right: 0;
      width: 5px;
      height: 5px;
      border-radius: 100%;
      background-color: red;
    }
  }
}

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