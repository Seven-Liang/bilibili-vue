<template>
  <div v-if="model" class="editViews">
    <div style="margin-bottom: 10px"><nav-bar></nav-bar></div>

    <div class="uploadfile">
      <!-- 头像上传 -->
      <van-uploader
        class="uploadimg"
        preview-size="100vw"
        :after-read="afterRead"
      />
      <edit-banner left="头像">
        <img :src="model.user_img" alt="" slot="right" v-if="model.user_img" />
        <img src="@/assets/default_img.jpg" alt="" slot="right" v-else />
      </edit-banner>
    </div>

    <edit-banner left="昵称" @bannerClick="show = true">
      <a href="javascript:;" slot="right">{{ model.name }}</a>
    </edit-banner>
    <edit-banner left="账号">
      <a href="javascript:;" slot="right">{{ model.username }}</a>
    </edit-banner>
    <edit-banner left="性别" @bannerClick="gendershow = true">
      <a href="javascript:;" slot="right">{{ model.gender ? "男" : "女" }}</a>
    </edit-banner>
    <edit-banner left="个签" @bannerClick="textshow = true">
      <a href="javascript:;" slot="right">{{ model.user_desc }}</a>
    </edit-banner>

    <div class="editback" @click="$router.back()">返回个人中心</div>

    <!-- 弹出框 -->
    <van-dialog
      v-model="show"
      title="昵称"
      show-cancel-button
      @confirm="confirmClick"
      @cancel="content = ''"
    >
      <van-field v-model="content" autofocus></van-field>
    </van-dialog>

    <van-dialog
      v-model="textshow"
      title="个签"
      show-cancel-button
      @confirm="texteareaClick"
      @cancel="content = ''"
    >
      <van-field v-model="content" type="textarea" autofocus></van-field>
    </van-dialog>

    <van-action-sheet
      v-model="gendershow"
      cancel-text="取消"
      :actions="actions"
      @select="onSelect"
    />
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue";
import editBanner from "@/components/common/editBanner.vue";
export default {
  components: {
    NavBar,
    editBanner,
  },
  data() {
    return {
      model: {},
      show: false,
      textshow: false,
      content: "",
      gendershow: false,
      actions: [
        { name: "男", val: 1 },
        { name: "女", val: 0 },
      ],
    };
  },
  methods: {
    async selectUser() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
    //头像上传
    async afterRead(file) {
      //文件上传需要的格式
      const fromdata = new FormData();
      fromdata.append("file", file.file);
      const res = await this.$http.post("/upload", fromdata);
      console.log("READ", res); 
      this.model.user_img = res.data.url;
      console.log("MODEL CHANGE", this.model);
      this.UserUpdate();
    },
    //重新传照片后修改后端
    async UserUpdate() {
      console.log("INSIDE MODEL", this.model);
      const res = await this.$http.post(
        "/update/" + localStorage.getItem("id"),
        this.model
      );
      console.log("UPDATE", res);
      if (res.data.code == 200) {
        this.$msg.fail("修改成功");
      }
    },
    //修改昵称
    confirmClick() {
      this.model.name = this.content;
      this.UserUpdate();
      this.content = "";
    },
    //修改个签
    texteareaClick() {
      this.model.user_desc = this.content;
      this.UserUpdate();
      this.content = "";
    },
    //修改性别
    onSelect(data) {
      this.model.gender = data.val;
      this.UserUpdate();
      this.gendershow = false;
    },
  },
  created() {
    this.selectUser();
  },
};
</script>
<style  scoped lang="less">
.editViews a {
  color: #333;
}
.editViews img {
  height: 12.778vw;
  width: 12.778vw;
  border-radius: 50%;
}
.uploadfile {
  position: relative;
  overflow: hidden;
  .uploadimg {
    opacity: 0;
    position: absolute;
  }
}
.editback {
  margin-top: 5.556vw;
  background-color: #999;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  padding: 4.167vw 0;
  font-size: 5vw;
}
</style>