<template>
  <el-dialog v-model="dialogFormVisible" title="动物医生注册表" width="30%">
    <el-form ref="vetFormRef"
             :model="vetForm"
             :rules="rules"
             label-width="100px"
             size="normal"
             class="demo-ruleForm"
    >
      <el-form-item label="昵称" prop="nickName" style="width: 90%;">
        <el-input v-model="vetForm.nickName" placeholder="请输入昵称"/>
      </el-form-item>
      <el-form-item label="描述" prop="vetDescribe" style="width: 90%;">
        <el-input v-model="vetForm.vetDescribe" placeholder="请输入您所擅长的方向，以及对它的详细描述" type="textarea"/>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
            class="avatar-uploader"
            action="http://120.79.190.143:9090/files/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="vetForm.headImg" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="证明文件">
        <el-upload
            ref="upload"
            class="upload-demo"
            accept="application/pdf"
            action="http://120.79.190.143:9090/files/upload"
            :before-upload="beforeFileUpload"
            :limit="1"
            :on-exceed="handleExceed"
            :on-success="uploadSuccess"
            :auto-upload="false"
        >
          <template #trigger>
            <el-button type="primary">选择文件</el-button>
          </template>
<!--          <el-button class="ml-3" type="success" @click="submitUpload">-->
<!--            upload to server-->
<!--          </el-button>-->
          <template #tip>
            <div class="el-upload__tip text-red">
              只能选择一个pdf文件，新的文件将覆盖旧文件
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button class="ml-3" type="primary" @click="submitUpload">提 交</el-button>
        <el-button @click="cancel">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import request from "@/utils/request";
import {ElMessage} from "element-plus";
export default {
  name: "VetRegister",
  props: {
    userId: '',
  },
  data() {
    return {
      dialogFormVisible: true,
      vetForm: {},
      imageUrl: false,
    }
  },
  methods:{
    cancel() {
      this.$refs['upload'].clearFiles()
      this.dialogFormVisible = false;
      this.$emit('close', this.dialogFormVisible);
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
    handleAvatarSuccess(res) {
      this.vetForm.headImg = res.data
      this.imageUrl = true
    },
    uploadSuccess(res) {
      this.vetForm.realInfo = res.data
      this.vetForm.userId = this.userId
      let self = this
      this.$refs['vetFormRef'].validate(async (valid) => {
        if (valid) {
          await request.post("vet/register", this.vetForm).then(res => {
            if (res.code === '0') {
              this.$message({
                type: "success",
                message: "申请上传成功，请耐心等待审核结果",
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
    beforeFileUpload:(rawFile) => {
      if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('文件大小不能超过2MB!')
        return false
      }
      return true
    },
    handleExceed(files) {
      this.$refs['upload'].clearFiles()
      const file = files[0]
      file.uid = files[0].uid
      this.$refs['upload'].handleStart(file)
    },
    submitUpload(){
      this.$refs['upload'].submit();
    },
    // save() {
    //   let self = this
    //   this.$refs['vetFormRef'].validate(async (valid) => {
    //     if (valid) {
    //       await request.post("vet/register", this.vetForm).then(res => {
    //         if (res.code === '0') {
    //           this.$message({
    //             type: "success",
    //             message: "申请上传，请耐心等待审核结果",
    //           })
    //           self.dialogFormVisible = false;
    //         } else {
    //           this.$message({
    //             type: "error",
    //             message: res.msg
    //           })
    //         }
    //       })
    //     }
    //   })
    // },
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 97px;
  height: 97px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d3d1d1;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 27px;
  color: #cbd9da;
  width: 97px;
  height: 97px;
  text-align: center;
}
</style>