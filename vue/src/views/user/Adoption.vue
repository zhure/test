<template>
  <div class="main-view">
<!--    领养动物区头部-->
    <div style="padding: 20px; margin-left: 30px">
      <span style="font-size: 31px;color: #9d6017;margin-right: 900px">领养动物区</span>
      <el-button v-show="isAdopt===0" @click="load" type="text">已领养</el-button>
      <el-button v-show="isAdopt===1" @click="load" type="text">未领养</el-button>
      <el-divider direction="vertical"/>
      <el-button @click="changeDate" type="text">按时间排序</el-button>
    </div>
  </div>
  <div class="main-view">
    <el-row>
      <el-col
          v-for="(adoption, index) in adoptions"
          :key="adoption"
          :span="7"
          :offset="1"
      >
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <el-image
              class="image"
              preview-teleported="true"
              :src= "adoption.img"
              :preview-src-list="[adoption.img]"
              fit="cover"
          />
          <div style="padding: 14px">
            <span>{{ adoption.name }}</span>
            <el-row>
              <el-col :span="24">
                <div class="information-title">
                  {{ adoption.detail }}
                </div>
              </el-col>
            </el-row>
            <div class="bottom">
              <time class="time">{{ adoption.time }}</time>
              <el-button @click="toDetail(adoption.id)" type="text" class="button">详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Adoption",
  data() {
    return{
      animalId:'',
      adoptions: [],
      isAdopt: 0,
    }
  },
  created() {
    this.animalId = sessionStorage.getItem('animalId')?sessionStorage.getItem('animalId'):null
    this.getAdoptions()
  },
  methods: {
    getAdoptions() {
      // console.log(this.animalId)
      request.get('/adoption/show', {
        params:{
          isAdopt: this.isAdopt,
          animalId: this.animalId
        }}).then(res => {
        // console.log(res)
        this.adoptions = res.data
      })
    },
    load() {
      if(this.isAdopt === 0) {
        this.isAdopt = 1
      } else {
        this.isAdopt = 0
      }
      this.getAdoptions()
    },
    toUser(id) {
      if(!sessionStorage.getItem('user')){
        this.$message({
          type: 'warning',
          message: '请先登录',
        })
        return
      }
      this.$router.push({path:'/userinfo', query:{userid: id}})
    },
    toDetail(id) {
      this.$router.push({path:'/adopt_detail', query:{adoptId: id}})
    },
    changeDate() {
      this.adoptions.sort((a, b) => {
        let aTimeString = a.time
        let bTimeString = b.time
        aTimeString = aTimeString.replace(/-/g, '/')
        bTimeString = bTimeString.replace(/-/g, '/')
        let aTime = new Date(aTimeString).getTime()
        let bTime = new Date(bTimeString).getTime()
        return bTime - aTime
      })
    }
  }
}
</script>

<style scoped>
.main-view {
  margin-left: 3%;
  width: 90%;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.time {
  font-size: 12px;
  color: #999;
}

.information-title {
  margin-top: 3px;
  font-size: 12px;
  color: #999;
  width: 100%;   /*一定要设置宽度，或者元素内含的百分比*/
  overflow:hidden; /*溢出的部分隐藏*/
  white-space: nowrap; /*文本不换行*/
  text-overflow:ellipsis;/*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/
}

.image {
  width: 100%;
  height: 290px;
  display: block;
}

</style>