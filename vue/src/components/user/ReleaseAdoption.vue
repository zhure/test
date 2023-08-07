<template>
  <el-tabs type="border-card" class="demo-tabs">
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><calendar /></el-icon>
          <span>发布领养信息</span>
        </span>
      </template>
      <el-form ref="form" :model="form" :rules="rules" size="normal" label-width="100px">
        <el-form-item label="动物种类" prop="animalId">
          <el-select v-model="form.animalId" class="m-2" placeholder="Select">
            <el-option
                v-for="item in animals"
                :key="item.id"
                :label="item.type"
                :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="动物图片" prop="img">
          <el-upload
              ref="adoptImg"
              class="avatar-uploader"
              action="http://120.79.190.143:9090/files/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="form.img" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="名字" prop="name">
          <el-input v-model="form.name" style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="detail">
          <el-input v-model="form.detail" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <Locate @childFn="parentFn"></Locate>
          <span style="margin-left: 10px">{{ form.address }}</span>
<!--          <Locate ref="lo" v-if="toAddress"/>-->
<!--          <el-icon size="large" style="margin-left: 10px; cursor: pointer" @click="getLocate"><location/></el-icon>-->
        </el-form-item>
        <el-form-item>
          <el-button type="warning" plain @click="reset">重 置</el-button>
          <el-button type="warning" @click="save">发 布</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
import request from "@/utils/request";
import Locate from "@/components/Locate";
import {ElMessage} from "element-plus";

export default {
  name: "ReleaseAdoption",
  components: {
    Locate
  },
  data() {
    return {
      animals:[],
      form: {},
      rules: {
        img: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        animalId: [
          { required: true, message: '请选择动物种类', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请定位住址', trigger: 'blur' }
        ]
      },
      toAddress: false,
      imageUrl: false,
    }
  },
  mounted() {
    this.getAnimal()
  },
  methods: {
    async getAnimal() {
      await request.get('animal', this.isPass).then(res => {
        // console.log(res)
        this.animals = res.data
      })
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
      this.form.img = res.data
      this.imageUrl = true
    },
    parentFn(address) {
      this.form.address = address
    },
    // getLocate() {
    //   this.toAddress=true
    //   // this.form.address = this.$refs['lo'].$data.address
    //   console.log(this.form.address)
    // },
    save() {
      this.form.userId = JSON.parse(sessionStorage.getItem('user')).id
      // console.log(this.form)
      let self = this
      this.$refs['form'].validate((valid) => {
        if(valid) {
          request.post('/adoption', this.form).then(res => {
            if(res.code === '0'){
              this.$message({
                type: "success",
                message: "发布成功，请耐心等待审核"
              })
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
    reset() {
      if(this.form.img !== '') {
        this.$refs['adoptImg'].clearFiles()
      }
      this.imageUrl = false
      this.form = {}
    }
  }
}
</script>

<style scoped>
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
  width: 570px;
  height: 297px;
  text-align: center;
}
</style>