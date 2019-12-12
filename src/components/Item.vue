<template>
  <div class="item">
    <div class="pic" @click="todetail(item)">
      <img v-lazy="item.cover" alt />
    </div>

    <div class="text">
      <h3>{{item.name}}</h3>
      <p>价格：{{item.price}}</p>

      <slot class="right" name="one">
        <p>*********</p>
      </slot>

      <slot name="two"></slot>
      <!-- <div v-if="type=='cart'" class="right">
                <button @click="addcart(item)">加入购物车</button>
            </div>

            <div class="right" v-if="type=='add'">
                <button>-</button>
                <button>3</button>
                <button>+</button>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", "type"],
  methods: {
    // 跳详情
    todetail(item) {
      this.$router.push({ path: "/detail", query: item });
    }
  }
};
</script>

<style scoped>
.list {
  width: 100%;
  height: 100%;
}
.item {
  width: 100%;
  /* height: 120px; */
  display: flex;
  position: relative;
  border-bottom: 1px solid #ccc;
}
.pic {
  flex: 3;
}
.pic img {
  width: 100%;
}
.text {
  flex: 7;
}
.right {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>