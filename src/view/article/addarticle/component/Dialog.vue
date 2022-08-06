<template>
  <div class="dialog">
    <el-dialog
      :model-value="props.dialogVisible"
      title="文章内容"
      top="30px"
      width="70%"
      @close="dialogClose"
    >
      <!-- :before-close="handleClose" -->
      <md-editor
        v-model="md_context"
        @onSave="save"
        :toolbarsExclude="toolbars"
        @onHtmlChanged="htmlChange"
      />
      <div class="bottom">
        <el-button type="primary" size="large" @click="dialogClose"
          >保存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
//导入markdown编辑器
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { ElMessage, ElMessageBox } from "element-plus";

const props = defineProps({
  dialogVisible: Boolean,
});
const emit = defineEmits(["closeDialog", "saveContext"]);
//排除编辑器的github选择
const toolbars = ["github"];
const md_context = ref("# 输入内容");
const html_context = ref("");

const htmlChange = (value) => {
  html_context.value = value;
};
//保存文章触发的钩子 val为md的内容
const save = (val) => {

};
//点击保存按钮触发的函数 保存内容到父组件
// const saveExit = () => {
//   emit("saveContext", md_context.value, html_context.value);
//   emit("closeDialog");
// };
const dialogClose = () => {
  emit("saveContext", md_context.value, html_context.value);
  emit("closeDialog");
};
</script>


<style scoped>
.bottom {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  /* float: right; */
}
</style>