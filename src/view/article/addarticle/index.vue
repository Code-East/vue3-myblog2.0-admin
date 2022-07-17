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
      <el-form-item label="文章标题" prop="article_form.title">
        <el-input v-model="article.article_form.title" />
      </el-form-item>

      <el-form-item label="作者" prop="author">
        <el-input v-model="article.article_form.author" disabled />
      </el-form-item>
      <el-form-item label="创建时间" prop="article_form.created_time">
        <el-date-picker
          v-model="article.article_form.created_time"
          type="datetime"
          placeholder="选择时间"
        />
      </el-form-item>
      <el-form-item label="分类" prop="article_form.category">
        <el-select
          v-model="article.article_form.category"
          clearable
          placeholder="Select"
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
        >
          <el-button type="primary">点击上传图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-button type="primary" @click="detail_click">点击填写内容</el-button>
      </el-form-item>
      <el-form-item label="文章描述" prop="article_form.article_summary">
        <el-input
          class="textarea"
          v-model="article.article_form.article_summary"
          type="textarea"
          clearable
          resize="none"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="submitForm">增加</el-button>
      </el-form-item>
    </el-form>
  </div>
  <Dialog
    :dialogVisible="visible"
    @closeDialog="close_dialog"
    @saveContext="save_dialog"
  />
</template>

<script setup>
import { reactive, ref } from "vue";
import { getAllCategorys } from "network/category";
import { getAllTags } from "network/tag";
import { addArticle } from "network/article";
import { upyunSignature } from "@/utils/uploadyun.js";
import { uploadAction, uploadSaveUrl } from "@/utils/variable.js";
import Dialog from "./component/Dialog.vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
let visible = ref(false);
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
//表单校验规则
const rules = reactive({
  "article_form.title": [
    { required: true, message: "请输入文章标题", trigger: "blur" },
    {
      min: 2,
      max: 15,
      message: "标题的长度要在2到15个字符之前哦",
      trigger: "blur",
    },
  ],
  "article_form.author": [
    {
      required: true,
      message: "请输入作者",
      trigger: "blur",
    },
  ],
  "article_form.created_time": [
    {
      type: "date",
      required: true,
      message: "请选择创建的时间",
      trigger: "blur",
    },
  ],
  "article_form.category": [
    {
      required: true,
      message: "请选择文章的类别",
      trigger: "blur",
    },
  ],
  tag: [
    {
      required: true,
      message: "请选择文章的标签",
      trigger: "blur",
    },
  ],
  "article_form.article_summary": [
    {
      required: true,
      message: "请输入文章的简要描述",
      trigger: "blur",
    },
  ],
});
//定义分类列表
const categoryList = ref([]);
//定义标签列表
const tagList = ref([]);

//点击写文章
const detail_click = () => {
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

//点击增加
const submitForm = () => {
  ruleFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      //给定默认图片
      if (!article.article_form.article_img) {
        article.article_form.article_img =
          "http://lxoblog-image.test.upcdn.net/article/4eda65a13af1577e30d259f5da2dba76.png";
      }
      const res = await addArticle(article);
      console.log(res);
      if (res.code == 0) {
        ElMessage({
          message: "增加成功！",
          type: "success",
        });
        router.replace("article");
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
//点击重置
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
.form {
  width: 50%;
}
.tag_class {
  width: 600px !important ;
}
::v-deep .el-upload-list {
  position: absolute;
  top: -10%;
  left: 25%;
}
</style>