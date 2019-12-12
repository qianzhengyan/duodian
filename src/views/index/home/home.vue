<template>
  <div class="home">

     <div class="header">校园超市</div>
    <!-- 轮播图 -->
    <div class="banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in swiperdata" :key="index">
            <img :src="item.image" alt />
          </div>
        </div>
      </div>
    </div>
    <!-- icon图标 -->
    <div class="icon">
      <div class="item" v-for="(item,index) in icondata" :key="index">
        <p v-html="item.icon"></p>
        <p>{{item.title}}</p>
      </div>
    </div>

  <!-- 上拉加载&&下拉刷新 -->
    <div class="scroll">
      <div class="list">
        <Item type="cart" 
        v-for="(item,index) in scrolldata" 
        :key="index" 
        :item="item">
        <!-- 插槽 -->
        <!-- <template v-slot:one> -->
          <p slot="one" class="addcart" @click="clickAddCart(item)">加入购物车</p>
        <!-- </template> -->

        <!-- <template v-slot:two>
          <p>
            <span>-</span>
            <span>6</span>
            <span>+</span>
          </p>
        </template> -->
        
        </Item>
        <div class="last" v-if="show">---------我是有底线的------------</div>
      </div>
      </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.css";
import BScroll from "better-scroll";
import Item from "@/components/Item.vue"
import { banner , scroll ,addCar , getUserInfo} from "@/api/api.js";
export default {
  name:'home',
  data() {
    return {
      swiperdata: [
        // {
        //     "img":"http://img5.imgtn.bdimg.com/it/u=1889994696,2819912553&fm=26&gp=0.jpg"
        // },
        // {
        //     "img":"http://img0.imgtn.bdimg.com/it/u=3259743036,1403806894&fm=26&gp=0.jpg"
        // },
        // {
        //     "img":"http://img2.imgtn.bdimg.com/it/u=3731702878,4231678730&fm=15&gp=0.jpg"
        // },
        // {
        //     "img":"http://img2.imgtn.bdimg.com/it/u=2109713255,2979226723&fm=26&gp=0.jpg"
        // },
        // {
        //     "img":"http://img4.imgtn.bdimg.com/it/u=2607645345,1959473723&fm=15&gp=0.jpg"
        // }
      ],
      icondata: [
        {
          icon: "<span>狂</span>",
          title: "蔬菜每日鲜"
        },
        {
          icon: "<span>欢</span>",
          title: "肉蛋禽"
        },
        {
          icon: "<span>倒</span>",
          title: "母婴天地"
        },
        {
          icon: "<span>计</span>",
          title: "进店必买"
        },
        {
          icon: "<span>时</span>",
          title: "美通卡"
        },
        {
          icon: "<span>超</span>",
          title: "早晚市"
        },
        {
          icon: "<span>值</span>",
          title: "品牌惠"
        },
        {
          icon: "<span>不</span>",
          title: "领劵中心"
        },
        {
          icon: "<span>停</span>",
          title: "支付优惠"
        },
        {
          icon: "<span>歇</span>",
          title: "直采品牌"
        }
      ],
      scrolldata:[],
      page:0,
      limit:10,
      show:false
    };
  },
  components:{
    Item
  },
  created() {
    this.banner();
  },
  methods: {// 轮播数据
    async banner() {
      try {
        let res = await banner();
        if ((res.data.code = 1)) {
          this.swiperdata = res.data.data;
          this.$nextTick(() => {
            new Swiper(".swiper-container", {
              loop: true,
              autoplay: true
            });

            this.scroll()
          });
        }
      } catch (e) {
        console.log(e.response);
      }
    },
    // bscroll数据
    async scroll(){
      this.getlist()
      this.myBScroll = new BScroll('.scroll',{
        click:true,//开启BScroll中的点击事件
        pullUpLoad: {//开启上拉加载
          threshold: -50
        },
        pullDownRefresh:{//开启下拉刷新
          threshold:50
        }
      })

      this.myBScroll.on('pullingUp',()=>{
        console.log('上拉加载')
        this.page++;
        if(!this.show){
          this.getlist();
        }
      })
      this.myBScroll.on('pullingDown',()=>{
        console.log('下拉刷新')
        this.page = 0;
        this.show = false;
        this.scrolldata=[];
        this.getlist();
      })
    },
    async getlist(){
      let res = await scroll({pageid:this.page,limit:this.limit});
      this.scrolldata = this.scrolldata.concat(res.data.data);
      // console.log(res.data.data,"00000000000000000000000000")
      if(res.data.data.length<=0){
        this.show=true;
      }
      this.myBScroll.refresh();
      this.myBScroll.finishPullUp();
      this.myBScroll.finishPullDown();
      
    },
    async clickAddCart(item){
      if(!window.localStorage.token){
        this.$router.push({
          path:'/login',
          query:{
            redirect:'/index/home'
          }
        })
        return;
      }
      //用户信息
      let res = await getUserInfo();
      // let user_id = res.data.data.uid;
      // let shop_id = item.id;
      let shop = await addCar({
        shop_id:item.id,
        user_id:res.data.data.uid
      })
      this.$toast('添加购物车成功！');
      // console.log(shop,"购物车")
    }
  }
};
</script>

<style scoped>
.home{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header{
  padding:20px;
  text-align:center;
 /* display:flex;
   justify-content: space-between; 
  align-items: center;*/
  background:orange;
}
/* banner */
.swiper-container {
  width: 100%;
  height: 150px;
}
.swiper-container img {
  width: 100%;
  height: 100%;
}
/* icon */
.icon {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.icon .item {
  width: 20%;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
}
.icon .item p:nth-child(1) {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  background: orange;
  margin-bottom: 10px;
}
/* bscroll */
.scroll {
 flex:1;
 overflow: hidden;
}
.last{
  text-align:center;
}
.item{
  position: relative;
}
.addcart{
  border:1px solid #ccc;
  display: inline-block;
  padding:5px 15px;
  position: absolute;
  bottom:10px;
  right:10px;
}
</style>