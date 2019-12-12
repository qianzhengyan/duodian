<template>
  <div class="classify">
    <div class="list">
      <div class="left">
        <p
          v-for="(item,index) in leftList"
          :key="index"
          @click="changeIndex(index)"
          :class="currentIndex==index?'active':''"
        >{{item.title}}</p>
      </div>
      <div class="right">
        <!-- 右侧导航 -->
        <div class="nav" v-if="leftList[currentIndex] && leftList[currentIndex].children">
          <span
            @click="changeInd(index)"
            :class="index==ind?'active':''"
            v-for="(item,index) in leftList[currentIndex].children"
            :key="index"
          >{{item.name}}</span>
        </div>

        <!-- 图文混排列表 -->
        <Item v-for="(item,index) in rightList" :key="index" :item="item">
          <p slot='one'>购物车</p>
        </Item>

        <div class="empty" v-if="rightList&&rightList.length==0">暂时没有任何数据</div>
      </div>
    </div>
  </div>
</template>

<script>
//
import { classify, selectType } from "@/api/api.js";
import Item from "@/components/Item.vue";
export default {
  name:'classify',
  data() {
    return {
      leftList: [],
      currentIndex: 0,
      ind: 0,
      rightList: []
    };
  },
  components: {
    Item
  },
  async created() {
    let res = await classify();
    this.leftList = res.data.data;
    this.selectTypefn();
  },
  methods: {
    changeIndex(index) {// 点击左侧
      this.currentIndex = index;
      // console.log(this.leftList,'leftlist')
      this.ind = 0;
      this.selectTypefn()
    },
    changeInd(index) {//点击右侧
      this.ind = index;
      this.selectTypefn()
    },
    todetail(item) {// 跳详情
      this.$router.push({ path: "/detail", query: item });
    },
    async selectTypefn() {
      let type_id = this.leftList[this.currentIndex].id;
      let category_id = this.leftList[this.currentIndex].children.length>0&&this.leftList[this.currentIndex].children[this.ind].id;
      let list = await selectType({ type_id, category_id });
      this.rightList = list.data.data;
    }
  }
};
</script>

<style>
.classify {
  width: 100%;
  height: 100%;
}
.list {
  width: 100%;
  height: 100%;
  display: flex;
}
.left {
  flex: 3;
  height: 100%;
  text-align: center;
  background: #eee;
}
.left p {
  line-height: 35px;
  border-bottom: 1px solid #fff;
}
.left p.active {
  color: #fff;
  background: red;
}
.right {
  flex: 7;
}
.right .nav {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1px solid #ccc; */
}
.right span.active {
  color: lightseagreen;
}
.right dl {
  display: flex;
}
.right dl dt {
  flex: 3;
  margin-right: 10px;
  margin-bottom: 10px;
}
.right dl dd {
  flex: 7;
}
.empty{
  text-align:center;
  padding:30px 0;
}
</style>