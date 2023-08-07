<template>
  <div>
    <div>
      <img class="background" src="../../assets/img/login_img.jpg" alt="background">
    </div>
    <div class="login_box">
<!--      <div class="header" >用 户 登 录</div>-->
      <!-- 登录表单区域 -->
      <el-form ref="form" :model="form" size="mini" :rules="rules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="user" placeholder="用户名" v-model="form.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input prefix-icon="lock" placeholder="密码" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="" prop="userType">
          <span style="color: #49657e; size: A3; margin-left:10px; margin-right: 10px">用户类型：</span>
          <el-select v-model="form.userType" placeholder="请选择用户类型" style="width: 65%">
            <el-option label="普通用户" value="1" />
            <el-option label="医疗人员" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <span style="margin-left: 110px; color:#ffffff;size: unset ">还没有账号？</span>
          <el-button style="margin-left: 10px" size="mini" type="text" @click="registerShow = true">点此注册</el-button>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button style="width: 100%;background-color: rgba(57,139,246,0.52)" type="primary" @click="login">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <Register v-if="registerShow" @close="close"/>
    </div>
  </div>

</template>

<script>

import Register from "@/components/Register";
import request from "@/utils/request";
import {Encrypt} from "@/utils/secret";

export default {
  name: "UserLogin",
  components:{
    Register
  },
  data() {
    return {
      form:{
        username: '',
        password: '',
        userType: '',
      },
      rules:{
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
      registerShow: false,
    }
  },
  methods: {
    login() {
      let self = this

      this.$refs['form'].validate((valid) => {
        if(valid) {
          request.post("/user/login", {
            username: this.form.username,
            password: this.form.password,
            userType: this.form.userType,
          }).then(res => {
            if(res.code === '0') {
              this.$message({
                type: "success",
                message: "登陆成功",
              })
              request.get("/user/" + self.form.username).then(res => {
                // console.log(res)
                self.$store.commit('login', res.data)
              })
              if(self.form.userType === '1'){
                this.$router.push("/")
              } else {
                this.$router.push("/im")
              }
            } else {
              this.$message({
                type: "error",
                message: res.msg
              })
            }
          })
        }
      })
    },
    close(flag) {
      this.registerShow = flag;
    }
  }
}
</script>

<style scoped>
.background{
  width:100%;
  height:100%;  /**宽高100%是为了图片铺满屏幕 */
  z-index:-1;  /*图片叠层关系*/
  position: absolute;
}
.login_box {
  width: 350px;
  height: 350px;
  /* background-color: #fff; */
  background-color: rgba(188, 208, 196, 0.98);
  border-radius: 10px;

  position: absolute;
  left: 30%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.el-form {
  padding: 32px;
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
}

.code {
  width: 45%;
}

</style>