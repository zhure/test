<template>
  <el-tabs type="border-card" class="demo-tabs">
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><calendar /></el-icon>
          <span>个人信息</span>
        </span>
      </template>
      <el-form
        :model="form"
        size="normal"
        class="user-info"
      >
        <el-form-item class="father">
          <span class="row-title">头  像</span>
          <img class="avatar" :src="user.headImg" @click="uploadAvatar" >
          <el-dialog center v-model="headImg" title="头像" width="15%">
            <el-upload
                class="avatar-uploader"
                action="http://120.79.190.143:9090/files/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="form.headImg" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
            <div style="margin-top: 10px">
              <el-button style="margin-left: 10px" class="ml-3" type="warning" @click="save('headImg')">提 交</el-button>
              <el-button type="warning" plain @click="cancel('headImg')">取 消</el-button>
            </div>
          </el-dialog>
<!--          <span v-show="!headImg">{{ user.headImg }}</span>-->
<!--          <el-button class="child" v-show="!headImg" @click="editor('headImg')" type="text" :icon="Edit" plain>编辑</el-button>-->
<!--          <el-input size="small" v-show="headImg">{{ form.headImg }}</el-input>-->
<!--          <el-button v-show="headImg" @click="save('headImg')" size="small" type="warning" round>确定</el-button>-->
<!--          <el-button v-show="headImg" @click="cancel('headImg')" size="small" type="warning" round plain>取消</el-button>-->
        </el-form-item>
        <el-form-item class="father">
          <span class="row-title">用户名</span>
          <span v-show="!username">{{ user.username }}</span>
          <el-button class="child" v-show="!username" @click="editor('username')" type="text" :icon="Edit" plain>编辑</el-button>
          <el-input size="small" v-show="username" v-model="form.username"></el-input>
          <el-button v-show="username" @click="save('username')" size="small" type="warning" round>确定</el-button>
          <el-button v-show="username" @click="cancel('username')" size="small" type="warning" round plain>取消</el-button>
        </el-form-item>
        <el-form-item class="father">
          <span class="row-title">昵  称</span>
          <span v-show="!nickName">{{ user.nickName }}</span>
          <el-button class="child" v-show="!nickName" @click="editor('nickName')" type="text" :icon="Edit" plain>编辑</el-button>
          <el-input size="small" v-show="nickName" v-model="form.nickName"></el-input>
          <el-button v-show="nickName" @click="save('nickName')" size="small" type="warning" round>确定</el-button>
          <el-button v-show="nickName" @click="cancel('nickName')" size="small" type="warning" round plain>取消</el-button>
        </el-form-item>
        <el-form-item class="father">
          <span class="row-title">性  别</span>
          <span v-show="!sex">{{ user.sex }}</span>
          <el-button class="child" v-show="!sex" @click="editor('sex')" type="text" :icon="Edit" plain>编辑</el-button>
<!--          <el-input size="small">{{ form.sex }}</el-input>-->
          <el-radio-group v-show="sex" v-model="form.sex">
            <el-radio label="男" />
            <el-radio label="女" />
            <el-radio label="未知" />
          </el-radio-group>
          <el-button v-show="sex" @click="save('sex')" size="small" type="warning" round>确定</el-button>
          <el-button v-show="sex" @click="cancel('sex')" size="small" type="warning" round plain>取消</el-button>
        </el-form-item>
        <el-form-item class="father">
          <span class="row-title">生 日</span>
          <span v-show="!birthday">{{ user.birthday }}</span>
          <el-button class="child" v-show="!birthday" @click="editor('birthday')" type="text" :icon="Edit" plain>编辑</el-button>
<!--          <el-input size="small">{{ form.birthday }}</el-input>-->
          <el-date-picker v-if="birthday" v-model="form.birthday" value-format="YYYY-MM-DD" type="date" placeholder="Pick a day" />
          <el-button v-show="birthday" @click="save('birthday')" size="small" type="warning" round>确定</el-button>
          <el-button v-show="birthday" @click="cancel('birthday')" size="small" type="warning" round plain>取消</el-button>
        </el-form-item>
        <el-form-item class="father">
          <span class="row-title">电话号码</span>
          <span v-show="!phoneNum">{{ user.phoneNum }}</span>
          <el-button class="child" v-show="!phoneNum" @click="editor('phoneNum')" type="text" :icon="Edit" plain>编辑</el-button>
          <el-input size="small" v-show="phoneNum" v-model="form.phoneNum"></el-input>
          <el-button v-show="phoneNum" @click="save('phoneNum')" size="small" type="warning" round>确定</el-button>
          <el-button v-show="phoneNum" @click="cancel('phoneNum')" size="small" type="warning" round plain>取消</el-button>
        </el-form-item>
        <el-form-item class="father">
          <span class="row-title">电子邮箱</span>
          <span v-show="!email">{{ user.email }}</span>
          <el-button class="child" v-show="!email" @click="editor('email')" type="text" :icon="Edit" plain>编辑</el-button>
          <el-input size="small" v-show="email" v-model="form.email"></el-input>
          <el-button v-show="email" @click="save('email')" size="small" type="warning" round>确定</el-button>
          <el-button v-show="email" @click="cancel('email')" size="small" type="warning" round plain>取消</el-button>
        </el-form-item>
        <el-form-item class="father">
          <span class="row-title">住  址</span>
          <span v-show="!address">{{ user.address }}</span>
          <Locate v-show="address" @childFn="parentFn"></Locate>
          <el-button class="child" v-show="!address" @click="editor('address')" type="text" :icon="Edit" plain>编辑</el-button>
          <el-input size="small" v-show="address" type="textarea" v-model="form.address"></el-input>
          <el-button v-show="address" @click="save('address')" size="small" type="warning" round>确定</el-button>
          <el-button v-show="address" @click="cancel('address')" size="small" type="warning" round plain>取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
import request from "@/utils/request";
import {ElMessage} from "element-plus";
import Locate from "@/components/Locate";

export default {
  name: "UserInfoEdit",
  components: {
    Locate
  },
  data() {
    return {
      user: {},
      form: {},
      imageUrl: false,
      headImg: false,
      username: false,
      nickName: false,
      sex: false,
      birthday: false,
      phoneNum: false,
      email: false,
      address: false,
      Edit: 'Edit',
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.user = JSON.parse(sessionStorage.getItem("user"))
      console.log(this.user)
    },
    uploadAvatar(){
      this.headImg = true
    },
    beforeAvatarUpload: (rawFile) => {
      let types = ['image/jpeg', 'image/jpg', 'image/png'];
      const isImage = types.includes(rawFile.type);
      if (!isImage) {
        ElMessage.error('上传图片只能是 JPG、JPEG、PNG 格式!')
        return false
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('图片大小不能超过2MB!')
        return false
      }
      return true
    },
    handleAvatarSuccess(res, file) {
      // this.form.headImg = URL.createObjectURL(file.raw)
      this.form.headImg = res.data
      this.imageUrl = true
    },
    editor(isEditor) {
      this.form = JSON.parse(JSON.stringify(this.user))
      this.headImg = false
      this.username = false
      this.nickName = false
      this.sex = false
      this.birthday = false
      this.email = false
      this.address = false

      switch (isEditor){
        case 'headImg': this.headImg = true;break;
        case 'username': this.username = true;break;
        case 'nickName': this.nickName = true;break;
        case 'sex': this.sex = true;break;
        case 'birthday': this.birthday = true;break;
        case 'phoneNum': this.phoneNum = true;break;
        case 'email': this.email = true;break;
        case 'address': this.address = true;break;
        default: break;
      }
    },
    save(isEditor) {
      switch (isEditor){
        case 'headImg':
          this.user.headImg = this.form.headImg
          this.headImg = false;
          break;
        case 'username':
          this.user.username = this.form.username
          this.username = false;
          break;
        case 'nickName':
          this.user.nickName = this.form.nickName
          this.nickName = false;
          break;
        case 'sex':
          this.user.sex = this.form.sex
          this.sex = false;
          break;
        case 'birthday':
          this.user.birthday = this.form.birthday
          this.birthday = false;
          break;
        case 'phoneNum':
          if(this.form.phoneNum !== '' && !/^1[3|4|5|6|7|8][0-9]{9}$/.test(this.form.phoneNum)) {
            this.$message({
              type: 'error',
              message: '电话号码格式错误'
            })
            return
          }
          this.user.phoneNum = this.form.phoneNum
          this.phoneNum = false;
          break;
        case 'email':
          if(this.form.email !== '' && !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.form.email)) {
            this.$message({
              type: 'error',
              message: '邮箱格式错误'
            })
            return
          }
          this.user.email = this.form.email
          this.email = false;
          break;
        case 'address':
          this.user.address = this.form.address
          this.address = false;
          break;
        default: break;
      }
      console.log(this.user)
      request.put('user', this.user).then(res => {
        if (res.code === '0') {
          this.$message({
            type: 'success',
            message: '修改成功',
          })
          sessionStorage.removeItem('user')
          sessionStorage.setItem('user', JSON.stringify(this.user))
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    cancel(isEditor) {
      this.form = {}
      switch (isEditor){
        case 'headImg': this.headImg = false;break;
        case 'username': this.username = false;break;
        case 'nickName': this.nickName = false;break;
        case 'sex': this.sex = false;break;
        case 'birthday': this.birthday = false;break;
        case 'phoneNum': this.phoneNum = false;break;
        case 'email': this.email = false;break;
        case 'address': this.address = false;break;
        default: break;
      }
    },
    parentFn(address) {
      this.form.address = address
    },
  }
}
</script>

<style scoped>
.father .child{
  margin-left: 20px;
  display:none;
}

.father:hover .child{
  display:block;
}
.row-title {
  width: 56px;
  /*color: #555666;*/
  margin-right: 35px;
  padding-left: 16px;
  box-sizing: content-box;
}
.avatar {
  height: 110px;
  width: 110px;
  border-radius: 50%;
  box-shadow: rgba(86, 110, 131, 0.52) 0 0 5px;
  cursor: pointer;
}
.el-input {
  width: 200px;
  margin-right: 10px;
}
.avatar-uploader {
  margin-left: 30px;
}
</style>