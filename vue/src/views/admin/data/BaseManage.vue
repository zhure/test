<template>
  <div style="padding: 10px">

    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入基地名称" style="width: 20%" clearable></el-input>
      <el-select style="margin-left: 5px" v-model="pId" class="m-2" placeholder="Select" clearable>
        <el-option
            v-for="item in provincial"
            :key="item.pid"
            :label="item.province"
            :value="item.pid"
        />
      </el-select>
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
      <el-button type="primary" @click="dialogVisible=true">新增</el-button>
    </div>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="id" label="ID" sortable />
      <el-table-column prop="name" label="基地名称" />
      <el-table-column prop="contactWay" label="联系方式" width="600px"/>
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
    <el-dialog title="流浪动物基地" center v-model="dialogVisible" width="30%">
      <el-form size="normal" :model="form" label-width="120px">
        <el-form-item label="所在省份">
          <el-select size="normal" v-model="form.pid" class="m-2" placeholder="Select" clearable>
            <el-option
                v-for="item in provincial"
                :key="item.pid"
                :label="item.province"
                :value="item.pid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="基地名称">
          <el-input size="normal" v-model="form.name" style="width: 80%;" ></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input size="normal" v-model="form.contactWay" style="width: 80%;" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
          <span class="dialog-footer">
            <el-button size="normal" @click="cancel">取消</el-button>
            <el-button size="normal" type="primary" @click="save">确认</el-button>
          </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "BaseManage",
  data() {
    return {
      search: '',
      pId: '',
      currentPage4: 1,
      pageSize4: 10,
      total: 1,
      tableData: [],
      provincial: [],
      form: {},
      dialogVisible: false,
    }
  },
  created() {
    this.getProvincial()
    this.load()
  },
  methods: {
    load() {
      request.get('/base', {
        params: {
          pageNum: this.currentPage4,
          pageSize: this.pageSize4,
          search: this.search,
          pId: this.pId
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    getProvincial() {
      request.get('/provincial').then(res => {
        this.provincial = res.data
      })
    },
    handleSizeChange() {
      this.load()
    },
    handleCurrentChange() {
      this.load()
    },
    handleEdit(row) {
      this.form = row
      this.dialogVisible = true
    },
    handleDelete(id) {
      request.delete('/base/' + id).then(res => {
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
    save() {
      if(this.form.id === undefined) {
        request.post('/base', this.form).then(res => {
          if(res.code === '0'){
            this.$message({
              type: "success",
              message: "添加成功"
            })
            this.load()
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
        })
      } else {
        request.put('/base', this.form).then(res => {
          if(res.code === '0'){
            this.$message({
              type: "success",
              message: "更新成功"
            })
            this.load()
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
        })
      }
      this.dialogVisible = false
    },
    cancel() {
      this.form = {}
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>