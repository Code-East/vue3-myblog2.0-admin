<template>
  <div class="perosnal">
    <el-form
      :model="form"
      :rules="rules"
      :label-width="formLabelWidth"
      ref="fromRef"
      @keydown.enter="keyEnter"
      class="form"
    >
      <el-form-item label="用户头像" :label-width="formLabelWidth">
        <el-upload
          ref="uploadRef"
          class="avatar-uploader"
          accept="image/png, image/jpeg, image/jpg"
          :data="fileData"
          :on-success="handleSuccess"
          :on-error="handleFormatError"
          :disabled="isCheck"
          :action="uploadYun"
          @click="uploadClick"
        >
          <img v-if="form.userpic" :src="form.userpic" class="avatar_img" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="用户名"
        prop="username"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.username" :disabled="isCheck" />
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input
          v-model="form.password"
          type="password"
          show-password
          :disabled="isCheck"
        />
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
        <el-input v-model="form.nickname" :disabled="isCheck" />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" :disabled="isCheck" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <div class="footer">
          <el-button type="primary" @click="clickEdit" v-if="isCheck"
            >编辑</el-button
          >
          <el-button type="primary" @click="handleEditCommit" v-if="!isCheck"
            >提交</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { setUser, getSingleUser } from "network/user";
import { upyunSignature } from "@/utils/uploadyun.js";
import { uploadSaveUrl, uploadAction } from "@/utils/variable.js";
import { rulesObj } from "@/utils/formRules.js";
const formLabelWidth = "80px";
//文件上传
const uploadRef = ref(null);
//文件参数 调用utils里面的参数获得
const fileData = upyunSignature("/userpic");
const uploadYun = ref(uploadAction);
let isCheck = ref(true);

//获取用户信息
const getUserInfo = async () => {
  //获取当前id值
  const id = JSON.parse(localStorage.getItem("userinfo")).user_id;
  const res = await getSingleUser(id);
  form.value = res.data;
};
getUserInfo();

//from对象
let form = ref({
  userpic: "",
  username: "",
  password: "",
  nickname: "",
  email: "",
  isadmin: false,
});

let msg = "";

//上传成功
const handleSuccess = (res) => {
  //修改图片地址
  form.value.userpic = uploadSaveUrl + res.url;
};
//上传失败
const handleFormatError = (file) => {
  msg = ElMessage({
    type: "error",
    message: "上传失败！",
  });
};
//表单验证规则
const rules = reactive(rulesObj);
//获取表单ref
const fromRef = ref(null);

//点击编辑按钮
const clickEdit = () => {
  isCheck.value = false;
};
//点击提交发送编辑请求
const handleEditCommit = async () => {
  fromRef.value.validate(async (valid) => {
    if (valid) {
      await setUser(form.value);
      msg = ElMessage({
        type: "success",
        message: "修改成功！",
      });
    } else {
      if (msg) {
        msg.close();
      }
      msg = ElMessage({
        type: "warning",
        message: "请按照要求填写！",
      });
    }
  });
};
</script>


<style lang="scss" scoped>
.perosnal {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  padding: 10px;
  .form {
    width: 50%;
  }
}

.avatar_img {
  width: 102px;
  height: 102px;
  position: relative;
  top: -3px;
  left: -3px;
  border-radius: 50%;
}
.avatar-uploader {
  width: 100px;
  height: 100px;
  display: block;
  border: 2px dashed #8c939d;
  border-radius: 50%;
  transition: 0.5s;
  &:hover {
    border: 2px dashed skyblue;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
::v-deep .el-upload-list {
  position: relative;
  top: -10%;
  left: 115%;
}
</style>