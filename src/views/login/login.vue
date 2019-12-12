<template>
  <div class="login">
      <p><input type="text" v-model="phone" placeholder="请输入手机号"></p>
      <p><input type="password" v-model="password" placeholder="请输入密码"></p>
      <p><button @click="login">登录</button></p>
      <p><button @click="registy" v-if="flag">注册</button></p>
  </div>
</template>

<script>
// import axios from "axios";
import {login} from "@/api/api.js"
export default {
  data(){
    return {
      phone:"",
      password:"",
      flag:false
    }
  },
  methods:{
    // async login(){
    //   // console.log(this.phone,this.password)
    //   await axios.post('/api/user/login',{
    //     phone:this.phone,
    //     password:this.password
    // }).then(res=>{
    //   console.log(res,"res")

    //   if(res.data.code==1){
    //     this.$router.push('/index')
    //   }else{
    //     console.log('00000000000000000000000')
    //   }
    // }).catch(e=>{
    //   console.log(e.response)
    //   this.flag = true;
    // })


    // 登录
    async login(){
      try{
        let res = await login({phone:this.phone,password:this.password})
          if(res.data.code=1){
            // console.log(res,"loginres")
            window.localStorage.token=res.data.data.token
            this.$router.push({ path: this.$route.query.redirect })
          }
      }
      catch(e){
        this.flag=true;
        console.log(e.response)
        alert(e.response.data.msg)
      }
    },
    // 跳注册页面
    registy(){
      this.$router.push('/registy')
    }
  }
}
</script>

<style>
.login{
  width: 100%;
  height: 100%;
}
.login p{
  width: 100%;
  margin-top:20px;
}
.login p input,.login p button{
  width: 90%;
  line-height: 35px;
  display:block;
  margin:auto;
  background:none;
  outline: none;
  border:1px solid #000;
}
</style>