<template>
  <div class="main-view">
    <img style="width: 100%; height: 390px" src="@/assets/img/communication_head.png" alt="四只杯子里的兔子">
    <div style="padding: 20px">
      <span style="font-size: 31px;color: #9d6017;margin-right: 900px">用户交流区</span>
      <el-button @click="isNotice=!isNotice" type="text">公告</el-button>
      <el-divider direction="vertical"/>
      <el-button @click="changeDate" type="text">按时间排序</el-button>
    </div>
<!--    用户交流区头部-->
  </div>
  <el-card class="main-view" shadow="never">
    <div v-for="post in posts">
      <el-row v-if="(animalId === '' ? true : post.animal['id'] - animalId === 0) && (!isNotice || post.user['id'] === 1)">
        <el-col :span="3">
          <img class="avatar" :src="post.user['headImg']" alt="头像" @click="toUser(post.user['id'])">
          <div style="margin-left: 10px">
            <span class="nick" @click="toUser(post.user['id'])">{{ post.user['nickName'] }}</span>
          </div>
        </el-col>
        <el-col :span="21">
          <div class="post">
            <span class="title" @click="toPost(post.id)">{{ post.title }}</span>
            <span class="time">{{ post.time }}</span>
          </div>
        </el-col>
        <el-divider />
      </el-row>
    </div>

  </el-card>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Communication",
  data() {
    return {
      animalId:'',
      posts:[],
      isPass: 1,
      isNotice: false
      // isAdopt: 0,
    }
  },
  created() {
    this.animalId = sessionStorage.getItem('animalId')?sessionStorage.getItem('animalId'):''
    this.getPosts()
  },
  methods: {
    getPosts() {
      request.get('/post/show').then(res => {
        console.log(res)
        this.posts = res.data
      })
    },
    toUser(id) {
      this.$router.push({path:'/userinfo', query:{userid: id}})
    },
    toPost(id) {
      this.$router.push({path:"/post_detail", query:{postId:id}})
    },
    changeDate() {
      this.posts.sort((a, b) => {
        let aTimeString = a.time
        let bTimeString = b.time
        aTimeString = aTimeString.replace(/-/g, '/')
        bTimeString = bTimeString.replace(/-/g, '/')
        let aTime = new Date(aTimeString).getTime()
        let bTime = new Date(bTimeString).getTime()
        return bTime - aTime
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main-view {
  margin-left: 7%;
  width: 86%;
}
.post {
  span {
    display: block;
  }
}
.avatar {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  box-shadow: rgba(52, 94, 131, 0.52) 0 0 3px;
  margin-top: 5px;
  margin-left: 27px;
  cursor: pointer;
}
.nick {
  padding: 5px;
  margin-left: 15px;
  font-size: 16px;
  display: block;
  cursor: pointer;
}
.nick:hover {
  color: #e3b48c;
}
.title {
  color: #38230b;
  font-size: 26px;
  padding-top: 10px;
  padding-left: 10px;
}
.title:hover {
  color: rgb(213, 175, 124);
  cursor: pointer;
}
.time {
  font-size: 12px;
  padding-top: 10px;
}
</style>