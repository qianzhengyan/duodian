
// 封装 Toast 插件 

// 引入toast组件
import ToastComponent  from "./toast.vue";

const Toast = {
    install(Vue,options){
        // 创建一个子类
        const ToastControuctor = Vue.extend(ToastComponent)

        // 创建实例
        const instance = new ToastControuctor();

        // 把实例绑定在一个元素上
        instance.$mount(document.createElement('div'));

        // 把元素推入到body里面
        document.body.appendChild(instance.$el)

        Vue.prototype.$toast=(msg,time=1000)=>{
            instance.show = true;
            instance.msg = msg;

            setTimeout(()=>{
                instance.show=false;
            },time)
        }
    }
}

export default Toast;