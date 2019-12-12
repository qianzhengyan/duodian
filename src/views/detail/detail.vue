<template>
  <div class="detail">
      <div class="header">详情页面</div>
      <!-- {{item}} -->
      <div class="item">

          <div class="pic">
            <img :src="item.cover" alt="">
          </div>
          
          <div class="text">
            <h3>{{item.name}}</h3>
            <p>价格：{{item.price}}</p>
          </div>
      </div>

      <button @click="addcart(item)">添加购物车</button>
  </div>
</template>

<script>
export default {
  computed:{
    item(){
      return this.$route.query
    }
  },
  methods:{
    addcart(item){
      this.$router.push({path:"/cart",query:item})
    }
  }
}
</script>

<style>
.header{
  padding:20px;
  text-align:center;
  /* display:flex;
  justify-content: space-between; 
  align-items: center; */
  background:orange;
}

.detail .item{
    width: 100%;
}
.detail .pic{
    width: 100%;
    height: 380px;
}
.detail .pic img{
    width: 100%;
}

</style>