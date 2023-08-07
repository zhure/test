<template>
  <div style="padding: 10px;">
    <div style="margin: 10px 0">
<!--      <el-input v-model="search" placeholder="请输入关键字" style="width: 20%" clearable></el-input>-->
      <el-select v-model="search" class="m-2" placeholder="Select" clearable>
        <el-option
            v-for="item in animals"
            :key="item.id"
            :label="item.type"
            :value="item.id"
        />
      </el-select>
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
    </div>
    <el-table
        :data="tableData"
        style="width: 100%"
    >
      <el-table-column prop="id" label="ID"/>
      <el-table-column label="userID">
        <template #default="scope">
          <el-button size="small" type="default" plain @click="searchUser(scope.row.userId)">查看用户信息</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名字"/>
      <el-table-column prop="address" label="地址"/>
      <el-table-column prop="detail" label="描述"/>
      <el-table-column label="图片" >
        <template #default="scope">
          <el-image
              preview-teleported="true"
              style="width: 100px; height: 100px"
              :src="scope.row.img"
              :preview-src-list="[scope.row.img]"
              fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120px">
        <template #default="scope">
          <el-button type="success" :icon="Check" size="small" plain @click="approved(scope.row)"></el-button>
          <el-button type="danger" :icon="Close" size="small" plain @click="fail(scope.row)"></el-button>
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
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "AdoptAudit",
  data() {
    return {
      tableData:[],
      animals: [],
      user:{},
      showUser: false,
      search:'',
      currentPage4:1,
      pageSize4:5,
      isPass:0,
      total:1,
      Check: 'Check',
      Close: 'Close'
    }
  },
  created() {
    this.getAnimal()
    this.load()
  },
  methods: {
    async getAnimal() {
      await request.get('animal', this.isPass).then(res => {
        // console.log(res)
        this.animals = res.data
      })
    },
    load() {
      request.get("/adoption", {
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
    // 审核通过
    async approved(row) {
      row.isPass = 1
      await request.put("/adoption", row).then(res => {
        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "审核成功",
          })
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
      let message = {}
      message.toId = row.userId
      message.fromId = 1
      message.content = '您的' + row.title + '审核已通过'
      await request.post('/message', message)
      this.load()
    },
    // 审核不通过
    async fail(row) {
      row.isPass = 2
      await request.put("/adoption", row).then(res => {
        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "审核成功",
          })
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
      // 审核不通过或失败后发送消息告诉用户
      let message = {}
      message.toId = row.userId
      message.fromId = 1
      message.content = '您的' + row.title + '审核未通过'
      await request.post('/message', message)
      this.load()
    }
  }
}
</script>

<style scoped>

</style>