<template>
  <div class="pagination_box">
    <!-- v-model:currentPage=""
      v-model:page-size="" -->
    <el-pagination
      background
      layout="prev, pager, next, jumper"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :total="props.total"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
const props = defineProps({
  total: String,
  changPage: Number,
});
const emit = defineEmits(["changePage"]);
const currentPage = ref(1);
const pageSize = ref(8);
//监听当前页变化绚烂不同页面的数据
watch(currentPage, (newval, oldval) => {
  emit("changePage", newval, pageSize.value);
});
//监听当前页面变化
watch(
  () => props.changPage,
  (newval) => {
    console.log("子主建props：", newval);
    currentPage.value = newval;
  }
);
</script>


<style scoped>
.pagination_box {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}
</style>