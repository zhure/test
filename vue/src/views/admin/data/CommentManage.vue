<template>
  <div style="padding: 10px">
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入评论ID" style="width: 20%" clearable></el-input>
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
    </div>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="id" label="ID" sortable />
      <el-table-column prop="time" label="时间" sortable />
      <el-table-column prop="content" label="评论内容" width="700px"/>
      <el-table-column fixed="right" label="Operations" width="120px">
        <template #default="scope">
<!--          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>-->
          <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button :icon="Delete" type="danger"></el-button>
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
</template>

<script>
import request from "@/utils/request";

export default {
  name: "CommentManage",
  data() {
    return {
      Delete: 'Delete',
      tableData: [],
      search:'',
      currentPage4:1,
      pageSize4:10,
      total:1,
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      request.get('/comment', {
        params: {
          pageNum: this.currentPage4,
          pageSize: this.pageSize4,
          search: this.search,
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
    async handleDelete(id) {
      await request.delete("/comment/" + id).then(res => {
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
  }
}
</script>

<style scoped>

</style>