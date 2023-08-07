<template>
  <div style="padding: 10px;">
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入关键字" style="width: 20%" clearable></el-input>
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
      <el-button type="primary" style="margin-left: 5px" @click="add">新增</el-button>
    </div>
    <el-table
        :data="tableData"
        style="width: 100%"
    >
      <el-table-column prop="id" label="ID"/>
      <el-table-column label="用户信息">
        <template #default="scope">
          <el-button size="small" type="default" plain @click="searchUser(scope.row.userId)">查看用户信息</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="animalId" label="animalId"/>
      <el-table-column prop="title" label="标题"/>
      <el-table-column label="内容">
        <template #default="scope">
          <el-button size="small" @click="details(scope.row.content)">查看内容</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="时间"/>
      <el-table-column fixed="right" label="Operations" width="120px">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button type="text">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页-->
    <div style="margin: 10px 0">
      <el-pagination
          v-model:currentPage="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[5, 10, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog title="用户信息" v-model="showUser" width="30%">
      <el-form size="normal">
        <el-form-item><span>用户名：{{user.username}}</span></el-form-item>
        <el-form-item><span>昵称：{{user.nickName}}</span></el-form-item>
        <el-form-item><span>性别：{{user.sex}}</span></el-form-item>
        <el-form-item><span>生日：{{user.birthday}}</span></el-form-item>
        <el-form-item><span>电话号码：{{user.phoneNum}}</span></el-form-item>
        <el-form-item><span>电子邮箱：{{user.email}}</span></el-form-item>
        <el-form-item><span>住址：{{user.address}}</span></el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="内容" v-model="vis" width="50%">
      <el-card shadow="never">
        <div v-html="detail"></div>
      </el-card>
    </el-dialog>

    <el-dialog title="Tips" v-model="dialogVisible" width="60%" :before-close="beforeClose">
      <el-form ref="form" :model="form" :rules="rules" size="normal" label-width="100px">
        <el-form-item v-show="isAdmin" label="发帖人" prop="userId">管理员</el-form-item>
        <el-form-item label="动物种类" prop="animalId">
          <el-select v-model="form.animalId" class="m-2" placeholder="Select">
            <el-option
                v-for="item in animals"
                :key="item.id"
                :label="item.type"
                :value="item.id"
            />
          </el-select>
<!--          <el-input v-model="form.animalId" style="width: 30%"></el-input>-->
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-card shadow="never" body-style="padding:2px;min-height:200px">
<!--            <MyEditor ref="editorRef"/>-->
            <div id="toolbar-container"></div>
            <div id="editor-container"></div>
          </el-card>
<!--          <el-input v-model="form.content" style="width: 80%"></el-input>-->
        </el-form-item>

      </el-form>
      <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancel">Cancel</el-button>
            <el-button type="primary" @click="save">Confirm</el-button>
          </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import '@wangeditor/editor/dist/css/style.css'
import { createEditor, createToolbar } from "@wangeditor/editor";

let editor = null;
let toolbar;
export default {
  name: "PostManage",
  // components: {
  //   MyEditor
  // },
  data() {
    return {
      tableData:[],
      animals: [],
      user:{},
      form: {},
      detail: '',
      showUser: false,
      vis: false,
      dialogVisible:false,
      isAdmin: false,
      search:'',
      currentPage4:1,
      pageSize4:5,
      isPass:1,
      total:1,
      // disabled:false,
      Check: 'Check',
      Close: 'Close',
      editorConfig: {
        placeholder: '请输入内容',
        MENU_CONF: {
          uploadImage: {
            server:'http://120.79.190.143:9090/files/editor/upload',
            fieldName: 'file',
            base64LimitSize: 5 * 1024,}
        }
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        // content: [
        //   { required: true, message: '请输入内容', trigger: 'blur' }
        // ],
        animalId: [
          { required: true, message: '请选择动物种类', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      request.get("/post", {
        params: {
          pageNum: this.currentPage4,
          pageSize: this.pageSize4,
          search: this.search,
          isPass: this.isPass,
        }
      }).then(res => {
        // console.log(res)
        this.tableData = res.data.records
        this.total = res.data.total
      })
      //     .catch(function (error) {
      //   console.log('error：'+ error);
      // })
    },
    async getAnimal() {
      await request.get('animal', this.isPass).then(res => {
        // console.log(res)
        this.animals = res.data
      })
    },
    handleSizeChange() {
      this.load()
    },
    handleCurrentChange() {
      this.load()
    },

    async searchUser(id) {
      await request.get("/user/post/" + id).then(res => {
        this.user = res.data
      })
      this.showUser = true
    },
    details(content) {
      this.detail = content
      console.log(this.detail)
      this.vis = true
    },
    handleDelete(id) {
      request.delete('/post/' + id).then(res => {
        if(res.code === '0'){
          this.$message({
            type: "success",
            message: "删除成功"
          })
          this.load()
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
    async handleEdit(row) {
      this.form = row
      await this.getAnimal()
      this.dialogVisible = true
      await this.$nextTick(() => {
        editor = createEditor({
          selector: '#editor-container',
          config: this.editorConfig,
          mode: 'simple',
          html: this.form.content
        })
        toolbar = createToolbar({
          editor,
          selector: '#toolbar-container',
          mode: 'simple'
        })
      })
    },
    add() {
      this.form.userId = 1
      this.getAnimal()
      this.isAdmin = true
      this.dialogVisible = true
      this.$nextTick(() => {
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
      })
    },
    save() {
      // console.log(JSON.stringify(editor.getHtml()))
      this.form.content = editor.getHtml()
      this.form.isPass = 1
      this.form.time = this.getDate()
      console.log(this.form.time)
      console.log(this.form.id)
      let self = this
      this.$refs['form'].validate((valid) => {
        if(valid) {
          if(this.form.id === undefined) {
            request.post('/post', this.form).then(res => {
              if(res.code === '0'){
                this.$message({
                  type: "success",
                  message: "添加成功"
                })
                editor.destroy()
                self.dialogVisible = false
                self.isAdmin = false
                self.load()
              } else {
                this.$message({
                  type: "error",
                  message: res.msg
                })
              }
            })
          } else {
            request.put('/post', this.form).then(res => {
              if(res.code === '0'){
                this.$message({
                  type: "success",
                  message: "修改成功"
                })
                editor.destroy()
                this.dialogVisible = false
                this.isAdmin = false
                this.load()
              } else {
                this.$message({
                  type: "error",
                  message: res.msg
                })
              }
            })
          }
        }
      })

    },
    beforeClose(done){
      if(editor !== null) {
        editor.destroy()
        this.isAdmin = false
        this.form = {}
      }
      done()
    },
    cancel() {
      editor.destroy()
      this.dialogVisible = false
      this.isAdmin = false
      this.form = {}
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