<template>
  <div style="padding: 10px;">
    <el-row>
      <el-col :span="19">
        <div v-if="animal.id === undefined" style="margin: 10px 0">暂未有用户请求添加</div>
        <div v-if="animal.id !== undefined" style="margin: 10px 0">
          <span>用户请求添加：</span>
          <span style="margin: 0 50px 0 10px; font-size: 18px; color: #99a9bf">{{ animal.type }}</span>
          <el-popconfirm title="通过后以下帖子也将通过？" @confirm="approved">
            <template #reference>
              <el-button type="success" :icon="Check" size="normal" plain></el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm title="确定不通过？将被删除，相应帖子将被删除" @confirm="fail">
            <template #reference>
              <el-button type="danger" :icon="Close" size="normal" plain></el-button>
            </template>
          </el-popconfirm>
<!--          <el-button type="success" :icon="Check" size="normal" plain @click="approved"></el-button>-->
<!--          <el-button type="danger" :icon="Close" size="normal" plain @click="fail"></el-button>-->
        </div>
      </el-col>
      <el-col :span="5">
        <div style="margin: 10px 0;">
          <el-input v-model="newAnimal.type" placeholder="请输入动物种类" style="width: 70%" clearable></el-input>
          <el-popconfirm title="确定要新增动物种类？" @confirm="submit">
            <template #reference>
              <el-button style="margin-left: 5px" type="primary">新增</el-button>
            </template>
          </el-popconfirm>
          <!--      <el-button type="primary" @click="submit">新增</el-button>-->
        </div>
      </el-col>
    </el-row>
    <el-card class="detail" shadow="never" v-for="(post, index) in posts">
      <div v-if="index === num">
        <el-row>
          <el-col :span="19">
            <div v-if="num === postLen-1">
              <el-button disabled>到底了</el-button>
            </div>
            <div v-if="num !== postLen-1">
              <el-button @click="next">下一条</el-button>
            </div>
          </el-col>
          <el-col :span="5">
            <el-popconfirm title="确定不通过？将被删除" @confirm="delete_post(post.id)">
              <template #reference>
                <el-button type="danger" :icon="Close" size="small" plain></el-button>
              </template>
            </el-popconfirm>
          </el-col>
        </el-row>
        <div style="display: block; padding: 20px">
          <span class="title">{{ post.title }}</span>
        </div>
        <el-row>
          <el-col :span="1" :offset="1">
            <img class="avatar" :src="post.user['headImg']" alt="头像">
          </el-col>
          <el-col :span="21">
            <div style="margin-left: 10px">
              <span class="nick">{{ post.user['nickName'] }}</span>
              <span class="time">{{ post.time }}</span>
            </div>
          </el-col>
        </el-row>
        <div style="margin: 25px" v-html="post.content"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "AnimalAudit",
  data() {
    return {
      animal: {},
      posts: [],
      postLen: 0,
      num: 0,
      newAnimal: {},
      Check: 'Check',
      Close: 'Close',
    }
  },
  created() {
    this.load()
  },
  methods: {
    async load() {
      // this.num = 0
      // this.animal = {}
      // this.postLen = 0
      await request.get('/animal', {
        params: {
          isPass: 0
        }
      }).then(res => {
        // this.animals = res.data
        if(res.data.length > 0) {
          this.animal = res.data[0]
          // console.log(res)
        }
      })
      // console.log(this.animal.id)
      if(this.animal.id === undefined)
        return
      await request.get('/post/animal/' + this.animal.id).then(res => {
        // console.log(res)
        this.posts = res.data
        this.postLen = res.data.length
      })
    },
    submit() {
      this.newAnimal.isPass = 1
      request.post('/animal', this.newAnimal).then(res => {
        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "添加成功"
          })
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
    async approved() {
      for (const post of this.posts) {
        let p = post
        p.isPass = 1
        await request.put('/post', p)
      }
      this.animal.isPass = 1
      await request.put('/animal', this.animal).then(res => {
        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "审核成功"
          })
          this.animal={}
          this.posts=[]
          this.postLen=0
          this.load()
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
    async fail() {
      for (const post of this.posts) {
        await request.delete('/post/' + post.id)
      }
      await request.delete('/animal/' + this.animal.id).then(res => {
        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "审核成功"
          })
          this.posts=[]
          this.postLen=0
          this.animal = {}
          this.load()
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
    next() {
      this.num ++
    },
    delete_post(id) {
      request.delete('/post/' + id).then(res => {
        if (res.code === '0') {
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
    }
  }
}
</script>

<style lang="less" scoped>
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
  color: #999999;
>span{
  cursor: pointer;
  margin-left: 3px;
}
>span:hover {
  color: #e3b48c;
}
}
.title {
  margin-left: 20px;
  font-size: 28px;
}
</style>