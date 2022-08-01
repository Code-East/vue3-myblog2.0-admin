<template>
  <div class="add_article">
    <el-form
      ref="ruleFormRef"
      :model="article"
      :rules="rules"
      label-width="120px"
      class="form"
      size="default"
      status-icon
      @keydown.enter="submitForm"
    >
      <el-form-item label="文章标题">
        <el-input v-model="article.article_form.title" :disabled="isCheck" />
      </el-form-item>

      <el-form-item label="作者">
        <el-input v-model="article.article_form.author" disabled />
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="article.article_form.created_time"
          type="datetime"
          placeholder="选择时间"
          :disabled="isCheck"
        />
      </el-form-item>
      <el-form-item label="分类">
        <el-select
          v-model="article.article_form.category"
          clearable
          placeholder="Select"
          :disabled="isCheck"
        >
          <el-option
            v-for="item in categoryList"
            :key="item.category_id"
            :label="item.category_name"
            :value="item.category_id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标签" prop="tag">
        <el-select
          v-model="article.tag"
          multiple
          clearable
          placeholder="Select"
          style="width: 240px"
          class="tag_class"
          :disabled="isCheck"
        >
          <el-option
            v-for="item in tagList"
            :key="item.tag_id"
            :label="item.tag_name"
            :value="item.tag_id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="文章状态">
        <el-switch
          v-model="article.article_form.status"
          inline-prompt
          active-text="发布"
          inactive-text="未发布"
          size="large"
          :disabled="isCheck"
        />
      </el-form-item>
      <el-form-item label="文章图片">
        <el-upload
          class="upload-demo"
          ref="uploadRef"
          :on-success="handleSuccess"
          :on-error="handleFormatError"
          :action="uploadAction"
          :data="fileData"
          :limit="1"
          :disabled="isCheck"
        >
          <el-button type="primary">点击上传图片</el-button>
          <img
            v-if="article.article_form.article_img"
            :src="article.article_form.article_img"
            class="article_img"
            alt="文章图片"
          />
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-button type="primary" @click="detail_click" v-if="!isCheck"
          >点击编辑内容</el-button
        >
        <el-button type="primary" @click="check_click" v-else
          >点击查看内容</el-button
        >
      </el-form-item>
      <el-form-item label="文章描述">
        <el-input
          class="textarea"
          v-model="article.article_form.article_summary"
          type="textarea"
          clearable
          resize="none"
          :disabled="isCheck"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm" size="large">取消</el-button>
        <el-button
          type="primary"
          @click="submitForm"
          v-if="!isCheck"
          size="large"
          >编辑</el-button
        >
      </el-form-item>
    </el-form>
  </div>
  <Dialog
    :dialogVisible="visible"
    :detailContent="article.article_detail"
    :previewOnly="preview"
    @closeDialog="close_dialog"
    @saveContext="save_dialog"
  />
</template>

<script setup>
import { reactive, ref } from "vue";
import { getAllCategorys } from "network/category";
import { getAllTags } from "network/tag";
import { getSingleArticle, setArticle } from "network/article";
import { upyunSignature } from "@/utils/uploadyun.js";
import { uploadAction, uploadSaveUrl } from "@/utils/variable.js";
import Dialog from "./component/Dialog.vue";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
let visible = ref(false);
let msg;
//表单ref
const ruleFormRef = ref(null);
const uploadRef = ref(null);
const article = reactive({
  article_form: {
    title: "",
    author: JSON.parse(localStorage.getItem("userinfo")).username,
    created_time: "",
    article_img: "",
    status: true,
    article_summary: "",
    category: "",
  },
  article_detail: {
    content_md: "",
    content_html: "",
  },
  tag: [],
});
//定义分类列表
const categoryList = ref([]);
//定义标签列表
const tagList = ref([]);

//定义禁用
const isCheck = ref(false);
const preview = ref(false);
//获取单个文章详情页
const getArticleDetail = async () => {
  //获取路由传递过来的文章id
  const { id, type } = route.query;
  if (type == "查看") {
    isCheck.value = true;
    preview.value = true;
  }
  const res = await getSingleArticle(id);
  const data = res.data;
  //替换所有表单中的内容
  article.article_form = data.article_form;
  article.article_detail = data.article_detail;
  for (const i in data.tag) {
    article.tag.push(data.tag[i].tag_id);
  }
  article.article_form.status = article.article_form.status == 0 ? false : true;
};
getArticleDetail();

//点击写文章
const detail_click = () => {
  visible.value = true;
};
const check_click = () => {
  visible.value = true;
};
const close_dialog = () => {
  visible.value = false;
};
const save_dialog = (md, html) => {
  article.article_detail.content_md = md;
  article.article_detail.content_html = html;
};

//获取所有类别和标签列表
const getList = async () => {
  //获取分类列表
  const res = await getAllCategorys();
  categoryList.value = res.data;
  const data = await getAllTags();
  tagList.value = data.data;
};
getList();

//传入地址 生成data属性值
const fileData = upyunSignature("/article");

//图片上传成功
const handleSuccess = (res) => {
  //上传成功后会返回文件地拼接文件地址
  article.article_form.article_img = uploadSaveUrl + res.url;
};
//图片上传失败
const handleFormatError = (file) => {
  ElMessage({
    type: "error",
    message: "上传失败！",
  });
};

//点击编辑
const submitForm = async () => {
  if (
    article.article_form.title != "" &&
    article.article_form.created_time != "" &&
    article.article_form.article_summary != "" &&
    article.article_form.category != "" &&
    article.tag.length >= 1
  ) {
    const res = await setArticle(article);
    if (res.code == 0) {
      ElMessage({
        message: "修改成功！",
        type: "success",
      });
      router.replace("article");
    }
  } else {
    if (msg) {
      msg.close();
    }
    msg = ElMessage({
      type: "warning",
      message: "请将内容填写完整哦！",
    });
  }
};
//点击取消
const resetForm = () => {
  router.back();
};
</script>


<style lang="scss" scoped>
.add_article {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  padding: 10px;
  .textarea {
    width: 600px;
  }
}
.tag_class {
  width: 600px !important ;
}
.article_img {
  width: 200px;
  height: 90px;
  margin-left: 10px;
}
.form {
  width: 50%;
}
::v-deep .el-upload-list {
  position: absolute;
  top: -10%;
  left: 25%;
}
</style>