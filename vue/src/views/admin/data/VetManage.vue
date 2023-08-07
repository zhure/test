<template>
  <div style="padding: 10px">
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入关键字" style="width: 20%" clearable></el-input>
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
    </div>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="userId" label="userID" sortable />
      <el-table-column prop="nickName" label="昵称" />
      <el-table-column prop="vetDescribe" label="描述" />
      <el-table-column label="头像" >
        <template #default="scope">
          <el-image
              preview-teleported="true"
              style="width: 100px; height: 100px"
              :src="scope.row.headImg"
              :preview-src-list="[scope.row.headImg]"
              fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120px">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.row.userId)">
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
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
      <el-form size="normal" :model="form" label-width="120px">
        <el-form-item label="昵称">
          <el-input v-model="form.nickName" style="width: 80%;" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.vetDescribe" style="width: 80%;" />
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
              class="avatar-uploader"
              action="http://120.79.190.143:9090/files/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >

<!--            <template #file="{ file }">-->
<!--              <div>-->
<!--                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />-->
<!--                <span class="el-upload-list__item-actions">-->
<!--                  <span-->
<!--                      class="el-upload-list__item-delete"-->
<!--                      @click="handleRemove(file)"-->
<!--                  >-->
<!--                    <el-icon><Delete /></el-icon>-->
<!--                  </span>-->
<!--                </span>-->
<!--              </div>-->
<!--            </template>-->

            <img v-if="imageUrl" :src="form.headImg" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
<!--          <el-input v-model="form.headImg" style="width: 80%;" />-->
        </el-form-item>
      </el-form>
      <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="save">Confirm</el-button>
          </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import {ElMessage} from "element-plus";

export default {
  name: "VetManage",
  components: {
  },
  data() {
    return {
      form:{},
      dialogVisible:false,
      search:'',
      currentPage4:1,
      pageSize4:5,
      isPass:2,
      total:1,
      tableData:[],
      imageUrl: false,
    }
  },
  created() {
    this.load()
  },
  methods:{
    load() {
      request.get("/vet", {
        params: {
          pageNum: this.currentPage4,
          pageSize: this.pageSize4,
          search: this.search,
          isPass: this.isPass,
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    async save() {
      await request.put("/vet", this.form).then(res => {
        console.log(res)
        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "更新成功"
          })
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
      this.load()
      this.dialogVisible = false
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
    },
    handleSizeChange() {
      this.load()
    },
    handleCurrentChange() {
      this.load()
    },
    async handleDelete(id) {
      await request.delete("/vet/" + id).then(res => {
        if (res.code === '0') {
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
      console.log(res)
      this.form.headImg = res.data
      this.imageUrl = true
    },
    // handleRemove(file) {
    //   this.imageUrl = false
    // }
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 97px;
  height: 97px;
  display: block;
}
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
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