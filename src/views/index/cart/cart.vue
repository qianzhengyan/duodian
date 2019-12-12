<template>
  <div class="cart">
    <div class="header">购物车</div>
    <div class="list">

      <div class="box" v-for="(item,index) in list" :key="index">
        <input type="checkbox" :checked="item.checked" class="left" @click="changeChecked(item.id)">
        <Item :item="item.shopdata">
          <template v-slot:one>
            <p class="changeCount">
              <span @click="del(item,item.userid,item.shopid)">-</span>
              <span>{{item.count}}</span>
              <span @click="add(item,item.userid,item.shopid)">+</span>
            </p>
          </template>
        </Item>
      </div>

      <!-- 底部计算价格 -->
      <div class="reduce">
        <input type="checkbox" :checked="allchecked" @click="allChecked"> 全选
        <span>总价：{{allPrice}}</span>
      </div>

    </div>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";
import { getCar, getUserInfo , addCar , aa } from "@/api/api.js";
export default {
  data() {
    return {
      list: [],
      allPrice:0,
      allchecked:false
    };
  },
  components: {
    Item
  },
  async created() {
    let userInfo = await getUserInfo();
      // console.log(userInfo)
      let user_id = userInfo.data.data.uid;
      let res = await getCar({ user_id });
      // console.log(res.data.data, "cartres");
      this.list = res.data.data;
      this.list.forEach(item=>this.$set(item,"checked",false))
  },
  methods: {
    async add(obj,user_id,shop_id) { // 点击加号
      let res = await addCar({user_id,shop_id})
      obj.count++;
      this.allPrice = this.getAllPrice()
    },
    async del(obj,user_id,shop_id){
      console.log(typeof user_id,shop_id,'*************')
      // console.log(user_id,shop_id);
      let res = await aa({user_id,shop_id})
      obj.count--;
      this.allPrice = this.getAllPrice();
    },
    changeChecked(id){//点击单选
      let ind = this.list.findIndex(item=>item.id==id);
      this.list[ind].checked = !this.list[ind].checked;
      this.allchecked = this.list.every(item=>item.checked)
      // 计算总价钱
      // this.getAllPrice()
      this.allPrice = this.getAllPrice()

    },
    allChecked(){//点击全选
      this.allchecked = !this.allchecked;
      this.list.forEach(item=>item.checked=this.allchecked)
      // 计算总价钱
      // this.getAllPrice()
      this.allPrice = this.getAllPrice()
    },
    getAllPrice(){
      // 第一种计算方法
      // this.list.forEach(item=>{
      //   if(item.checked){
      //     console.log(item)
      //     console.log(item.count,item.shopdata.price,"price")
      //     this.allPrice += item.count * item.shopdata.price
      //   }
      // })

      // 第二种计算方法
      return this.list.reduce((allprice,obj)=>{
        return allprice + (obj.checked?obj.count*obj.shopdata.price:0)
      },0)
    }
  }
};
</script>

<style>
.header {
  padding: 20px;
  text-align: center;
  background: orange;
}
.box{
  width: 100%;
  display:flex;
}
.box .left{
  flex:1;
  margin-top:45px;
}
.box .item{
  flex:9;
  position: relative;
}
.changeCount{
  position:absolute;
  bottom:10px;
  right:10px;
}
.changeCount span{
  border:1px solid #ccc;
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  margin-right: 5px;
}
</style>