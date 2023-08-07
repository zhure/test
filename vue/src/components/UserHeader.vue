<template>
  <div>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router
    >
      <img class="logo" src="@/assets/img/target.png" alt="logo">
      <el-menu-item class="home-title" index="/">
        流浪动物救助系统
      </el-menu-item>
      <el-menu-item index="/rescue_animal">救助动物</el-menu-item>
      <el-sub-menu popper-offset="0" index="2">
        <template #title>用户交流区</template>
        <el-menu-item index="/adoption">领养动物</el-menu-item>
<!--        <el-menu-item index="2-2">发布领养</el-menu-item>-->
        <el-menu-item index="/communicate">用户交流</el-menu-item>
      </el-sub-menu>
<!--      <el-sub-menu index="3">-->
<!--        <template #title>频道</template>-->
<!--        <el-menu-item v-for="item in menuList" :key="item.id">{{ item.type }}</el-menu-item>-->
<!--      </el-sub-menu>-->
      <el-menu-item style="margin-left: 50px;" index="/base_position">
        <el-icon><location/></el-icon>
        流浪动物基地
      </el-menu-item>
      <el-dropdown size="default" class="dropdown">
        <span class="el-dropdown-link">
          频道
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in menuList" :key="item.id" @click="setAnimal(item.id)">{{ item.type }}</el-dropdown-item>
            <el-dropdown-item @click="allAnimals">
              <el-icon><refresh /></el-icon>
            </el-dropdown-item>
            <el-dropdown-item @click="addAnimal" divided>
              <el-icon><plus /></el-icon>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown class="userDropdown" size="default">
        <img class="avatar" :src="headImg" alt="avatar">

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-if="!isLogin" @click="this.$router.push('/login')">登录/注册</el-dropdown-item>
<!--            <el-dropdown-item v-if="!isLogin">注册</el-dropdown-item>-->
            <div v-if="isLogin" style="height: 50px; text-align: center; size: 10px">
              <li>
                <el-icon color="pink" v-show="sex === '女'"><female /></el-icon>
                <el-icon color="blue" v-show="sex === '男'"><male /></el-icon>
                <span style="color: orangered">{{ username }}</span>
              </li>
              <li><span style="color: coral">{{ birthday }}</span></li>
            </div>
            <el-dropdown-item v-if="isLogin" @click="toMe">个人中心</el-dropdown-item>
            <el-dropdown-item divided v-if="isLogin" @click="layout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-tooltip
          class="box-item"
          effect="light"
          content="消息"
          placement="bottom"
      >
<!--        <el-button  type="info" :icon="Message" circle/>-->
        <el-icon style="margin: 20px 0 0 35px; cursor: pointer" size="20px" color="gray" @click="this.$router.push('/userinfo/message')"><message /></el-icon>

      </el-tooltip>
      <span v-show="news" class="plot">.</span>
      <span @click="feedbackEdit" style="margin: 22px 0 0 35px; cursor: pointer; color: gray; font-size: 13px">反馈</span>
    </el-menu>

  </div>
  <div>
    <el-dialog v-model="isAdd" width="50%" title="添加动物种类" center>
      <el-steps :active="active">
        <el-step title="输入动物种类" />
        <el-step title="发表一篇相关的帖子" />
        <el-step title="完成" />
      </el-steps>
      <div style="padding: 10px" v-if="active===1">
        <el-input size="large" placeholder="请输入动物种类" v-model="animal.type"></el-input>
      </div>
      <div style="padding: 10px" v-if="active===2">
        <WritePosts/>
      </div>
      <div style="padding: 10px" v-if="active===3">
        <span>操作成功，等待管理员进行审核，点击下一步退出</span>
      </div>
      <el-button style="margin-top: 12px" @click="next">下一步</el-button>
    </el-dialog>
    <el-dialog v-model="feedback" width="35%" title="反馈" center>
      <el-input size="normal" v-model="message.content" :autosize="{ minRows: 2, maxRows: 6 }" type="textarea" placeholder="请输入您要提出的意见或反馈"></el-input>
      <el-button @click="submit" size="normal" type="warning">提交</el-button>
      <el-button @click="cancel" size="normal" type="warning" plain>取消</el-button>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import WritePosts from "@/components/user/WritePosts";

export default {
  name: "UserHeader",
  components: {
    WritePosts
  },
  data() {
    return {
      activeIndex: this.$route.path,
      menuList: [],
      isPass: 1,
      headImg: 'http://120.79.190.143:9090/files/3fb81e7b876a449abb280472fc12b691',
      isLogin: false,
      isAdd: false,
      news: false,
      feedback: false,
      username: '',
      sex: '',
      birthday: '',
      Message: 'Message',
      active: 1,
      animal: {},
      message: {},
    }
  },
  created() {
    this.getNews()
    this.getMenuList()
    this.activeIndex = window.sessionStorage.getItem('activePath')
  },
  methods: {
    async getMenuList() {
      // console.log(this.isPass)
      await request.get('animal', this.isPass).then(res => {
        // console.log(res)
        this.menuList = res.data
      })
      this.isLogin = !!sessionStorage.getItem("user")
      if(this.isLogin){
        this.username = this.$store.getters.getUsername
        await request.get('/user/' + this.username).then(res => {
          console.log(res)
          this.headImg = res.data.headImg
          this.sex = res.data.sex
          this.birthday = res.data.birthday
        })
      }
    },
    getNews() {
      if(JSON.parse(sessionStorage.getItem('user'))) {
        let id = JSON.parse(sessionStorage.getItem('user')).id
        request.get('/message/new/' + id).then(res => {
          // console.log(res)
          this.news = res.data
        })
      }
    },
    setAnimal(id) {
      sessionStorage.setItem('animalId', id)
      location.reload();
    },
    allAnimals() {
      sessionStorage.removeItem('animalId')
      location.reload()
    },
    layout() {
      this.news=false
      window.sessionStorage.clear()
      if(this.$route.path.startsWith('/userinfo')){
        this.$router.push('/')
      }
    },
    toMe() {
      if(this.$route.query.userid !== undefined) {
        this.$router.push({path:'/userinfo/dynamic'})
        setTimeout(function () {
          window.location.reload();
        }, 1);
      } else {
        this.$router.push({path:'/userinfo/dynamic'})
      }
    },
    addAnimal() {
      if(!sessionStorage.getItem('user')){
        this.$message({
          type: 'warning',
          message: '请先登录',
        })
        return
      }
      this.isAdd = true
    },
    next() {
      if(this.active === 1) {
        request.post('/animal', this.animal).then(res => {
          if(res.code === '0'){
            this.$message({
              type: "success",
              message: "添加成功，请点击进行下一步"
            })
            this.active ++
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
        })
      } else if(this.active === 2) {
        this.active ++
      } else if(this.active === 3) {
        this.active = 1
        this.isAdd = false
      }
    },
    feedbackEdit() {
      if(!sessionStorage.getItem('user')){
        this.$message({
          type: 'warning',
          message: '请先登录',
        })
        return
      }
      this.feedback = true
    },
    cancel() {
      this.message = {}
      this.feedback = false
    },
    submit() {
      if(this.message.content === undefined) {
        this.$message({
          type: "warning",
          message: "请输入内容"
        })
        return
      }
      this.message.toId = 1
      this.message.fromId = JSON.parse(sessionStorage.getItem('user')).id
      this.message.time = this.getDate()
      request.post('/message', this.message).then(res => {
        if(res.code === '0'){
          this.$message({
            type: "success",
            message: "感谢您的反馈，我们会尽快处理"
          })
          this.message = {}
          this.feedback = false
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
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

<style scoped>
.el-menu-demo {
  opacity: 0.8;
}
.home-title {
  font-family: 华文彩云;
  font-size: 25px;
}
.logo {
  margin-left: 30px;
  height: 50px;
  width: 50px;
}
.dropdown {
  margin-left: 27%;
}
.el-dropdown-link {
  position: relative;
  top: 21px;
}
.userDropdown {
  margin-left: 75px;
}
.avatar {
  margin-top: 10px;
  height: 39px;
  width: 39px;
  border-radius: 50%;
  box-shadow: rgba(52, 94, 131, 0.52) 0 0 3px;
}
.plot {
  color: red;
  font-size: 50px;
  top: -28px;
  left: -8px;
  position: relative;
}
</style>