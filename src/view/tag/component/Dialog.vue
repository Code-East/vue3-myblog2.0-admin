<template>
  <div>
    <el-dialog
      :model-value="props.dialogStatus"
      :title="props.dialogTitle"
      @close="dialogClose"
      width="40%"
    >
      <el-form
        :label-width="formLabelWidth"
        :model="form"
        @keydown.enter="keyEnter"
      >
        <el-form-item label="标签名称" :label-width="formLabelWidth">
          <el-input
            v-model.trim="form.tag_name"
            :disabled="isDisabled"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.create_time"
            type="datetime"
            placeholder="选择日期"
            :disabled="isDisabled"
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
import { addTag, setTag } from "network/tag";

const formLabelWidth = "80px";
let isDisabled = ref(false);

//是否为查看
let isCheck = ref(false);

//props
const props = defineProps({
  dialogStatus: Boolean,
  dialogTitle: String,
  formData: Object,
});

const emit = defineEmits(["closeDialog", "review"]);

const addSubmit = ref(false);
const editSubmit = ref(false);
if (props.dialogTitle == "增加标签") {
  addSubmit.value = true;
  editSubmit.value = false;
} else if (props.dialogTitle == "编辑标签") {
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
  tag_name: "",
  create_time: "",
});
//监视传递过来的表单
watch(
  () => props.formData,
  (newval) => {
    form.value = newval;
  },
  { deep: true }
);

let msg = "";
//关闭dialog方法 触发父函数
const dialogClose = () => {
  emit("closeDialog");
};

// //点击增加按钮的处理函数
const handleAddCommit = async () => {
  //判断是否填写了内容
  if (form.value.tag_name && form.value.create_time) {
    const data = {
      tag_name: form.value.tag_name,
      create_time: form.value.create_time,
    };
    await addTag(data);
    msg = ElMessage({
      type: "success",
      message: "增加成功！",
    });
    //重新绚烂tag列表
    emit("review");
    //关闭弹窗
    dialogClose();
  } else {
    if (msg) {
      msg.close();
    }
    msg = ElMessage({
      type: "warning",
      message: "请填写内容进行修改！",
    });
  }
};
// //点击编辑发送编辑请求
const handleEditCommit = async () => {
  if (form.value.tag_name && form.value.create_time) {
    await setTag(form.value);
    msg = ElMessage({
      type: "success",
      message: "修改成功！",
    });
    //重新绚烂tag列表
    emit("review");
    //关闭dialog弹窗
    dialogClose();
  } else {
    if (msg) {
      msg.close();
    }
    msg = ElMessage({
      type: "warning",
      message: "请将内容填写完整！",
    });
  }
};

//按回车
const keyEnter = () => {
  console.log("key");
  if (props.dialogTitle == "增加标签") {
    handleAddCommit();
  } else if (props.dialogTitle == "编辑标签") {
    handleEditCommit();
  }
};
</script>


<style lang="scss" scoped>
</style>