<template>
  <div class="alert" v-if="show">
      {{msg}}
  </div>
</template>

<script>
export default {
  data(){
    return {
      msg:"",
      show:false
    }
  }
}
</script>

<style>
.alert{
    width: 80%;
    height: 50px;
    line-height: 50px;
    text-align:center;
    background:rgba(0,0,0,.5);
    color:#fff;
    position:fixed;
    left:10%;
    top:50%;
    margin-top:-25px;
}
</style>