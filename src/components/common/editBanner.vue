<template>
<div @click="bannerClick">
    <div class="editBanner">
    <span>{{left}}</span>
    <span><slot name="right"></slot></span>
  </div>
</div>
  
</template>

<script>

  export default {
    props:['left'],
    methods: {
        bannerClick() {
            this.$emit('bannerClick')
        }
    },

    data () {
      return {

      };
    },

  }

</script>
<style  scoped lang='less'>
.editBanner{
    background-color: white;
    padding:4.167vw 0;
    font-size: 4.444vw;
    border-bottom: 0.278vw solid #eee;
    display: flex;
    font-size: 3.889vw;
    color: #333;
    justify-content: space-between;
    align-items: center;
}

</style>