<template>
  <div style="width: 100%; height: 100vh; overflow: hidden">
    <div>
      <img class="background" src="../../assets/img/login_img.jpg" alt="background">
    </div>
    <div class="login_box">
      <div class="header">管 理 员 登 录</div>
      <el-form ref="form" :model="form" :rules="rules" size="normal" label-width="60px" :hide-required-asterisk="true">
        <el-form-item prop="accountNum" label="账 号">
          <el-input prefix-icon="avatar" placeholder="账号" v-model="form.accountNum" style="width: 90%;" />
        </el-form-item>
        <el-form-item prop="password" label="密 码">
          <el-input prefix-icon="lock" placeholder="密码" v-model="form.password" style="width: 90%;" show-password/>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 89%;background-color: rgba(57,139,246,0.52)" type="primary" @click="login">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import {Encrypt} from "@/utils/secret";

export default {
  name: "AdminLogin",
  data() {
    return {
      form: {},
      rules: {
        accountNum: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    login() {
      let self = this
      this.$refs['form'].validate((valid) => {
        if(valid) {
          request.post("admin/login", {
            accountNum: this.form.accountNum,
            password: Encrypt(this.form.password),
          }).then(res => {
            if (res.code === '0') {
              this.$message({
                type: "success",
                message: "登陆成功",
              })
              self.$store.commit('adminLogin', self.form)
              this.$router.push("/administration/home")
              // var path = this.$router.query.redirect
              // this.$router.replace({path: path === '/' || path === undefined ? '/home' : path})
              //
            } else {
              this.$message({
                type: "error",
                message: res.msg,
              })
            }
          })
        }
      })
    },
  },
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
  width: 390px;
  height: 300px;
  /* background-color: #fff; */
  background-color: rgba(188, 208, 196, 0.98);
  border-radius: 10px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.header {
  font-family: 华文彩云;
  color: #501818;
  font-size: 29px;
  text-align: center;
  padding: 30px 0
}
.el-form {
  padding: 32px;
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
}
</style>