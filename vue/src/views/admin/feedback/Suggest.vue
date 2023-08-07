<template>
  <div style="padding: 10px">
    <el-card shadow="never">
      <div style="margin: 20px" v-for="(item, index) in message">
        <el-row>
          <el-col :span="1">
            <img class="min-avatar" :src="item.fromUser['headImg']">
          </el-col>
          <el-col :span="21">
            <div class="contents">
              <span>
                <span style="size: 13px; color: #932727; margin-right: 10px;cursor: pointer">{{ item.fromUser['nickName'] }}</span>
                <span>{{ item.content }}</span>
              </span>
                  <span class="time">
                {{ item.time }}
              </span>
            </div>
          </el-col>
          <el-col :span="2">
            <el-icon style="cursor: pointer; margin-top: 15px" @click="deleteMessage(item.id)"><delete /></el-icon>
          </el-col>
        </el-row>
        <el-divider/>
      </div>

    </el-card>
  </div>

</template>

<script>
import request from "@/utils/request";

export default {
  name: "Suggest",
  data() {
    return {
      toId: 1,
      message: []
    }
  },
  created() {
    this.read()
  },
  methods: {
    read() {
      request.put('/message/' + this.toId)
      request.get('/message/' + this.toId).then(res => {
        this.message = res.data
      })
    },
    deleteMessage(id) {
      request.delete('/message/' + id).then(res => {
        if(res.code === '0'){
          this.$message({
            type: "success",
            message: "删除成功"
          })
          this.read()
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.min-avatar {
  margin-top: 5px;
  height: 39px;
  width: 39px;
  border-radius: 50%;
  box-shadow: rgba(52, 94, 131, 0.52) 0 0 3px;
  cursor: pointer;
}
.time {
  font-size: 12px;
  display: block;
  color: #999999;
  >span{
    cursor: pointer;
    //margin-left: 10px;
  }
  >span:hover {
    color: #e3b48c;
  }
}
.contents {
  >span {
    display: block;
    padding: 3px;
    margin-left: 10px;
  }
}
</style>