<template>
  <el-tabs type="border-card" class="demo-tabs">
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><calendar /></el-icon>
          <span>发布交流贴</span>
        </span>
      </template>
      <el-form ref="form" :model="form" :rules="rules" size="normal" label-width="100px">
        <!--    <el-form-item v-show="isAdmin" label="发帖人" prop="userId">管理员</el-form-item>-->
        <el-form-item label="动物种类" prop="animalId">
          <el-select v-model="form.animalId" placeholder="Select">
            <el-option
                v-for="item in animals"
                :key="item.id"
                :label="item.type"
                :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-card shadow="never" body-style="padding:2px;min-height:200px">
            <div id="toolbar-container" style="z-index: 101"></div>
            <div id="editor-container" style="z-index: 100; min-height: 300px"></div>
          </el-card>
        </el-form-item>

        <el-form-item>
          <el-button type="warning" plain @click="reset">重 置</el-button>
          <el-button type="warning" @click="save">发 布</el-button>
        </el-form-item>

      </el-form>
    </el-tab-pane>
  </el-tabs>

<!--  <template #footer>-->
<!--          <span class="dialog-footer">-->

<!--          </span>-->
<!--  </template>-->
</template>

<script>
import request from "@/utils/request";
import '@wangeditor/editor/dist/css/style.css'
import { createEditor, createToolbar } from "@wangeditor/editor";

let editor = null;
let toolbar;
export default {
  name: "WritePosts",
  data() {
    return {
      animals: [],
      form: {},
      editorConfig: {
        placeholder: '请输入内容',
        MENU_CONF: {
          uploadImage: {
            server:'http://120.79.190.143:9090/files/editor/upload',
            fieldName: 'file',
            base64LimitSize: 5 * 1024,},
          // onSuccess(file, res) {          // JS 语法
          //   console.log(`${file.name} 上传成功`, res)
          // },
          // customInsert(res, insertFn) {                  // JS 语法
          //   // res 即服务端的返回结果
          //
          //   // 从 res 中找到 url alt href ，然后插入图片
          //   console.log(res)
          //   insertFn(url, alt, href)
          // },

          // hooks: {
          //   customInsert: function (insertImg, result, editor) {
          //     console.log(result)
          //     var url = result.data;
          //     insertImg(url)
          //   }
          // }
        }
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        animalId: [
          { required: true, message: '请选择动物种类', trigger: 'change' }
        ]
      },
      isPass: 1,
    }
  },
  mounted() {
    this.getAnimal()
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
    async getAnimal() {
      // console.log(this.$route.path)
      // console.log(this.isPass)
      if(this.$route.path !== '/userinfo/write_posts'){
        this.isPass = 0
      }
      console.log(this.isPass)
      await request.get('animal', {
        params: {
          isPass: this.isPass
        }
      }).then(res => {
        console.log(res)
        this.animals = res.data
      })
    },
    reset() {
      this.form = {}
      editor.clear()
    },
    save() {
      this.form.userId = JSON.parse(sessionStorage.getItem('user')).id
      this.form.content = editor.getHtml()
      this.form.time = this.getDate()
      let self = this
      this.$refs['form'].validate((valid) => {
        if(valid) {
          request.post('/post', this.form).then(res => {
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

<style scoped>

</style>