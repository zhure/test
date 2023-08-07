<template>
  <div style="padding: 10px;">
    <el-table
        :data="tableData"
        style="width: 100%"
    >
      <el-table-column prop="userId" label="userID"/>
      <el-table-column prop="nickName" label="昵称"/>
      <el-table-column prop="vetDescribe" label="描述"/>
      <el-table-column prop="headImg" label="头像">
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
      <el-table-column label="资料">
        <template #default="scope">
          <el-button type="default" plain @click="readInfo(scope.row.realInfo)">下载文件</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120px">
        <template #default="scope">
          <el-button type="success" :icon="Check" size="small" plain @click="approved(scope.row.userId)"></el-button>
          <el-button type="danger" :icon="Close" size="small" plain @click="fail(scope.row.userId)"></el-button>
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

<!--    <iframe v-if="disabled" :src="url" width="90%" height="90%"></iframe>-->
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "VetAudit",
  data() {
    return {
      tableData:[],
      search:'',
      currentPage4:1,
      pageSize4:5,
      isPass:1,
      total:1,
      // disabled:false,
      url:'',
      Check: 'Check',
      Close: 'Close'
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      request.get("/vet", {
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
    readInfo(realInfo) {
      this.url = realInfo
      window.open(realInfo, '_parent')
      // this.disabled = !this.disabled
    },
    // 审核通过
    async approved(userId) {
      await request.put("/vet/" + userId).then(res => {
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
    async fail(userId) {
      await request.delete("/vet/" + userId).then(res => {
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

</style>