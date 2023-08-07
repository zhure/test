<template>
  <div style="padding: 10px;">
    <div style="margin: 10px 0">
      <el-select v-model="search" class="m-2" placeholder="Select">
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
      <el-table-column fixed="right" label="Operations" width="150px">
        <template #default="scope">
          <el-button @click="getAdoptLater(scope.row.id)" v-show="scope.row.isAdopt === 1">已领养，查看后续</el-button>
          <span v-show="scope.row.isAdopt === 0">未领养</span>
<!--          <el-button type="success" :icon="Check" size="small" plain @click="approved(scope.row)"></el-button>-->
<!--          <el-button type="danger" :icon="Close" size="small" plain @click="fail(scope.row)"></el-button>-->
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
    <el-dialog title="领养后续" v-model="showLater" width="60%">
      <el-card shadow="never">
        <el-row>
          <el-col :span="2" :offset="1">
            <img class="avatar" :src="adoptLater.user['headImg']" alt="头像">
          </el-col>
          <el-col :span="19">
            <div style="margin-left: 10px">
            <span class="nick">
              {{ adoptLater.user['nickName'] }}
            </span>
              <span class="time">{{ adoptLater.time }}</span>
            </div>
          </el-col>
        </el-row>
        <div v-html="adoptLater.content"></div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "AdoptManage",
  data() {
    return {
      tableData:[],
      animals: [],
      user:{},
      adoptLater: {},
      showUser: false,
      showLater: false,
      search:'',
      currentPage4:1,
      pageSize4:5,
      isPass:1,
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
    async getAdoptLater(id) {
      await request.get('/adopt_later/' + id).then(res => {
        this.adoptLater = res.data
      })
      this.showLater = true
    },
    async getAnimal() {
      await request.get('animal', this.isPass).then(res => {
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
        this.tableData = res.data.records
        this.total = res.data.total
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
      this.load()
    }
  }
}
</script>

<style scoped>
.avatar {
  height: 51px;
  width: 51px;
  border-radius: 50%;
  box-shadow: rgba(52, 94, 131, 0.52) 0 0 3px;
}
.nick {
  padding: 5px;
  font-size: 18px;
  display: block;
  cursor: pointer;
}
.time {
  font-size: 12px;
  display: block;
}
</style>