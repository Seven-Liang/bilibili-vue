<template>
  <div>
    <van-field 
    :label="label" 
    :type="type"
    :placeholder="placeholder"
    v-model="content"
    
    />
  </div>
</template>

<script>

  export default {
    name:'',
    props:['label','type','placeholder','rule'],
    data () {
      return {
          content:''
      };
    },
    //判断正则 当满足条件时讲姓名账号密码的内容发送到注册页面
    methods: {
        handlerulg() {
            //将字符串装换为正则
            const rule = RegExp(this.rule)
            if(rule.test(this.content)) {
                this.$emit('inputChange',this.content)
            }
        }
    },

    //监听data里面的数据
    watch: {
        content() {
            //console.log('5555');
            this.handlerulg()
        }
    },

  }

</script>
<style  scoped>

</style>