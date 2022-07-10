<template>
  <div>
    <el-dialog
      :model-value="props.dialogStatus"
      :title="props.dialogTitle"
      @close="dialogClose"
      top="5vh"
      width="40%"
    >
      <el-form
        :model="form"
        :rules="rules"
        :label-width="formLabelWidth"
        ref="fromRef"
      >
        <el-form-item label="用户头像" :label-width="formLabelWidth">
          <el-upload
            ref="uploadRef"
            class="avatar-uploader"
            accept="image/png, image/jpeg"
            :data="fileData"
            :show-file-list="false"
            :on-success="handleSuccess"
            :on-error="handleFormatError"
            :before-upload="beforeAvatarUpload"
            :disabled="isDisabled"
            action="http://v0.api.upyun.com/lxoblog-image.b0.aicdn.com"
            @click="uploadClick"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar_img" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="用户名"
          prop="username"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input v-model="replyPassword" type="password" show-password />
        </el-form-item>
        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
          prop="nickname"
        >
          <el-input v-model="form.nickname" />
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="管理员" :label-width="formLabelWidth">
          <el-switch
            v-model="form.isadmin"
            inline-prompt
            active-text="是"
            inactive-text="否"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogClose">取消</el-button>
          <el-button type="primary" @click="handleCommit">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { addUser } from "network/user";
import { upyunSignature } from "@/utils/uploadyun.js";
import { uploadSaveUrl } from "@/utils/variable.js";
import { rulesObj } from "@/utils/formRules.js";
const formLabelWidth = "80px";
//props
const props = defineProps({
  dialogStatus: Boolean,
  dialogTitle: String,
});
const emit = defineEmits(["closeDialog", "reviewUser"]);

//from对象
const form = reactive({
  userpic: "",
  username: "",
  password: "",
  nickname: "",
  email: "",
  isadmin: false,
});

let msg = "";
//关闭dialog方法 触发父函数
const dialogClose = () => {
  emit("closeDialog");
};

//文件上传
//是否禁止上传
const isDisabled = ref(false);
//文件参数 调用utils里面的参数获得
const fileData = upyunSignature("/userpic");
//服务器地址
const imageUrl = ref();
//点击上传
const uploadClick = () => {
  //判断是否上传过了
  if (isDisabled.value) {
    if (msg) {
      msgOne.close();
    }
    msg = ElMessage({
      type: "warning",
      message: "一次只能传一个头像哦！",
    });
  }
};
//上传成功
const handleSuccess = (res) => {
  console.log("上传成功", res);
  isDisabled.value = true;
  //拼接图片保存的地址
  imageUrl.value = uploadSaveUrl + res.url;
  form.userpic = imageUrl.value;
};
//上传失败
const handleFormatError = (file) => {
  msg = ElMessage({
    type: "error",
    message: "上传失败！",
  });
};

const replyPassword = ref("");
//表单验证规则
const rules = reactive(rulesObj);
//获取表单ref
const fromRef = ref(null);
//点击提交按钮的处理函数
const handleCommit = () => {
  fromRef.value.validate(async (valid) => {
    if (valid) {
      //判断两次密码是否相同
      if (replyPassword.value !== form.password) {
        if (msg) {
          msg.close();
        }
        msg = ElMessage({
          type: "error",
          message: "两次密码都能打错,赶紧确认一下！",
        });
        return;
      }
      //过滤是否是admin
      // form.isadmin = form.isadmin == true ? 1 : 0;
      const data = await addUser(form);
      msg = ElMessage({
        type: "success",
        message: "增加成功！",
      });
      //重新绚烂user列表
      emit("reviewUser");
      //关闭弹窗
      dialogClose();
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
.avatar_img {
  width: 101px;
  height: 101px;
  position: relative;
  top: -2px;
  left: -2px;
}
.avatar-uploader {
  width: 100px;
  height: 100px;
  display: block;
  border: 2px dashed #8c939d;
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
</style>