<template>
  <div style="padding: 10px">

    <!--    搜索区域-->
    <el-row style="margin: 10px 0">
      <el-col :span="18">
        <el-input v-model="search" placeholder="请输入用户名或昵称" style="width: 20%" clearable></el-input>
        <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
      </el-col>
      <el-col :span="2" >
        <el-button size="small" type="success" :icon="download" @click="exportData">导出数据</el-button>
      </el-col>
      <el-col :span="2">
        <el-upload
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="onSuccess"
            :on-error="onError"
            :disabled="importDisabled"
            style="display: inline-flex;margin-right: 10px; margin-top: 0.5px;"
            action="http://120.79.190.143:9090/user/import">
          <el-button size="small" :disabled="importDisabled" type="success" :icon="importDataIcon">
            {{ importDataText }}
          </el-button>
        </el-upload>
      </el-col>
      <el-col span="2">
        <el-button type="primary" @click="registerShow = true">新增</el-button>
      </el-col>
      <!--    功能区域-->
    </el-row>
    <div>
      <el-table :data="userData" stripe >
        <el-table-column prop="id" label="ID" sortable />
        <el-table-column prop="username" label="用户名">
          <template #default="scope">
            <input type="text" style="width: 85%; color: rgba(94,29,29,0.66);" v-model="scope.row.username" v-show="scope.row.iseditor"/>
            <span v-show="!scope.row.iseditor">{{scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称">
          <template #default="scope">
            <input type="text" style="width: 85%; color: rgba(94,29,29,0.66);" v-model="scope.row.nickName" v-show="scope.row.iseditor" />
            <span v-show="!scope.row.iseditor">{{scope.row.nickName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template #default="scope">
            <el-select v-model="scope.row.sex" v-show="scope.row.iseditor">
              <el-option label="未知" value="未知"/>
              <el-option label="男" value="男"/>
              <el-option label="女" value="女"/>
            </el-select>
            <span v-show="!scope.row.iseditor">{{scope.row.sex}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="birthday" label="生日">
          <template #default="scope">
            <el-date-picker v-model="scope.row.birthday" type="date" value-format="YYYY-MM-DD" v-if="scope.row.iseditor"/>
            <span v-show="!scope.row.iseditor">{{scope.row.birthday}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phoneNum" label="电话号码">
          <template #default="scope">
            <input type="text" style="width: 85%; color: rgba(94,29,29,0.66);" v-model="scope.row.phoneNum" v-show="scope.row.iseditor" />
            <span v-show="!scope.row.iseditor">{{scope.row.phoneNum}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
          <template #default="scope">
            <input type="text" style="width: 85%; color: rgba(94,29,29,0.66);" v-model="scope.row.email" v-show="scope.row.iseditor" />
            <span v-show="!scope.row.iseditor">{{scope.row.email}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip>
          <template #default="scope">
            <input type="text" style="width: 85%; color: rgba(94,29,29,0.66);" v-model="scope.row.address" v-show="scope.row.iseditor" />
            <span v-show="!scope.row.iseditor">{{scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120px">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row, scope)" v-show="!scope.row.iseditor" plain>编辑</el-button>
            <el-button type="text" @click="handleCancel(scope.row, scope)" v-show="scope.row.iseditor">取消</el-button>
            <el-button type="text" @click="handleSave(scope.row)" v-show="scope.row.iseditor">保存</el-button>
            <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button type="danger" :icon="Delete" size="small" v-show="!scope.row.iseditor"/>
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
    </div>
  </div>
  <div>
    <Register ref="refForm" v-if="registerShow" @close="close"/>
  </div>

</template>

<script>
import request from "@/utils/request";
import Register from "@/components/Register";

import {Delete, Download, Upload} from '@element-plus/icons-vue';

export default {
  name: "UserManage",
  components: {
    Register
  },
  created() {
    this.load()
  },
  data() {
   return {
     search:'',
     currentPage4:1,
     pageSize4:10,
     total:1,
     userData:[],
     registerShow: false,
     flag: false,
     form: {},
     Delete: Delete,
     download: Download,
     // iseditor: false,
     importDataText: '导入数据',
     importDataIcon: 'Upload',
     importDisabled: false,
   }
  },
  methods: {
    // 加载数据
    load() {
      request.get("/user", {
        params: {
          pageNum: this.currentPage4,
          pageSize: this.pageSize4,
          search: this.search,
        }
      }).then(res => {
        this.userData = res.data.records
        this.total = res.data.total
      })
    },
    // 编辑
    handleEdit(row, index) {
      // this.form = JSON.parse(JSON.stringify(row))
      // this.form = JSON.parse(JSON.stringify(row))
      row.iseditor = true

    },
    // 取消编辑
    handleCancel(row, index) {
      row.iseditor = false
      this.load()
    },
    // 编辑时判断规则
    verification(form) {
      if (form.phoneNum === '' && form.email === '') {
        this.$message({
          type: 'error',
          message: '手机号和邮箱必须填一个'
        })
        return false
      } else if (form.username.length > 31) {
        this.$message({
          type: 'error',
          message: '用户名长度需小于32'
        })
        return false
      } else if (form.phoneNum !== '' && !/^1[3|4|5|6|7|8][0-9]{9}$/.test(form.phoneNum)) {
        this.$message({
          type: 'error',
          message: '电话号码格式错误'
        })
        return false
      } else if (form.email !== '' && !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(form.email)) {
        this.$message({
          type: 'error',
          message: '邮箱格式错误'
        })
        return false
      }
      return true
    },
    // 编辑后保存
    async handleSave(row, index) {
      this.form = JSON.parse(JSON.stringify(row))
      if(this.verification(this.form)) {
        await request.put('user', this.form).then(res => {
          if (res.code === '0') {
            this.$message({
              type: 'success',
              message: '修改成功',
            })
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
        row.iseditor = false
        this.load()
      }
    },
    // 关闭注册表
    close(flag) {
      this.registerShow = flag;
      this.load()
    },
    // 分页查询
    handleSizeChange() {
      this.load()
    },
    handleCurrentChange() {
      this.load()
    },
    // 删除
    async handleDelete(id) {
      await request.delete('/user/' + id).then(res => {
        if(res.code === '0'){
          this.$message({
            type: "success",
            message: "删除成功"
          })
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
      this.load()
    },
    // 导出数据为excel
    exportData() {
      this.$confirm('此操作将导出用户数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        window.open("http://120.79.190.143:9090/user/export","_parent")
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消导出'
        });
      });
    },
    // 导入文件失败后回调
    onError() {
      this.importDataText = '导入数据';
      this.importDataIcon = 'el-icon-upload2';
      this.importDisabled = false;
      this.load();
      this.$message.error("导入失败！");
    },
    // 导入文件成功后回调
    onSuccess() {
      // 成功后文本修改为原来的导入数据
      this.importDataText = '导入数据';
      // 图标修改
      this.importDataIcon = 'el-icon-upload2';
      // 将上传组件改为允许使用
      this.importDisabled = false;
      // 调用刷新数据的方法
      this.load();
      // message 弹出消息
      this.$message.success("导入成功！");
    },
    // 上传文件调用
    beforeUpload() {
      // 将文本修改为正在导入
      this.importDataText = '正在导入';
      // 修改其图标
      this.importDataIcon = 'el-icon-loading';
      // 将其上传组件暂时禁用
      this.importDisabled = true;
    }
  }

}
</script>

<style scoped>

</style>