<template>
  <el-tabs type="border-card" class="demo-tabs" @tab-click="handleClick">
<!--    <el-tab-pane>-->
<!--      <template #label>-->
<!--        <span class="custom-tabs-label">-->
<!--          <el-icon><calendar /></el-icon>-->
<!--          <span>最近</span>-->
<!--        </span>-->
<!--      </template>-->
<!--      <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">-->
<!--        <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>-->
<!--      </ul>-->
<!--    </el-tab-pane>-->
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><calendar /></el-icon>
          <span>帖子</span>
        </span>
      </template>
      <ul class="infinite-list" style="overflow: auto">
        <li v-for="i in posts" :key="i.id" class="infinite-list-item">
          <span class="animal" v-for="a in animals" v-show="a.id === i.animalId">{{ a.type }}</span>
          <span class="title" @click="toPost(i.id)">{{ i.title }}</span>
          <span class="time">{{ i.time }}</span>
        </li>
      </ul>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><calendar /></el-icon>
          <span>发布的领养</span>
        </span>
      </template>
      <div>
        <el-row>
          <el-col
              v-for="(adoption, index) in adoptions"
              :key="adoption"
              :span="7"
              :offset="1"
          >
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <el-image
                  class="image"
                  preview-teleported="true"
                  :src= "adoption.img"
                  :preview-src-list="[adoption.img]"
                  fit="cover"
              />
              <div style="padding: 14px">
                <span>{{ adoption.name }}</span>
                <el-row>
                  <el-col :span="24">
                    <div class="information-title">
                      {{ adoption.detail }}
                    </div>
                  </el-col>
                </el-row>
                <div class="bottom">
                  <time class="time">{{ adoption.time }}</time>
                  <el-button v-if="adoption.isPass === 1" @click="toDetail(adoption.id)" type="text">详情</el-button>
                  <span v-if="adoption.isPass === 0" class="button">待审核</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><calendar /></el-icon>
          <span>收藏夹</span>
        </span>
      </template>
      <div>
        <el-row>
          <el-col
              v-for="(af, index) in adoptFav"
              :span="7"
              :offset="1"
          >
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <el-image
                  class="image"
                  preview-teleported="true"
                  :src= "af.adoption['img']"
                  :preview-src-list="[af.adoption.img]"
                  fit="cover"
              />
              <div style="padding: 14px">
                <span>{{ af.adoption['name'] }}</span>
                <el-row>
                  <el-col :span="24">
                    <div class="information-title">
                      {{ af.adoption['detail'] }}
                    </div>
                  </el-col>
                </el-row>
                <div class="bottom">
                  <time class="time">{{ af.adoption['time'] }}</time>
                  <el-button @click="toDetail(af.adoption['id'])" type="text" class="button">详情</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-tab-pane>
<!--    <el-tab-pane label="收藏">收藏</el-tab-pane>-->
<!--    <el-tab-pane label="发布领养">发布领养</el-tab-pane>-->
  </el-tabs>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "UserDynamic",
  data() {
    return {
      // count: 10,
      posts: [],
      animals: [],
      adoptions: [],
      adoptFav: [],
    }
  },
  created() {
    this.getPosts()
    this.getAnimals()
  },
  methods: {
    // load() {
    //   this.count += 2
    // },
    handleClick(tab, event) {
      // console.log(tab, event)
      // console.log(tab.index)
      if(tab.index === '0') {
        this.getPosts()
      } else if(tab.index === '1') {
        this.getAdoptions()
      } else if(tab.index === '2') {
        this.getAdoptFav()
      }
    },
    getAnimals() {
      request.get('animal', this.isPass).then(res => {
        this.animals = res.data
      })
    },
    getPosts() {
      let userid;
      // console.log(this.$route.query.userid)
      if(this.$route.query.userid !== undefined) {
        userid = this.$route.query.userid
      } else {
        let user = JSON.parse(sessionStorage.getItem('user'))
        // console.log(user)
        userid = user.id
      }
      request.get('/post/user/' + userid).then(res => {
        // console.log(res)
        this.posts = res.data
      })
    },
    getAdoptions() {
      let userid;
      // console.log(this.$route.query.userid)
      if(this.$route.query.userid !== undefined) {
        userid = this.$route.query.userid
      } else {
        let user = JSON.parse(sessionStorage.getItem('user'))
        // console.log(user)
        userid = user.id
      }
      request.get('/adoption/user/' + userid).then(res => {
        this.adoptions = res.data
      })
    },
    getAdoptFav() {
      let userid;
      // console.log(this.$route.query.userid)
      if(this.$route.query.userid !== undefined) {
        userid = this.$route.query.userid
      } else {
        let user = JSON.parse(sessionStorage.getItem('user'))
        // console.log(user)
        userid = user.id
      }
      request.get('/adopt_fav/user/' + userid).then(res => {
        this.adoptFav = res.data
        console.log(res)
      })
    },
    toPost(id) {
      // console.log(id)
      this.$router.push({path:"/post_detail", query:{postId:id}})
    },
    toDetail(id) {
      this.$router.push({path:'/adopt_detail', query:{adoptId: id}})
    },
  },
}
</script>

<style lang="less" scoped>
.infinite-list {
  height: 600px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  //display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  height:100px;
  background: var(--el-color-warning-light-9);
  margin: 10px;
  color: var(--el-color-warning);
  span {
    display: block;
    //padding: 5px;
  }
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
.title {
  color: #9d6017;
  font-size: 26px;
  padding-top: 25px;
}
.title:hover {
  color: orange;
  cursor: pointer;
}
.time {
  font-size: 12px;
  padding-top: 5px;
}
.animal {
  float: right;
  padding-top: 10px;
  padding-right: 20px;
  font-size: 16px;
}
.information-title {
  margin-top: 3px;
  font-size: 12px;
  color: #999;
  width: 100%;   /*一定要设置宽度，或者元素内含的百分比*/
  overflow:hidden; /*溢出的部分隐藏*/
  white-space: nowrap; /*文本不换行*/
  text-overflow:ellipsis;/*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/
}
.button {
  padding: 0;
  min-height: auto;
}
.bottom {
  //margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time {
  font-size: 12px;
  color: #999;
}
</style>