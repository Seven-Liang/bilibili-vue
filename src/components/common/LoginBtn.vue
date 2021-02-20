<template>
  <div class='btnparent' @click="registerClik">
    <div class="LoginBtn">{{btntext}}</div>
  </div>
</template>

<script>

  export default {
    name:'',
    props:['btntext'],
    methods: {
        registerClik() {
            this.$emit('registerSubmit')
        }
    },
    data () {
      return {

      };
    },

  }

</script>
<style>
.btnparent{
    padding: 4.167vw 2.778vw;
}

.LoginBtn{
    height: 45px;
    background-color: #ff9db5;
    color:white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6.252vw;
    font-size: 4.44vw;
}
</style>