<template>
  <div>
    <div class="LoginTop">
      <div class="loginleft"></div>
        <div>{{middleTop}}</div>
        <!-- 具名插槽 -->
        <div class="loginright"><slot name="right"></slot></div>
    </div>
  </div>
</template>

<script>

  export default {
    name:'',
    props:['middleTop'],
    data () {
      return {

      };
    },

  }

</script>
<style>
.LoginTop{
  height: 45px;
  background-color: pink;
  display: flex;
  
  flex: 1;
  display:flex;
  justify-content:center;
  align-items:center;
   font-size: 4.444vw; 
  
}
.loginleft{
flex: 1;
  display:flex;
  justify-content:center;
  align-items:center;
   font-size: 4.444vw; 
}
.loginright{
  flex: 1;
  display:flex;
  justify-content:center;
  align-items:center;
   font-size: 3.611vw; 
}
</style>