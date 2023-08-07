<template>
  <el-card class="detail" shadow="never">
    <div style="display: block; padding: 20px">
      <span class="title">{{ post.title }}</span>
    </div>
    <el-row>
      <el-col :span="1">
        <img class="avatar" @click="toUser(user.id)" :src="user.headImg" alt="头像">
      </el-col>
      <el-col :span="21">
        <div style="margin-left: 10px">
          <span class="nick" @click="toUser(user.id)">{{ user.nickName }}</span>
          <span class="time">{{ post.time }}</span>
        </div>
      </el-col>
    </el-row>
    <div style="margin: 20px" v-html="post.content"></div>
  </el-card>
  <el-card class="detail" shadow="never">
    <div style="flex: 1; padding: 10px">评论区</div>
    <div style="padding: 10px;" v-if="!me">要登录才能进行评论哦~</div>
    <div style="padding: 10px;" v-if="me">
      <el-row>
        <el-col :span="2">
          <img class="avatar" style="margin-left: 27px" :src="me.headImg" alt="头像">
        </el-col>
        <el-col :span="19">
          <el-input v-model="myComment.content" size="large" placeholder="来留下你的评论吧" style="padding: 7px"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button @click="submit" size="large" type="warning" style="margin: 7px" plain>评论</el-button>
        </el-col>
      </el-row>
    </div>
    <div
        v-for="(comment, index) in comments"
    >
      <el-row style="padding: 10px" v-if="!comment.parentId">
        <el-col :span="2">
          <img class="avatar" @click="toUser(comment.user['id'])" style="margin-left: 27px" :src="comment.user['headImg']" alt="头像">
        </el-col>
        <el-col :span="21">
          <div class="contents">
            <span style="size: 13px; color: #501818;cursor: pointer" @click="toUser(comment.user['id'])">{{ comment.user['nickName'] }}</span>
            <span>{{ comment.content }}</span>
            <span class="time">
              {{ comment.time }}
              <span @click="myComment.parentId = comment.id; comment.isReply=true">回复</span>
            </span>
          </div>
          <div v-for="(child, index) in children">
            <el-row v-if="comment.id === child.parentId" style="margin-top: 20px">
              <el-col :span="1">
                <img class="min-avatar" @click="toUser(child.user['id'])" :src="child.user['headImg']">
              </el-col>
              <el-col :span="21">
                <div class="contents">
                  <span>
                    <span style="size: 13px; color: #932727; margin-right: 10px;cursor: pointer" @click="toUser(child.user['id'])">{{ child.user['nickName'] }}</span>
                    <span>{{ child.content }}</span>
                  </span>
                  <span class="time">
                    {{ child.time }}
<!--                    <span @click="reply(comment.id)">回复</span>-->
                  </span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-divider/>
      </el-row>
      <div v-if="comment.isReply && me">
        <el-row>
          <el-col :span="2">
            <img class="avatar" style="margin-left: 27px" :src="me.headImg" alt="头像">
          </el-col>
          <el-col :span="18">
            <el-input v-model="myComment.content" size="normal" placeholder="输入要回复的信息" style="padding: 7px"></el-input>
          </el-col>
          <el-col :span="3">
            <el-button @click="submit" size="normal" type="warning" style="margin: 5px" plain>回复</el-button>
            <el-button @click="myComment.parentId = ''; comment.isReply=false" size="normal" style="margin: 5px">取消</el-button>
          </el-col>
        </el-row>
        <el-divider/>
      </div>
    </div>
  </el-card>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "PostDetail",
  data() {
    return {
      postId: "",
      me: {},
      post: {},
      user: {},
      myComment: {},
      total: "",
      comments: [],
      children: [],
    }
  },
  created() {
    this.me = JSON.parse(sessionStorage.getItem('user'))?JSON.parse(sessionStorage.getItem('user')):''
    this.postId = this.$route.query.postId
    this.getPost()
    this.getComments()
    // console.log(this.postId)
  },
  methods:{
    getPost() {
      request.get('/post/' + this.postId).then(res => {
        // console.log(res)
        this.post = res.data
        this.user = this.post.user
      })
    },
    getComments() {
      request.get('/comment/show', {
        params:{
          postId: this.postId
        }}).then(res => {
        console.log(res)
        this.comments = res.data
        this.children = res.data
      })
    },
    toUser(id) {
      if(!sessionStorage.getItem('user')){
        this.$message({
          type: 'warning',
          message: '请先登录',
        })
        return
      }
      this.$router.push({path:'/userinfo', query:{userid: id}})
    },
    // reply(id) {
    //   this.myComment.parentId = id
    // },
    // cancel() {
    //   this.myComment.parentId = null
    // },
    submit() {
      this.myComment.userId = this.me.id
      this.myComment.postId = this.postId
      this.myComment.time = this.getDate()
      request.post('/comment', this.myComment).then(res => {
        if(res.code === '0'){
          this.$message({
            type: "success",
            message: "评论成功"
          })
          // this.myComment.parentId = ''
          this.myComment={}
          this.getComments()
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
    // 获取当前时间
    getDate() {
      const myDate = new Date()
      //获取当前年
      const year = myDate.getFullYear()
      //获取当前月
      const month = myDate.getMonth() + 1
      //获取当前日
      const date = myDate.getDate()
      //获取当前小时数(0-23)
      const h = myDate.getHours()
      //获取当前分钟数(0-59)
      const m = myDate.getMinutes()
      const s = myDate.getSeconds()

      //获取当前时间
      const time =
          year +
          '-' +
          this.convert(month) +
          '-' +
          this.convert(date) +
          ' ' +
          this.convert(h) +
          ':' +
          this.convert(m) +
          ':' +
          this.convert(s)
      return time
    },
//日期时间处理
    convert(val) {
      return val < 10 ? '0' + val : val
    }

  }
}
</script>

<style lang="less" scoped>
.detail {
  margin-left: 7%;
  width: 86%;
  min-height: 300px;
  margin-top: 5px;
}
.avatar {
  height: 51px;
  width: 51px;
  border-radius: 50%;
  box-shadow: rgba(52, 94, 131, 0.52) 0 0 3px;
  cursor: pointer;
}
.min-avatar {
  height: 39px;
  width: 39px;
  border-radius: 50%;
  box-shadow: rgba(52, 94, 131, 0.52) 0 0 3px;
  cursor: pointer;
}
.nick {
  padding: 5px;
  font-size: 18px;
  display: block;
  cursor: pointer;
}
.nick:hover {
  color: #e3b48c;
}
.time {
  font-size: 12px;
  display: block;
  color: #999999;
  >span{
    cursor: pointer;
    margin-left: 3px;
  }
  >span:hover {
    color: #e3b48c;
  }
}
.title {
  font-size: 28px;
  font-family: 华文宋体;
}
.contents {
  >span {
    display: block;
    padding: 3px;
  }
}
</style>