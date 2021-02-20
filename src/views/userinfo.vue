<template>
  <div class="userinfo">
    <nav-bar/>
    <img src="@/assets/bannerTop_new.png" alt="" class="backImg">
    <user-detail :userInfo="model"/>
    <user-artical/>
    <div>

    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue"
import userDetail from "@/components/userComponent/userDetail.vue"
import userArtical from "@/components/userComponent/userArtical.vue"

  export default {
      components:{
          NavBar,
          userDetail,
          userArtical
      },
    methods: {
        async UserinfoData() {
            const res = await this.$http.get('/user/' + localStorage.getItem("id"))
            this.model = res.data[0]
        }
    },

    created() {
        this.UserinfoData()
    },

    data() {
        return {
            model:{}
        }
    },

  }

</script>
<style scope lang="less">
.userinfo{
    .backImg{
        height: 91px;
        width: 100%;
    }
}
</style>