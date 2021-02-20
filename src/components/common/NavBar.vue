<template>
  <div class="navbar">
    <div class="logo">
      <img src="@/assets/logo.png" alt="" @click="$router.push('/')" />
    </div>
    <div>
      <p>
        请输入内容
        <van-icon class="ipt-icon" name="search" />
      </p>
    </div>
    <div>
      <img
        :src="imgUrl"
        alt=""
        @click="$router.push('/userinfo')"
        v-if="imgUrl"
      />
      <img
        src="@/assets/default_img.jpg"
        alt=""
        @click="$router.push('/login')"
        v-else
      />
      <p>下载App</p>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    if (localStorage.getItem("token")) {
        console.log("hehr?")
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.imgUrl = res.data[0].user_img;
    }
  },

  data() {
    return {
      imgUrl: "",
    };
  },
};
</script>
<style scoped lang="less">
.navbar {
  height: 12.5vw;
  background-color: white;
  display: flex;
  .logo {
    display: flex;
    width: 90px;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
    }
  }
  div:nth-child(2) {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0 1.385vw;
    p {
      line-height: 7.222vw;
      color: #aaa;
      height: 23px;
      position: relative;
      background-color: #dedede;
      width: 100%;
      border-radius: 13px;
      font-size: 3.333px;
      padding-left: 25px;
      .ipt-icon {
        position: absolute;
        left: 5%;
        top: 50%;
        transform: translate(0, -40%);
        color: #aaa;
      }
    }
  }
  div:nth-child(3) {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 24px;
      height: 24px;
    }
    p {
      padding: 5px 10px;
      margin: 0 8px;
      border-radius: 3px;
      background-color: #fb7299;
      color: white;
      font-size: 13px;
    }
  }
}
</style>