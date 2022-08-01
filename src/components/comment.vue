<template>
  <div id="comment">
    <div class="content">
      <div class="comment_bar">
        <h3>评论</h3>
        <div class="comment_list">
          <template v-if="!noComment">
            <div
              class="comment_item"
              v-for="item in comment_data"
              :key="item.comment_id"
            >
              <div class="parent_comment">
                <div class="comment_user">
                  <span class="name"
                    ><el-icon><Avatar /></el-icon
                    >{{ item.comment_nickname }}</span
                  >
                  <time>{{ item.create_time }}</time>
                </div>
                <p>{{ item.content }}</p>
                <a href="javascript:;" @click="deleteClick(item.comment_id)"
                  >删除</a
                >
              </div>
              <div class="child_comment" v-if="item.child">
                <div v-for="child_item in item.child" class="child_item">
                  <div class="comment_user">
                    <span class="name"
                      ><el-icon><Avatar /></el-icon
                      >{{ child_item.comment_nickname }}</span
                    >
                    <span class="reply">@{{ child_item.parent_name }}</span>
                    <time>{{ child_item.create_time }}</time>
                  </div>
                  <p>{{ child_item.content }}</p>
                  <a
                    href="javascript:;"
                    @click="deleteClick(child_item.comment_id)"
                    >删除</a
                  >
                </div>
              </div>
            </div>
          </template>
          <div v-if="noComment">暂无评论</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { getCommentList, deleteComment } from "@/network/comment";
import { filterComment } from "@/utils/filterComment";
import { ElMessage } from "element-plus";

const props = defineProps({
  articleId: Number,
});
const comment_data = ref([]);
//获取评论列表
const noComment = ref(true);
const get_comment_list = async (id) => {
  const res = await getCommentList(id);
  if (res.data.length >= 1) {
    noComment.value = false;
    comment_data.value = filterComment(res.data);
  }
};
watch(
  () => props.articleId,
  (val) => {
    get_comment_list(val);
  }
);

const deleteClick = async (id) => {
  const res = await deleteComment(id);
  if (res.code === 0) {
    ElMessage({
      type:'success',
      message:'删除成功！'
    })
    get_comment_list(props.articleId);
  }
};
</script>

<style lang="scss" scoped>
#comment {
  margin-top: 0.5rem;
  .content .comment_bar {
    width: 100%;
    border-top: 2px solid #00b5ad;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
    h3 {
      font-size: 20px;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.87);
      margin-left: 10px;
    }
  }
}
.comment_list {
  padding: 5px 5px;
  .parent_comment {
    padding: 0.1rem;
    .comment_user {
      display: flex;
      align-items: center;
      .name {
        font-size: 1.2em;
        margin-right: 0.1rem;
        display: flex;
        align-items: center;
      }
      time {
        color: gray;
      }
    }
    p {
      width: 100%;
      font-size: 1.1em;
      border-radius: 5px;
    }
  }
  .child_comment {
    padding: 0.1rem;
    padding-left: 0.6rem;
    border-left: 1px solid gray;
    .child_item {
      margin: 0.2rem 0;
    }
    .comment_user {
      display: flex;
      align-items: center;
      .name {
        font-size: 1.2em;
        margin-right: 0.1rem;
        display: flex;
        align-items: center;
      }
      .reply {
        font-size: 1.2em;
        color: #1abc9c;
        margin-right: 0.2rem;
      }
      time {
        color: gray;
      }
    }

    p {
      width: 100%;
      font-size: 1.1em;
      border-radius: 5px;
    }
  }
  & a {
    color: gray;
    &:hover {
      color: red;
    }
  }
}
</style>