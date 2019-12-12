module.exports={
    devServer:{
        proxy: {
            "/api": {//html css image 这些是静态资源，不需要走代理
              target: "http://106.13.85.240:7002",//到目标地址获取数据
              pathRewrite: {"^/api" : ""}//把/api换成空
            }
          }
    }
}