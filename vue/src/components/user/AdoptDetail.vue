<template>
  <el-card class="details" shadow="never">
    <el-row>
      <el-col :span="1">
        <img class="avatar" :src="user.headImg" alt="头像">
      </el-col>
      <el-col :span="18">
        <div style="margin-left: 10px">
          <span class="nick" @click="toUser">{{ user.nickName }}</span>
          <span class="time">{{ adopt.time }}</span>
        </div>
      </el-col>
      <el-col :span="1">
        <el-icon v-show="!isFavorite" @click="collect" class="icon" size="30px" color="orange"><star/></el-icon>
        <el-icon v-show="isFavorite" @click="notCollect" class="icon" size="35px" color="orange"><star-filled /></el-icon>
      </el-col>
      <el-col :span="2">
        <el-button @click="applyAdopt" v-show="!isAdopt && !isMe && myApply.id === undefined" style="margin-left: 20px" size="normal" type="warning" plain>领养</el-button>
        <el-button v-show="!isAdopt && !isMe && myApply.id !== undefined"  style="margin-left: 20px" size="normal" disabled>已申请</el-button>
      </el-col>
    </el-row>
    <div style="padding: 10px">
      <el-row>
        <el-col :span="8">
          <el-image
              class="image"
              preview-teleported="true"
              :src= "adopt.img"
              :preview-src-list="[adopt.img]"
              fit="cover"
          />
        </el-col>
        <el-col :span="16">
          <div class="detail">
            <span>名字：{{ adopt.name }}</span>
            <span>描述：{{ adopt.detail }}</span>
            <span>地址：{{ adopt.address }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider/>
    <el-row v-if="!isAdopt" v-for="item in apply">
      <el-col :span="1">
        <img class="min-avatar" :src="item.user['headImg']">
      </el-col>
      <el-col :span="18">
        <div class="contents">
          <span>
            <span style="size: 13px; color: #932727; margin-right: 10px;cursor: pointer">{{ item.user['nickName'] }}</span>
            <span>申请领养 {{ adopt.name }}</span>
          </span>
        </div>
      </el-col>
      <el-col :span="5">
        <el-popconfirm title="确定选择ta为动物的新朋友?" @confirm="choose(item.user['id'])">
          <template #reference>
            <el-button v-if="isMe" type="warning" size="normal">选择</el-button>
          </template>
        </el-popconfirm>
      </el-col>
      <el-divider/>
    </el-row>
    <div v-if="isAdopt" style="margin: 10px">
      <span style="margin: 10px;color: #545151">后续...</span>
      <el-row>
        <el-col :span="1" :offset="1">
          <img class="avatar" :src="adoptLater.user['headImg']" alt="头像">
        </el-col>
        <el-col :span="19">
          <div style="margin-left: 10px">
            <span class="nick">
              {{ adoptLater.user['nickName'] }}
            </span>
            <span class="time">{{ adoptLater.time }}</span>
          </div>
        </el-col>
        <el-col :span="3">
          <el-button @click="handleEdit" v-if="isMe && !isEdit" type="warning" size="normal" plain>编辑</el-button>
        </el-col>
      </el-row>
      <div v-if="!isEdit" style="margin: 25px" v-html="adoptLater.content"></div>
      <div v-if="isEdit">
        <div id="toolbar-container" style="z-index: 101"></div>
        <div id="editor-container" style="z-index: 100; min-height: 300px"></div>
        <el-button @click="save" type="warning" size="normal">保存</el-button>
        <el-button @click="cancel" type="warning" size="normal" plain>取消</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import request from "@/utils/request";
import '@wangeditor/editor/dist/css/style.css'
import { createEditor, createToolbar } from "@wangeditor/editor";

let editor = null;
let toolbar;
export default {
  name: "AdoptDetail",
  data() {
    return {
      adoptId: "",
      adopt: {},
      user: {},
      adoptFav: {},
      myApply: {},
      isFavorite: false,
      isMe: false,
      isAdopt: false,
      isEdit: false,
      apply: [],
      adoptLater: {},
      editorConfig: {
        placeholder: '请输入内容',
        MENU_CONF: {
          uploadImage: {
            server:'http://120.79.190.143:9090/files/editor/upload',
            fieldName: 'file',
            base64LimitSize: 5 * 1024,}
        }
      },
    }
  },
  async created() {
    this.adoptId = this.$route.query.adoptId
    await this.getAdopt()
    this.getApply()
    if (sessionStorage.getItem('user')) {
      this.getFavorite()
      if(!this.isMe&&this.adopt.isAdopt===0)
        this.getIsApply()
    }
    if(this.adopt.isAdopt===1) {
      this.isMe = false
      await this.getAdoptLater()
      this.isAdopt = true
    }
    console.log(this.adoptLater)
  },
  beforeUnmount() {
    if(editor == null) return
    editor.destroy()
  },
  methods:{
    async handleEdit() {
      this.isEdit = true
      await this.$nextTick(() => {
        editor = createEditor({
          selector: '#editor-container',
          config: this.editorConfig,
          mode: 'simple',
          html: this.adoptLater.content
        })
        toolbar = createToolbar({
          editor,
          selector: '#toolbar-container',
          mode: 'simple'
        })
      })
    },
    save() {
      // console.log(this.adoptLater.content)
      this.adoptLater.content = editor.getHtml()
      request.put('/adopt_later', this.adoptLater).then(res => {
        if (res.code === '0') {
          this.$message({
            type: 'success',
            message: '编辑成功',
          })
          editor.destroy()
          this.isEdit = false
          this.getAdoptLater()
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    cancel() {
      editor.destroy()
      this.isEdit = false
      this.getAdoptLater()
    },
    async getAdopt() {
      await request.get('/adoption/' + this.adoptId).then(res => {
        // console.log(res)
        this.adopt = res.data
        this.user = this.adopt.user
      })
      if(JSON.parse(sessionStorage.getItem('user'))?this.user.id === JSON.parse(sessionStorage.getItem('user')).id:false) {
        this.isMe = true
      }
    },
    async getAdoptLater() {
      await request.get('/adopt_later/' + this.adoptId).then(res => {
        this.adoptLater = res.data
        // console.log(this.adoptLater)
      })
      if(JSON.parse(sessionStorage.getItem('user'))?this.adoptLater.user['id'] === JSON.parse(sessionStorage.getItem('user')).id:false) {
        this.isMe = true
      }
      // console.log(this.adoptLater.user['id'])
      // console.log(this.isMe)
    },
    getApply() {
      request.get('/apply/' + this.adoptId).then(res => {
        this.apply = res.data
      })
    },
    getFavorite() {
      request.get('/adopt_fav', {
        params: {
          userId: JSON.parse(sessionStorage.getItem('user')).id,
          adoptId: this.adoptId
        }
      }).then(res => {
        if(res.data !== null) {
          this.adoptFav = res.data
          this.isFavorite = true
        }
      })
    },
    getIsApply() {
      request.get('/apply', {
        params: {
          userId: JSON.parse(sessionStorage.getItem('user')).id,
          adoptId: this.adoptId
        }
      }).then(res => {
        if(res.data != null) {
          this.myApply = res.data
        }
      })
    },
    applyAdopt() {
      if(!sessionStorage.getItem('user')){
        this.$message({
          type: 'warning',
          message: '请先登录',
        })
        return
      }
      this.myApply.userId = JSON.parse(sessionStorage.getItem('user')).id
      this.myApply.adoptId = this.adoptId
      request.post('/apply', this.myApply).then(res => {
        if (res.code === '0') {
          this.$message({
            type: 'success',
            message: '已申请，请等待...',
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    async choose(id) {
      // let adoptLater = {}
      this.adoptLater.adoptId = this.adoptId
      this.adoptLater.userId = id
      this.adoptLater.time = this.getDate()
      this.adopt.isAdopt = 1
      await request.put('/adoption', this.adopt)
      await request.delete('/apply/' + this.adoptId)
      await request.post('/adopt_later', this.adoptLater).then(res => {
        if (res.code === '0') {
          this.$message({
            type: 'success',
            message: '操作成功',
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    toUser() {
      if(!sessionStorage.getItem('user')){
        this.$message({
          type: 'warning',
          message: '请先登录',
        })
        return
      }
      this.$router.push({path:'/userinfo', query:{userid: this.user.id}})
    },
    collect() {
      if(!sessionStorage.getItem('user')){
        this.$message({
          type: 'warning',
          message: '请先登录',
        })
        return
      }
      this.adoptFav.userId = JSON.parse(sessionStorage.getItem('user')).id
      this.adoptFav.adoptId = this.adoptId
      request.post('/adopt_fav', this.adoptFav).then(res => {
        if (res.code === '0') {
          this.$message({
            type: 'success',
            message: '收藏成功',
          })
          this.isFavorite = true
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    notCollect() {
      request.delete('/adopt_fav/' + this.adoptFav.id).then(res => {
        if (res.code === '0') {
          this.$message({
            type: 'success',
            message: '取消收藏成功',
          })
          this.isFavorite = false
        } else {
          this.$message({
            type: 'error',
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
.details {
  margin-left: 7%;
  width: 86%;
  min-height: 300px;
}
.avatar {
  height: 51px;
  width: 51px;
  border-radius: 50%;
  box-shadow: rgba(52, 94, 131, 0.52) 0 0 3px;
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
}
.image {
  width: 100%;
}
.detail {
  span {
    padding: 10px;
    display: block;
  }
}
.icon {
  cursor: pointer;
}
.min-avatar {
  margin-top: 5px;
  height: 39px;
  width: 39px;
  border-radius: 50%;
  box-shadow: rgba(52, 94, 131, 0.52) 0 0 3px;
  cursor: pointer;
}
//.time {
//  font-size: 12px;
//  display: block;
//  color: #999999;
//  >span{
//    cursor: pointer;
//    //margin-left: 10px;
//  }
//  >span:hover {
//    color: #e3b48c;
//  }
//}
.contents {
  >span {
    display: block;
    padding: 3px;
    margin-left: 10px;
  }
}
</style>