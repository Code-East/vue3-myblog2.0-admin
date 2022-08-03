<template>
  <div class="main">
    <div class="cade_row">
      <div
        id="cade"
        v-for="item in cardData"
        :key="item.background"
        :style="item.background"
      >
        <div class="cade-content">
          <h4>
            <span>{{ item.title }}</span>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
          </h4>
          <h2>{{ item.count }}</h2>
          <p>占总数的:{{ item.percent }}%</p>
          <img src="@/assets/img/circle.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="charts">
      <img
        src="http://lxoblog-image.test.upcdn.net/background/IMG_0797.JPG"
        alt="小图片"
      />
      <div id="mychart" style="width: 700px; height: 425px"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from "vue";
import {
  getAuthorArticle,
  getArticleLike,
  getComments,
  getallLike,
  getArticleCatrgory,
  getArticleCount
} from "network/index.js";
import { getCommentCount } from "network/comment.js";
import * as echarts from "echarts";
// 基于准备好的dom，初始化echarts实例
let myChart;
const cardData = reactive([
  {
    title: "文章总数",
    background: {
      background: "linear-gradient(to right, #ffbf96, #fe7096)",
    },
    count: 0,
    icon: "Document",
    percent: 0,
  },
  {
    title: "评论总数",
    background: {
      background: "linear-gradient(to right, #84d9d2, #07cdae)",
    },
    count: 0,
    icon: "ChatSquare",
    percent: 0,
  },
  {
    title: "喜欢总数",
    background: {
      background: "linear-gradient(to right, #90caf9, #047edf)",
    },
    count: 0,
    icon: "Star",
    percent: 0,
  },
]);
let chartsData = reactive([]);
//所有接口
const getData = async () => {
  const article = await getAuthorArticle();
  const comment = await getComments();
  const like = await getArticleLike();
  const allLike = await getallLike();
  const allArticle = await getArticleCount();
  const allComment = await getCommentCount();
  const articlePercent = ((article.data / allArticle.data)* 100).toFixed(2) ;
  const likePercent = ((comment.data / allComment.data)*100).toFixed(2);
  const commentPercent = ((comment.data / allComment.data)* 100).toFixed(2) ;
  cardData[0].count = article.data;
  cardData[0].percent = articlePercent;
  cardData[1].count = comment.data;
  cardData[1].percent = commentPercent;
  cardData[2].count = like.data;
  cardData[2].percent = likePercent;

  getArticleCatrgory().then((res) => {
    chartsData = res.data;
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "各分类的文章数据数",
          type: "pie",
          radius: ["40%", "70%"],
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: chartsData,
        },
      ],
    });
    //停止加载动画
    myChart.hideLoading();
  });
};
getData();

//一定要在onMounted中挂载echarts 这样才能获取dom树
onMounted(async () => {
  //在monunted中绑定盒子
  myChart = echarts.init(document.getElementById("mychart"));
  //显示加载动画
  myChart.showLoading();
});
</script>


<style lang="scss" scoped>
#cade {
  position: relative;
  width: 395px;
  height: 170px;
  border-radius: 6px;
  /* background: linear-gradient(to right, #ffbf96, #fe7096); */
  /* "linear-gradient(to right, #90caf9, #047edf 99%)"; */
  /* background: linear-gradient(to right, #84d9d2, #07cdae); */
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
}
#cade img {
  position: absolute;
  top: 0px;
  right: -1px;
  width: 142px;
  height: 170px;
}
#cade .cade-content {
  width: 75%;
}
#cade .cade-content h4 {
  width: 100%;
  margin: 0 auto;
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  font-family: "ubuntu-regular", sans-serif;
}
#cade .cade-content h4 i {
  font-size: 20px;
  font-weight: 700;
}
#cade .cade-content h2 {
  margin-top: 20px;
  color: #fff;
  font-size: 30px;
}
#cade .cade-content p {
  margin-top: 40px;
  color: #fff;
  font-weight: 700;
  font-family: "ubuntu-medium", sans-serif;
}
.cade_row {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.charts {
  margin-top: 25px;
  display: flex;
  img {
    width: 600px;
    height: 400px;
    border-radius: 6px;
  }
}
</style>