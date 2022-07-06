<template>
  <div id="entrance" @keydown.enter="submitForm">
    <div class="main_box">
      <h1>登入</h1>
      <el-form ref="ruleFormRef" :model="form" class="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username">
            <template #prefix>
              <el-icon><Avatar /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="form.password"
            show-password
            class="psw_inp"
          >
            <template #prefix>
              <el-icon><Key /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="code">
          <el-input placeholder="请输入验证码" v-model="form.code">
            <template #prefix>
              <el-icon><MoreFilled /></el-icon>
            </template>
          </el-input>
          <span v-html="captchaSrc" @click="replyCaptcha"></span>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login_btn"
            type="primary"
            round
            size="large"
            @click="submitForm(ruleFormRef)"
          >
            登入
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "store";
import { useRouter } from "vue-router";
//导入登入方法
import { login, getCaptcha } from "network/login.js";

//使用store
const store = useStore();
//使用router和route
const router = useRouter();

//声明验证码
const captchaSrc = ref("");
//使用生命周期函数来发送axios请求验证码的svg图片
onMounted(async () => {
  const data = await getCaptcha();
  captchaSrc.value = data.data;
});
//点击验证码图片更换验证码
const replyCaptcha = async () => {
  const data = await getCaptcha();
  captchaSrc.value = data.data;
};

//表单对象
const form = reactive({
  username: "",
  password: "",
  code: "",
});
//表当验证规则
const rules = reactive({
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
  code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
});

//点击登入按钮发送登入请求
let msg;
const submitForm = async () => {
  if (form.username == "" || form.password == "" || form.code == "") {
    if (msg) {
      msg.close();
    }
    msg = ElMessage({
      message: "请将数据填写完整哦!",
      type: "warning",
    });
    return;
  }
  //发送登入请求
  const data = await login(form);

  //登入成功 将token和用户信息存入store
  store.$patch({
    userinfo: data.userinfo,
    token: data.token,
  });
  //将token和用户信息存入localStorage
  localStorage.setItem("token", data.token);
  localStorage.setItem("userinfo", JSON.stringify(data.userinfo));
  localStorage.setItem("nowPath", "/index");
  //跳转
  router.replace("/index");
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: myfont;
  src: url(@/assets/font/v8hrz-ivugt.ttf);
}
#entrance {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/img/background_img2.png");
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: myfont;
  .main_box {
    width: 8rem;
    height: 9rem;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
  }
}
.form {
  width: 90%;
  margin-top: 0.4rem;
  div {
    font-size: 0.3rem;
    margin-bottom: 0.4rem;
  }
  .psw_inp {
    width: 5rem;
    margin-left: 0.3rem;
  }
  .login_btn {
    width: 100%;
    font-weight: bold;
  }
  span:hover {
    cursor: pointer;
  }
}
::v-deep .el-form-item__error {
  margin-left: 0.28rem;
}
</style>