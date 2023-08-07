<template>
  <div style="padding: 10px; margin-bottom: 50px">
    <el-row>
      <el-col :span="2" :offset="2">
        <el-card style="width: 300px; height: 300px; color: #333">
          <div style="padding-bottom: 10px; border-bottom: 1px solid #ccc">在线用户<span style="font-size: 12px">（点击聊天气泡开始聊天）</span></div>
          <div style="padding: 10px 0" v-for="user in users" :key="user.username">
            <div>
              <span>{{ user.username }}</span>
              <el-icon class="el-icon-chat-dot-round" style="margin-left: 10px; font-size: 16px; cursor: pointer"
                       @click="chatUser = user.username"><chat-dot-round /></el-icon>
              <span style="font-size: 12px;color: limegreen; margin-left: 5px" v-if="user.username === chatUser">chatting...</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="20">
        <div style="width: 800px; margin: 0 auto; background-color: white;
                    border-radius: 5px; box-shadow: 0 0 10px #ccc">
          <div style="text-align: center; line-height: 50px;">
            医疗咨询室（{{ chatUser }}）
          </div>
          <div style="height: 350px; overflow:auto; border-top: 1px solid #ccc" v-html="content"></div>
          <div>
<!--            <textarea v-model="text" style="height: 160px; width: 100%; padding: 20px; border: none; border-top: 1px solid #ccc;-->
<!--             border-bottom: 1px solid #ccc; outline: none"></textarea>-->
            <div style="width: 100%; padding: 10px; border: none; border-top: 1px solid #ccc;
             border-bottom: 1px solid #ccc; outline: none">
              <div id="toolbar-container" style="z-index: 101"></div>
              <div id="editor-container" style="z-index: 100; min-height: 300px"></div>
            </div>
            <div style="text-align: right; padding-right: 10px">
              <el-button type="primary" size="mini" @click="send">发送</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import request from "@/utils/request";
import '@wangeditor/editor/dist/css/style.css'
import { createEditor, createToolbar } from "@wangeditor/editor";

let editor = null;
let toolbar;
let socket;

export default {
  name: "Im",
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      vet: {},
      isCollapse: false,
      users: [],
      chatUser: '',
      text: "",
      messages: [],
      content: '',
      vets: [],
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
  created() {
    this.init()
    this.getVets()
  },
  mounted() {
    editor = createEditor({
      selector: '#editor-container',
      config: this.editorConfig,
      mode: 'simple'
    })
    toolbar = createToolbar({
      editor,
      selector:'#toolbar-container',
      mode: 'simple'
    })
  },
  beforeUnmount() {
    if(editor == null) return
    editor.destroy()
  },
  methods: {
    getVets() {
      request.get('/vet/show').then(res => {
        this.vets = res.data
      })
      // let index
      for (let vet of this.vets) {
        this.users.filter(user => user.user !== vet.nickName)
        // index = this.users.findIndex(item => {
        //   if(item.username === vet.nickName) {
        //     return true
        //   }
        // })
        // if(index !== '') {
        //   this.users.splice(index, 1)
        //   index = ''
        // }

      }
      // console.log(this.users)
      // console.log(this.vets)
      // for (let user of this.users) {
      //   for ( let vet of this.vets) {
      //     if(user === vet) {
      //       this.users.$remove(user)
      //     }
      //   }
      // }
    },
    send() {
      this.text = editor.getHtml()
      if (!this.chatUser) {
        this.$message({type: 'warning', message: "请选择聊天对象"})
        return;
      }
      if (!this.text) {
        this.$message({type: 'warning', message: "请输入内容"})
      } else {
        if (typeof (WebSocket) == "undefined") {
          console.log("您的浏览器不支持WebSocket");
        } else {
          console.log("您的浏览器支持WebSocket");
          // 组装待发送的消息 json
          // {"from": "zhang", "to": "admin", "text": "聊天文本"}
          let message = {from: this.vet.nickName, to: this.chatUser, text: this.text}
          socket.send(JSON.stringify(message));  // 将组装好的json发送给服务端，由服务端进行转发
          this.messages.push({user: this.vet.nickName, text: this.text})
          // 构建消息内容，本人消息
          this.createContent(null, this.vet.nickName, this.text)
          this.text = '';
        }
      }
    },
    createContent(remoteUser, nowUser, text) {  // 这个方法是用来将 json的聊天消息数据转换成 html的。
      let html
      // 当前用户消息
      if (nowUser) { // nowUser 表示是否显示当前用户发送的聊天消息，绿色气泡
        html = "<div class=\"el-row\" style=\"padding: 5px 0\">\n" +
            "  <div class=\"el-col el-col-22\" style=\"text-align: right; padding-right: 10px\">\n" +
            "    <div class=\"tip left\">" + text + "</div>\n" +
            "  </div>\n" +
            "  <div class=\"el-col el-col-2\">\n" +
            "  <span class=\"el-avatar el-avatar--circle\" style=\"height: 40px; width: 40px; line-height: 40px;\">\n" +
            "    <img src=\"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png\" style=\"object-fit: cover;\">\n" +
            "  </span>\n" +
            "  </div>\n" +
            "</div>";
      } else if (remoteUser) {   // remoteUser表示远程用户聊天消息，蓝色的气泡
        html = "<div class=\"el-row\" style=\"padding: 5px 0\">\n" +
            "  <div class=\"el-col el-col-2\" style=\"text-align: right\">\n" +
            "  <span class=\"el-avatar el-avatar--circle\" style=\"height: 40px; width: 40px; line-height: 40px;\">\n" +
            "    <img src=\"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png\" style=\"object-fit: cover;\">\n" +
            "  </span>\n" +
            "  </div>\n" +
            "  <div class=\"el-col el-col-22\" style=\"text-align: left; padding-left: 10px\">\n" +
            "    <div class=\"tip right\">" + text + "</div>\n" +
            "  </div>\n" +
            "</div>";
      }
      console.log(html)
      this.content += html;
    },
    init() {
      // if(!sessionStorage.getItem("user")) {
      //   this.user.username = this.getProjectNum() + Math.floor(Math.random() * 10000)  // 如果是6位或者8位随机数，相应的 *1000000或者 *100000000就行了
      // } else {
      //   this.user = JSON.parse(sessionStorage.getItem("user"))
      // }
      this.vet = JSON.parse(sessionStorage.getItem("user")).vet
      let username = this.vet.nickName;
      let _this = this;
      if (typeof (WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
      } else {
        console.log("您的浏览器支持WebSocket");
        let socketUrl = "ws://localhost:9090/imserver/" + username;
        if (socket != null) {
          socket.close();
          socket = null;
        }
        // 开启一个websocket服务
        socket = new WebSocket(socketUrl);
        //打开事件
        socket.onopen = function () {
          console.log("websocket已打开");
        };
        //  浏览器端收消息，获得从服务端发送过来的文本消息
        socket.onmessage = function (msg) {
          console.log("收到数据====" + msg.data)
          let data = JSON.parse(msg.data)  // 对收到的json数据进行解析， 类似这样的： {"users": [{"username": "zhang"},{ "username": "admin"}]}
          if (data.users) {  // 获取在线人员信息
            _this.users = data.users.filter(user => user.username !== username)  // 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
          } else {
            // 如果服务器端发送过来的json数据 不包含 users 这个key，那么发送过来的就是聊天文本json数据
            //  // {"from": "zhang", "text": "hello"}
            if (data.from === _this.chatUser) {
              _this.messages.push(data)
              // 构建消息内容
              _this.createContent(data.from, null, data.text)
            }
          }
        };
        //关闭事件
        socket.onclose = function () {
          console.log("websocket已关闭");
        };
        //发生了错误事件
        socket.onerror = function () {
          console.log("websocket发生了错误");
        }
      }
    },
    getProjectNum () {
      const projectTime = new Date() // 当前中国标准时间
      const Year = projectTime.getFullYear() // 获取当前年份 支持IE和火狐浏览器.
      const Month = projectTime.getMonth() + 1 // 获取中国区月份
      const Day = projectTime.getDate() // 获取几号
      let CurrentDate = String(Year)
      if (Month >= 10) { // 判断月份和几号是否大于10或者小于10
        CurrentDate += Month
      } else {
        CurrentDate += '0' + Month
      }
      if (Day >= 10) {
        CurrentDate += Day
      } else {
        CurrentDate += '0' + Day
      }
      return CurrentDate
    },
  }
}

</script>

<style>
.tip {
  color: white;
  text-align: center;
  border-radius: 10px;
  font-family: sans-serif;
  padding: 10px;
  width:auto;
  display:inline-block !important;
  display:inline;
}

.right {
  background-color: deepskyblue;
}
.left {
  background-color: forestgreen;
}
</style>
