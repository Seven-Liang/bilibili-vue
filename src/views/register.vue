<template>
  <div>
    <login-top middleTop='注册bilibili'>
      <div slot="right" @click="$router.push('/login')">切换到登录页面</div>
    </login-top>
    <login-text label="姓名" 
    style="margin:4.167vw 0;"
    rule="^.{6,16}$"
    placeholder="请输入姓名"
    @inputChange="res => model.name = res"
    />

    <login-text label="账号"
     rule="^.{6,16}$"
     placeholder="请输入账号"
     @inputChange="res => model.username = res"
     />

    <login-text label="密码"
     placeholder="请输入密码"
     type="password"
     rule="^.{6,16}$"
     @inputChange="res => model.password = res"
    />

    <login-btn btntext="注册" @registerSubmit="registerSubmit"></login-btn>
  </div>
</template>

<script>
import LoginTop from "@/components/common/LoginTop.vue"
import LoginText from "@/components/common/LoginText.vue"
import LoginBtn from "@/components/common/LoginBtn.vue"
export default {
  components:{
    LoginTop,
    LoginText,
    LoginBtn
  },

  //存储用户数据对象
  data() {
    return {
      model: {
        name:'',
        username:'',
        password:''
      }
      
    }
  },

methods: {
  //使用async可以将异步变为同步(将promise变为同步)
  async registerSubmit() {
    //全部条件都满足才发送
    //将用户注册信息发送到后端

    //问题：network的perview出现noscript
    //异步数据
    let rulg = /^.{6,16}$/
    if(rulg.test(this.model.name) && rulg.test(this.model.username) && rulg.test(this.model.password)){
      const res = await this.$http.post('/register',this.model)
      this.$msg.fail(res.data.msg)
      //注册成功后跳转到userinfo
      //setItem本地存储数据
      localStorage.setItem("id",res.data.id) 
      localStorage.setItem("token",res.data.objtoken)
      setTimeout(() => {
        this.$router.push('/userinfo')
      },1000)
    }else{
      this.$msg.fail('格式不正确，请重新输入')
    }
  }
},
  
};
</script>
<style>
</style>