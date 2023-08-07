<template>
  <el-dialog v-model="dialogFormVisible" title="用户注册表" width="30%">
    <el-form ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        size="normal"
        class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username" style="width: 90%;" required>
        <el-input v-model="ruleForm.username" placeholder="请输入2-32位用户名"/>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName" style="width: 90%;">
        <el-input v-model="ruleForm.nickName" placeholder="请输入昵称，默认为用户名"/>
      </el-form-item>
      <el-form-item label="密码" prop="password" style="width: 90%;" required>
        <el-input v-model="ruleForm.password" placeholder="请输入6位及以上密码" show-password/>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirm" style="width: 90%;" required>
        <el-input v-model="ruleForm.confirm" placeholder="请输入6位及以上密码" show-password/>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男" />
          <el-radio label="女" />
          <el-radio label="未知" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-date-picker v-model="ruleForm.birthday" value-format="YYYY-MM-DD" type="date" placeholder="Pick a day" />
      </el-form-item>
      <div style="height: 0">
        <span style="color:red; margin-left: 25px">*</span>
      </div>
      <el-form-item label="电话号码" label-width="110px" prop="phoneNum" style="width: 90%;">
        <el-input v-model="ruleForm.phoneNum" placeholder="请输入电话号码"/>
      </el-form-item>
      <el-form-item label="或 邮箱" label-width="110px" prop="email" style="width: 90%;">
        <el-input v-model="ruleForm.email" placeholder="请输入邮箱地址"/>
      </el-form-item>
      <el-form-item label="住址" prop="address" style="width: 90%;">
        <Locate @childFn="parentFn"></Locate>
        <el-input v-model="ruleForm.address" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">提 交</el-button>
        <el-button @click="cancel">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import request from "@/utils/request";
import Locate from "@/components/Locate";

export default {
  name: "Register",
  components: {Locate},
  data() {
    let checkPhone = (rule, value, callback) => {
      let phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
      if (!value && this.ruleForm.email == '') {
        callback(new Error('电话号码或邮箱必须填一个'))
      } else {
        setTimeout(() => {

          if (!Number.isInteger(+value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (phoneReg.test(value) || !value) {
              callback()
            } else {
              callback(new Error('电话号码格式错误'))
            }
          }
        }, 100)
      }

    };
    let checkEmail = (rule, value, callback) => {
      let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if(!value && this.ruleForm.phoneNum == '') {
        callback(new Error('电话号码或邮箱必须填一个'))
      } else {
        setTimeout(() => {
          if (emailReg.test(value) || !value) {
            callback()
          } else {
            callback(new Error("邮箱格式错误"))
          }
        }, 100)
      }
    };
    let checkname = (rule, value, callback) => {
      if(value == '') {
        callback(new Error("用户名不能为空"))
      }
      setTimeout(() => {
        if(value.length > 31) {
          callback(new Error("长度应小于32"))
        } else {
          callback()
        }
      })
    }
    let checkpw = (rule, value, callback) => {
      if(value == '') {
        callback(new Error("请输入密码"))
      } else if(value.length < 6 || value.length > 32) {
        callback(new Error("长度应大于等于6并小于等于32"))
      } else {
        if(this.ruleForm.confirm !== '') {
          this.$refs.ruleFormRef.validateField('confirm')
        }
        callback()
      }
    }
    let checkpw2 = (rule, value, callback) => {
      if(value == '') {
        callback(new Error("请再次输入密码"))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: true,
      ruleForm: {
        username: '',
        nickName: '',
        password: '',
        confirm: '',
        sex: '未知',
        birthday: '',
        phoneNum: '',
        email: '',
        address: ''
      },

      rules: {
        username: [
          { require: true, validator: checkname, trigger: 'blur'},
        ],
        password: [
          { require: true, validator: checkpw, trigger: 'blur'},
        ],
        confirm: [
          { require: true, validator: checkpw2, trigger: 'blur'},
        ],
        phoneNum: [
          { require: false, validator: checkPhone, trigger: 'blur'},
        ],
        email: [
          { require: false, validator: checkEmail, trigger: 'blur'}
        ]
      },

    }
  },
  methods: {
    cancel() {
      this.dialogFormVisible = false;
      this.$emit('close', this.dialogFormVisible);
    },
    save() {
      let self = this
      this.$refs['ruleFormRef'].validate(async (valid) => {
        if (valid) {
          // if(this.form.password !== this.form.confirm) {
          //   this.$message({
          //     type:"error",
          //     message:"2次输入密码不一致"
          //   })
          //   return
          // }
          await request.post("user/register", this.ruleForm).then(res => {
            if (res.code === '0') {
              this.$message({
                type: "success",
                message: "success",
              })
              self.dialogFormVisible = false;
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
    parentFn(address) {
      this.ruleForm.address = address
    },
  }
}
</script>

<style scoped>

</style>