import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import routes from "./routerConfig"

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



// 全局导航守卫
// let list = ["/index/cart","/index/my"]//需要添加导航守卫的路由

// router.beforeEach((to,from,next)=>{
//   // console.log(to,"to........")
//   // console.log(from,"from........")
//   if(list.includes(to.fullPath)){//需要导航守卫
//     if(!window.localStorage.token){//没有登录
//       next({
//         path:'/login',
//         query:{
//           redirect:to.fullPath
//         }
//       })
//     }else{
//       next()
//     }
//   }else{
//     next()
//   }
// })

// 组件导航守卫
router.beforeEach((to,from,next)=>{
  // console.log(to.matched,"路由")
  // console.log(to,"to0000000000000000000000000")
  if(to.matched.some(item=>item.meta.requiresAuth)){
    if(!window.localStorage.token){
      next({
        path:'/login',
        query:{
          redirect:to.fullPath
        }
      })
    }else{
      next()
    }
  }else{
    next()
  }
})


export default router
