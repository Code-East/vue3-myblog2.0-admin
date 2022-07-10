<template>
  <div class="pagination_box">
    <!-- v-model:currentPage=""
      v-model:page-size="" -->
    <el-pagination
      background
      layout="prev, pager, next, jumper"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :total="props.userTotal"
    />
  </div>
</template>

<script setup>
import { defineProps, ref, watch } from "vue";
const props = defineProps({
  userTotal: String,
});
const emit = defineEmits(["changePage"]);
const currentPage = ref(1);
const pageSize = ref(9);

watch(currentPage, (newval, oldval) => {
  emit("changePage", newval, pageSize.value);
});
</script>


<style scoped>
.pagination_box {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}
</style>