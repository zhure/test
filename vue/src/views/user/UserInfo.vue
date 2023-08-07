<template>
  <div>
    <img class="cats" src="@/assets/img/cats.png" alt="一群卡通喵">
  </div>
  <el-card class="head" shadow="never">
    <el-row>
      <el-col :span="3">
        <img class="avatar" :src="form.headImg" alt="用户头像">
      </el-col>
      <el-col class="info" :span="14">
        <span>
          <span style="font-size: 25px">{{ form.nickName }}</span>
          <el-icon color="pink" v-show="form.sex === '女'"><female /></el-icon>
          <el-icon color="blue" v-show="form.sex === '男'"><male /></el-icon>
        </span>
        <div style="flex: 1"></div>
        <span style="font-size: 10px">用户名： {{ form.username }}</span>
        <span style="font-size: 13px">
        <el-icon color="orange"><sugar /></el-icon>
          {{ form.birthday }}
        </span>
      </el-col>
      <el-col :span="3">
        <el-button @click="follow" v-show="!isAttention && !isMe" size="normal" style="margin-top: 35px" type="warning" plain>关注</el-button>
        <el-button @click="notFollow" v-show="isAttention && !isMe" size="normal" style="margin-top: 35px">取消关注</el-button>
        <div style="display:block;margin-top: 25px;">
          <el-button @click="showAttentions=true" type="text" size="normal" style="color: rosybrown">关注</el-button>
          <span style="font-size: 16px;margin-right: 10px;padding: 2px;color: #999999">{{ attention_length }}</span>
          <el-button @click="showFans=true" type="text" size="normal" style="color: rosybrown">粉丝</el-button>
          <span style="font-size: 16px;margin-right: 10px;padding: 2px;color: #999999">{{ fan_length }}</span>
        </div>
        <div>
          <el-dialog v-model="showAttentions" title="关注列表" width="30%" center>
            <div v-for="item in attentions">
              <el-row align="center">
                <el-col :span="5">
                  <img @click="toUser(item.user['id'])" :src="item.user['headImg']" class="min-avatar">
                </el-col>
                <el-col :span="13">
                  <span @click="toUser(item.user['id'])" style="cursor: pointer; position: relative; top: 12px;font-size: 18px">{{ item.user['nickName'] }}</span>
                </el-col>
                <el-col :span="6">
                  <el-button @click="notFollowIt(item.id)" v-show="isMe" style="margin-top: 10px" size="normal" plain>取消关注</el-button>
                </el-col>
              </el-row>
              <el-divider/>
            </div>
          </el-dialog>
          <el-dialog v-model="showFans" title="粉丝列表" width="35%" center>
            <div v-for="item in fans">
              <el-row>
                <el-col :span="5">
                  <img @click="toUser(item.user['id'])" :src="item.user['headImg']" class="min-avatar">
                </el-col>
                <el-col :span="13">
                  <span @click="toUser(item.user['id'])" style="cursor: pointer; position: relative; top: 12px;font-size: 18px">{{ item.user['nickName'] }}</span>
                </el-col>
                <el-col :span="6">
<!--                  <el-button @click="notFollowIt(item.id)" style="margin-top: 10px" size="normal" plain>取消关注</el-button>-->
                </el-col>
              </el-row>
              <el-divider/>
            </div>
          </el-dialog>
        </div>
      </el-col>
      <el-col :span="4">
        <img style="width: 130px" src="@/assets/img/claw.png" alt="一排猫爪印">
      </el-col>
    </el-row>
  </el-card>
  <el-row>
    <el-card class="vet-info" shadow="never">
      <div v-if="!isMe">
        <img style="width: 37px;" src="@/assets/img/aclaw.png" alt="一只爪印">
        <div style="flex: 1"></div>
        <el-popover
            placement="top-start"
            :width="100"
            trigger="hover"
            content="点我私信,喵~"
        >
          <template #reference>
            <img style="width: 90%; margin-top: 60px;cursor: pointer" @click="toLetter = !toLetter" src="@/assets/img/aside_cat.png" alt="一只卡通猫">
          </template>
        </el-popover>
        <el-card v-if="toLetter" shadow="hover" header="有什么想对我说的？" style="color: #da9f6c">
          <el-input v-model="message.content" :autosize="{ minRows: 2, maxRows: 9 }" type="textarea" placeholder="输入你想对我说的话"></el-input>
          <el-button @click="submit" type="warning" plain>私信</el-button>
        </el-card>
      </div>
      <div v-if="isMe" class="aside">
        <img src="@/assets/img/aclaw.png" alt="一只爪印">
        <div style="flex: 1"></div>
        <p><router-link to="/userinfo/dynamic">个人动态信息</router-link></p>
        <p><router-link to="/userinfo/editor">编辑个人信息</router-link></p>
        <p><router-link to="/userinfo/write_posts">发布交流贴子</router-link></p>
        <p><router-link to="/userinfo/release_adoption">发布领养信息</router-link></p>
        <p><router-link to="/userinfo/message">查询消息记录</router-link></p>
        <!--      <router-link to=""></router-link>-->
        <p v-if="form.userType === 1" @click="registerShow=true" size="large">注册成为动物医生</p>
        <div class="vet" v-if="form.userType === 2">
          <el-divider />
          <span style="color: #9d6017">医生名片</span>
          <img :src="form.vet['headImg']" alt="头像">
          <span>
            {{ form.vet['nickName']}}
          </span>
          <span>{{ form.vet['vetDescribe']}}</span>
          <el-icon class="child" size="17px" @click="vetEdit"><edit /></el-icon>
          <el-dialog center v-model="vetDialog" title="医生信息" width="27%">
            <el-form :model="vet" size="normal">
              <el-form-item label="昵称：">
                <el-input v-model="vet.nickName"></el-input>
              </el-form-item>
              <el-form-item label="描述：">
                <el-input v-model="vet.vetDescribe" type="textarea"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <el-button type="warning" size="small" @click="update">保存</el-button>
              <el-button type="warning" size="small"  plain @click="cancel">取消</el-button>
            </template>
          </el-dialog>
        </div>
        <VetRegister :userId="form.id" v-if="registerShow" @close="close"/>
      </div>
    </el-card>
    <el-card class="main-view" shadow="never" body-style="padding:0">
      <router-view/>
    </el-card>
  </el-row>

</template>

<script>
import VetRegister from "@/components/VetRegister";
import request from "@/utils/request";

export default {
  name: "UserInfo",
  data() {
    return {
      registerShow: false,
      username: this.$store.getters.getUsername,
      form: JSON.parse(sessionStorage.getItem('user')),
      vet: {},
      attention: {},
      message: {},
      attentions: [],
      fans: [],
      attention_length: '',
      fan_length: '',
      userid: -1,
      isMe: false,
      vetDialog: false,
      isAttention: false,
      showAttentions: false,
      showFans: false,
      toLetter: false,
    }
  },
  components: {
    VetRegister
  },
  created() {
    this.userid = this.$route.query.userid?this.$route.query.userid:this.form.id
    this.load()
    this.getAttentions()
    this.getFans()
  },
  methods: {
    close(flag) {
      this.registerShow = flag;
    },
    load() {
      if(this.form.id - this.userid === 0){
        this.isMe = true
      }
      if(this.isMe === false) {
      //  查询用户开放信息
        request.get('/attention', {
          params: {
            userId: this.form.id,
            attentionId: this.userid
          }
        }).then(res => {
          // console.log(res)
          if(res.data !== null) {
            this.attention = res.data
            this.isAttention = true
          }
        })
        request.get('/user/post/' + this.userid).then(res => {
          this.form = res.data
        })
      }
    },
    //获取关注列表
    getAttentions() {
      request.get('/attention/' + this.userid).then(res => {
        // console.log(res)
        this.attentions = res.data
        this.attention_length = res.data.length
      })
    },
    //获取粉丝列表
    getFans() {
      request.get('/attention/fan/' + this.userid).then(res => {
        // console.log(res)
        this.fans = res.data
        this.fan_length = res.data.length
      })
    },
    toUser(id) {
      this.$router.push({path:'/userinfo', query:{userid: id}})
      setTimeout(function () {
        window.location.reload();
      }, 1);
    },
    vetEdit() {
      this.vet = JSON.parse(JSON.stringify(this.form.vet))
      this.vetDialog = true
    },
    update() {
      request.put('/vet', this.vet).then(res => {
        if (res.code === '0') {
          this.$message({
            type: 'success',
            message: '修改成功',
          })
          this.form.vet = this.vet
          // sessionStorage.removeItem('user')
          sessionStorage.setItem('user', JSON.stringify(this.form))
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
      this.vetDialog = false
    },
    cancel() {
      this.vet = {}
      this.vetDialog = false
    },
    //关注
    follow() {
      // let attention;
      this.attention.userId = JSON.parse(sessionStorage.getItem('user')).id
      this.attention.attentionId = this.userid
      request.post('/attention', this.attention).then(res => {
        if (res.code === '0') {
          this.$message({
            type: 'success',
            message: '关注成功',
          })
          this.isAttention = true
          this.fan_length += 1
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    async notFollow() {
      // let attention;
      // attention.userId = JSON.stringify(sessionStorage.getItem('user')).id
      // attention.attentionId = this.userid
      if (this.attention === {}) {
        let user = JSON.parse(sessionStorage.getItem('user'))
        await request.get('/attention', {
          params: {
            userId: user.id,
            attentionId: this.userid
          }
        }).then(res => {
          this.attention = res.data
          // console.log(res)
          // if(res.data !== null) {
          //   this.isAttention = true
          // }
        })
      }
      request.delete('/attention/' + this.attention.id).then(res => {
        if (res.code === '0') {
          this.$message({
            type: 'success',
            message: '取消关注成功',
          })
          this.isAttention = false
          this.fan_length -= 1
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    notFollowIt(id) {
      request.delete('/attention/' + id).then(res => {
        if (res.code === '0') {
          this.$message({
            type: 'success',
            message: '取消关注成功',
          })
          if(this.showAttentions === true) {
            this.getAttentions()
          }
          if(this.showFans === true) {
            this.getFans()
          }
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    submit() {
      if(this.message.content === undefined) {
        this.$message({
          type: "warning",
          message: "请输入内容"
        })
        return
      }
      this.message.toId = this.userid
      this.message.fromId = JSON.parse(sessionStorage.getItem('user')).id
      this.message.time = this.getDate()
      request.post('/message', this.message).then(res => {
        if(res.code === '0'){
          this.$message({
            type: "success",
            message: "私信发送成功"
          })
          this.message = {}
          this.toLetter = false
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
    // load() {
      // this.form = JSON.parse(sessionStorage.getItem("user"))
      // request.get("/user/" + this.username).then(res => {
      //   console.log(res)
      //   this.form = res.data
      // })
    // }

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
.cats {
  margin-left: 60%;
  width: 23%;
}
.head {
  /*background-image: url("../../assets/img/hudie.jpg");*/
  /*background-size: 1000px;*/
  /*background-repeat: no-repeat;*/
  margin-left: 7%;
  width: 86%;
  min-height: 130px;
}
.info {
  >span {
    display: block;
    padding: 5px;
  }
}
.vet-info {
  margin-left: 7%;
  margin-top: 7px;
  width: 19%;
}
.avatar {
  //margin: 83px 0 0 130px;
  height: 110px;
  width: 110px;
  border-radius: 50%;
  box-shadow: rgba(86, 110, 131, 0.52) 0 0 5px;
  //position: absolute;
}
.min-avatar {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  box-shadow: rgba(86, 110, 131, 0.52) 0 0 5px;
  cursor: pointer;
}
.aside {
  text-align: left;

  >p{
    margin-left: 20%;
    padding: 15px;
    cursor: pointer;
    >a {
      text-decoration: none;
      color: black;
    //margin-left: 10%;
    //padding: 15px;
  }
    >a:hover {
      color:orange;
    }
  }
  >p:hover {
    color: orange;
  }
  >img{
    width: 39px;
  }
}
.main-view {
  margin: 7px;
  width: 66.5%;

}
.vet {
  text-align: center;
  >span{
    display: block;
    padding: 9px;
  }
  >img{
    height: 79px;
    width: 69px;
    border-radius:10px;
  }
}
.vet .child{
  margin-left: 20px;
  display:none;
}

.vet:hover .child{
  display:block;
  cursor: pointer;
}
.child:hover {
  color: coral;
}
</style>