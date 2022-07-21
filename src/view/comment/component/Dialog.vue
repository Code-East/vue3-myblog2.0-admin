<template>
  <div>
    <el-dialog
      :model-value="props.dialogStatus"
      title="评论内容"
      @close="dialogClose"
      width="40%"
      top="50px"
    >
      <el-scrollbar height="500px">
        <div class="comment">
          <h3>
            来自<span class="user">{{ form.comment.comment_user }}</span>
            评论文章id为<span class="id">{{ form.comment.article_id }}</span>
            内容为：
          </h3>
          <span></span>
          <div class="context">
            {{ form.comment.content }}
          </div>
        </div>
        <div class="reply" v-if="form.reply_comment">
          <h3>回复该评论的内容:</h3>
          <ul>
            <li v-for="item in form.reply_comment" :key="item.reply_id">
              {{ item.content }}
            </li>
          </ul>
        </div>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

//props
const props = defineProps({
  dialogStatus: Boolean,
  formData: Object,
});

const emit = defineEmits(["closeDialog"]);

//from对象
let form = ref({
  comment: "",
  reply_comment: [],
});
//监视传递过来的表单
watch(
  () => props.formData,
  (newval) => {
    form.value = newval;
  },
  { deep: true }
);

//关闭dialog方法 触发父函数
const dialogClose = () => {
  emit("closeDialog");
};
</script>


<style lang="scss" scoped>
.user,
.id {
  color: #e74c3c;
  padding: 0 3px;
}
.context,
.reply > ul > li {
  margin-top: 10px;
  background-color: #2c3e50;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  padding: 10px;
}
</style>