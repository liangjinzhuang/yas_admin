/**
 * axios封装
 *  请求拦截、响应拦截1、错误统一处理
 */
import axios from 'axios'
import router from '../router'
import store from '../store'
import { Message  } from 'element-ui'

/**
 * 提示函数
 */
const tip = msg =>{
    Message({
        message: msg,
        duration:1000
      });
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */

 const toLogin = () =>{
    Message({
        message: '请登录',
        duration:1000,
        onClose:()=>{
            router.replace({
                path:'/login',
                query:{
                    redirect:router.currentRoute.fullPath
                }
            });
        }
      });
 }

 /**
  * 请求失败后的错误同意处理
  * @param { Number } status 请求失败的状态码
  */
 const errorHandle = (status,other) =>{
     //状态码判断
     switch(status){
        //401:未登录状态，跳转登录页
        case 401:
            toLogin();
            break;
        //403  token过期
        //清楚token并跳转登录页
        case 403:
            tip('登录过期，请重新登录');
            localStorage.removeItem('token');
            store.commit('loginSuccess',null);
            setTimeout(() =>{
                toLogin();
            },1000);
            break;
        //404 请求不存在
        case 404:
            tip('请求资源不存在');
            break;
        default:
            console.log(other);

     }
 }

 //创建axios实例
 var instance = axios.create({ 
     timeout:4000
  })

  //设置post请求头
  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  instance.defaults.withCredentials = true // 设置请求携带cookie
  /**
   * 请求拦截器
   * 每次请求前，如果存在token则在请求头中携带token
   */
  instance.interceptors.request.use(
    config =>{
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        return config;
    },
    error => Promise.reject(error)
)

//响应拦截器
instance.interceptors.response.use(
    res => res.status === 200 ? Promise.resolve(res.data.data) : Promise.reject(res),
    //请求失败
    error =>{
        const { response } = error;
        if(response){
            //请求已发出，但是不在2xx范围
            errorHandle(response.status,response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            if(!window.navigator.onLine){
                //store.commit('changeNetwork', false);
            }else{
                return Promise.reject(error);
            }
        }
    }
);

export default instance;