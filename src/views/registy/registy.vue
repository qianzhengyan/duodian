<template>
  <div class="registy">
      <p><input type="text" v-model="phone" placeholder="请输入手机号"></p>
      <p><input type="password" v-model="password" placeholder="请输入密码"></p>
      <p><button @click="registry">注册</button></p>
  </div>
</template>

<script>
// import axios from "axios"
import {registy} from "@/api/api.js"
export default {
    data(){
        return {
            phone:"",
            password:""
        }
    },
    methods:{
        // registry(){
        //     console.log(this.phone,this.password)
        //     axios.post('/api/user/registry',{phone:this.phone,password:this.password}).then(res=>{
        //         if(res.data.code=1){
        //             this.$router.push('/login')
        //         }
        //     })
        // }

        async registry(){
            try{
                let res = await registy({phone:this.phone,password:this.password})
                if(res.data.code=1){
                    this.$router.go(-1)
                }
            }
            catch(e){
                console.log(e.response)
            }
        }
    }
}
</script>

<style>
.registy{
  width: 100%;
  height: 100%;
}
.registy p{
  width: 100%;
  margin-top:20px;
}
.registy p input,.registy p button{
  width: 90%;
  line-height: 35px;
  display:block;
  margin:auto;
  background:none;
  outline: none;
  border:1px solid #000;
}
</style>