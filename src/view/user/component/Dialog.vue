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
        @keydown.enter="keyEnter"
      >
        <el-form-item label="用户头像" :label-width="formLabelWidth">
          <el-upload
            ref="uploadRef"
            class="avatar-uploader"
            accept="image/png, image/jpeg, image/jpg"
            :data="fileData"
            :on-success="handleSuccess"
            :on-error="handleFormatError"
            :disabled="isDisabled"
            :action="uploadYun"
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
          <el-input v-model="form.username" :disabled="isCheck" />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.password"
            type="password"
            show-password
            :disabled="isCheck"
          />
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="password"
          :label-width="formLabelWidth"
          v-if="props.dialogTitle == '增加用户'"
        >
          <el-input v-model="replyPassword" type="password" show-password />
        </el-form-item>
        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
          prop="nickname"
        >
          <el-input v-model="form.nickname" :disabled="isCheck" />
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" :disabled="isCheck" />
        </el-form-item>
        <el-form-item label="管理员" :label-width="formLabelWidth">
          <el-switch
            v-model="form.isadmin"
            inline-prompt
            active-text="是"
            inactive-text="否"
            :disabled="isCheck"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogClose">取消</el-button>
          <el-button type="primary" @click="handleAddCommit" v-if="addSubmit"
            >增加</el-button
          >
          <el-button type="primary" @click="handleEditCommit" v-if="editSubmit"
            >编辑</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { addUser, setUser } from "network/user";
import { upyunSignature } from "@/utils/uploadyun.js";
import { uploadSaveUrl, uploadAction } from "@/utils/variable.js";
import { rulesObj } from "@/utils/formRules.js";
//文件上传
const uploadRef = ref(null);
//是否禁止上传
const isDisabled = ref(false);
//文件参数 调用utils里面的参数获得
const fileData = upyunSignature("/userpic");

const formLabelWidth = "80px";
const imageUrl = ref();
const uploadYun = ref(uploadAction);
let isCheck = ref(false);
//props
const props = defineProps({
  dialogStatus: Boolean,
  dialogTitle: String,
  formData: Object,
});
const emit = defineEmits(["closeDialog", "reviewUser"]);

const addSubmit = ref(false);
const editSubmit = ref(false);

if (props.dialogTitle == "增加用户") {
  addSubmit.value = true;
  editSubmit.value = false;
} else if (props.dialogTitle == "编辑用户") {
  editSubmit.value = true;
  addSubmit.value = false;
} else {
  isCheck.value = true;
  isDisabled.value = true;
  editSubmit.value = false;
  addSubmit.value = false;
}

//from对象
let form = ref({
  userpic: "",
  username: "",
  password: "",
  nickname: "",
  email: "",
  isadmin: false,
});
//监视传递过来的表单
watch(
  () => props.formData,
  (newval) => {
    form.value = newval;
    if (form.value.isadmin) {
      form.value.isadmin = true;
    }
    imageUrl.value = form.value.userpic;
  },
  { deep: true }
);

let msg = "";
//关闭dialog方法 触发父函数
const dialogClose = () => {
  emit("closeDialog");
};

//点击上传
const uploadClick = () => {
  if (props.dialogTitle == "查看用户") {
    //禁用文件上传
    if (msg) {
      msg.close();
    }
    msg = ElMessage({
      type: "warning",
      message: "只能看看，不能动哦！",
    });
    return "";
  }
  if (isDisabled.value) {
    //判断是否上传过了
    if (msg) {
      msg.close();
    }
    msg = ElMessage({
      type: "warning",
      message: "一次只能传一个头像哦！",
    });
  }
};
//上传成功
const handleSuccess = (res) => {
  isDisabled.value = true;
  //拼接图片保存的地址
  imageUrl.value = uploadSaveUrl + res.url;
  form.value.userpic = imageUrl.value;
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
//点击增加按钮的处理函数
const handleAddCommit = () => {
  fromRef.value.validate(async (valid) => {
    if (valid) {
      //判断两次密码是否相同
      if (replyPassword.value !== form.value.password) {
        if (msg) {
          msg.close();
        }
        msg = ElMessage({
          type: "error",
          message: "两次密码都能打错,赶紧确认一下！",
        });
        return;
      }
      //如果图片为空设为默认图片
      if (imageUrl.value == "") {
        form.value.userpic =
          "http://lxoblog-image.test.upcdn.net/userpic/default.png";
      }
      const data = await addUser(form.value);
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
//点击编辑发送编辑请求
const handleEditCommit = async () => {
  fromRef.value.validate(async (valid) => {
    if (valid) {
      await setUser(form.value);
      msg = ElMessage({
        type: "success",
        message: "修改成功！",
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
//按回车
const keyEnter = () => {
  if (props.dialogTitle == "增加用户") {
    handleAddCommit();
  } else if (props.dialogTitle == "编辑用户") {
    handleEditCommit();
  }
};
</script>


<style lang="scss" scoped>
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