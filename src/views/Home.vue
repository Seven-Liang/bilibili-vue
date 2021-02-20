<template>
  <div class="home">
    <nav-bar></nav-bar>
    <van-tabs v-model="active" swipeable sticky animated>
        <van-tab v-for="(item,index) in category" :key="index" :title="item.title">
          <!-- 传入单个文章数据 -->
          <!-- v-for解决文章循环问题 -->
          <!-- list组件通过loading 和 finished两个变量控制加载状态，当组件滚动到底部时会触发load并将loading设置成true，此时可以发起异步操作并更新数据 -->
            <van-list
            v-model="item.loading"
            :immediate-check="false"
            :finished="item.finished"
            finished-text="我也是有底线的"
            @load="onLoad"
          >
            <div class="detailparent">
              <cover
                class="detailitem"
                :detailitem="categoryitem"
                v-for="(categoryitem,categoryindex) in item.list"
                :key="categoryindex"
              />
            </div>
          </van-list>
        
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue"
import Cover from "./Cover.vue"
// import LoginBtnVue from '../components/common/LoginBtn.vue';
export default {
  data() {
    return {
      category:[],
      active: 0
    }
  },
  components:{
    NavBar,
    Cover
  },
  methods: {
    //获取首页的标题
    async selectCategory() {
      const res = await this.$http.get("/category");
      // this.category = res.data
      this.changeCategory(res.data)
      this.selectArticle()
    },
   changeCategory(data) {
     //对已有的后端数据进行改造
         const category1 = data.map((item,index) => {
            item.list = []
            item.page = 0
            item.finished = false
            item.loading = false
            item.pagesize = 10
            return item
         })
         this.category = category1
         this.selectArticle()
     },
     async selectArticle() {
       const categoryitem = this.categoryItem()
       const res = await this.$http.get('/detail/' + categoryitem._id,{
         //下拉加载页面
         params:{
           page: categoryitem.page,
           pagesize: categoryitem.pagesize
         }
       })

       categoryitem.list.push(...res.data)
       categoryitem.loading = false
       if (res.data.length < categoryitem.pagesize) {
        categoryitem.finished = true;
      }
     },
     onLoad() {
      const categoryitem = this.categoryItem();
      setTimeout(() => {
        categoryitem.page += 1;
        this.selectArticle();
      }, 1000);
    },
     categoryItem() {
       const categoryitem = this.category[this.active]
       return categoryitem
     }
  },
  watch: {
    active() {
      this.selectArticle()
    }
  },
   created() {
      this.selectCategory()
    },
  
};
</script>
<style  scoped lang='less'>
.home{
  background-color: white;
}
.detailparent{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .detailitem{
      width: 45%;
    }
}
</style>