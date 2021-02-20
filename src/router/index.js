import Vue from "vue";
import VueRouter from "vue-router";
import register from "@/views/register.vue";
import home from '@/views/Home.vue'; 
import login from '@/views/Login.vue';
import userinfo from '@/views/userinfo.vue'
import edit from '@/views/Edit.vue'
import article from '@/views/Article.vue'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);
//懒加载
const Home = () => import('../views/Home.vue')
const Register = () => import('../views/register.vue')
const Login = () => import('../views/Login.vue')
const useringo = () => import ('../views/userinfo.vue')
const Edit = () => import ('../views/Edit.vue')
const Article = () => import ('../views/Article.vue')


//挂载 配置映射关系
const routes = [
  {
    path: "/",
    component: home,
    meta:{
      keepalive:true
    }
    
  },
  {
    path: "/register",
    component: register,
  },
  {
    path: "/login",
    component: login
  },
  {
    path: "/userinfo",
    component: userinfo,
    meta:{
      istoken:true
    }
  },
  {
    path: "/edit",
    component: edit,
    meta:{
      istoken:true
    },
  },
  {
    path: "/article/:id",
    component:article
  },
  
  
  // {
  //   path: '/',
  //   redirect: '/register'
  // }
  // 自己查，默认路由放在哪里合适
];

const router = new VueRouter({
  mode: "hash",
  routes,
  linkActiveClass: "active",
});

//解决某些页面没有axios请求
//to:路由跳转前记录
router.beforeEach((to,feom,next) => {
  if((!localStorage.getItem('token') || !localStorage.getItem('id'))&&to.meta.istoken == true){
    router.push('/login')
    Vue.prototype.$msg.fail("请重新登录")
    return
  }
  next()
})

export default router;
