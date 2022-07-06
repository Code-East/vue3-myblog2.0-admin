<template>
  <div>
    <el-page-header :content="routename" @back="goBack" />
  </div>
</template>

<script setup>
import { watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

let routename = ref("");

watch(
  route,
  () => {
    routename.value = route.name;
    console.log(route.name);
  },
  { deep: true, immediate: true }
);

const goBack = () => {
  router.go(-1);
};
</script>


<style scoped>
</style>