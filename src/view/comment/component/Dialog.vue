<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="评论内容"
      width="40%"
      top="50px"
      @close="dialogClose"
    >
      <el-scrollbar height="500px">
        <Comment :articleId="id"/>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Comment from 'components/comment.vue'

//props
const props = defineProps({
  dialogVisible: Boolean,
  articleId:Number
});
const id = ref();
watch(()=>props.articleId,(val)=>{
  id.value = val;
})
const emit = defineEmits(["dialogClose"]);
const dialogClose = () => {
  emit("dialogClose");
};
</script>


<style lang="scss" scoped>

</style>