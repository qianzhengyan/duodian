<template>
  <div class="index">

      <div class="main">
        <keep-alive include="home,classify">
          <router-view></router-view>
        </keep-alive>
      </div>

      <div class="footer">
        <router-link v-for="(item,index) in list" :key="index" :to="item.path" tag="div">
          <p v-html="item.icon"></p>
          <p>{{item.title}}</p>
        </router-link>
      </div>
  </div>
</template>

<script>
import "../../fonts/iconfont.css"
export default {
  data(){
    return {
      list:[
        {
          path:"/index/home",
          icon:'<i class="icon iconfont icon-shouye"></i>',
          title:"首页"
        },
        {
          path:"/index/classify",
          icon:'<i class="icon iconfont icon-xinlangweibo11"></i>',
          title:"分类"
        },
        {
          path:"/index/cart",
          icon:'<i class="icon iconfont icon-gouwuche"></i>',
          title:"购物车"
        },{
          path:"/index/my",
          icon:'<i class="icon iconfont icon-wode"></i>',
          title:"我的"
        }
      ]
    }
  }
}
</script>

<style scoped>
.main{
  flex:1;
  /* overflow: hidden; */
  overflow: auto;
}
.footer{
  padding:10px 0;
  display:flex;
  border-top:1px solid #ccc;
}
.footer>div{
  flex:1;
  display:flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.router-link-active{
  color:red;
}
</style>