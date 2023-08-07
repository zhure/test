<template>
  <div style="margin-left: 5%; width: 90%">
    <el-carousel :interval="4000" type="card" height="350px">
      <el-carousel-item v-for="item in imgItems" :key="item">
        <img :src="item.img" :alt="item.alt">
<!--        <h3>{{ item }}</h3>-->
      </el-carousel-item>
    </el-carousel>
    <el-row>
      <el-col :span="11">
        <el-card class="box-card" shadow="hover" body-style="padding:0" @mouseenter="mouChange($event)" @mouseleave="mouChange1($event)">
          <el-row>
            <img class="medical" :class="mouseenter===true?'change':'change1'" src="@/assets/img/medical.jpg" alt="两只小猫看病">
            <!--      <img class="head" src="@/assets/img/sleepyCat.jpg" alt="睡觉的小猫">-->
            <div class="doctor" :class="mouseenter===true?'change':'change1'">
              <span @click="this.$router.push('/rescue_animal')">医疗模块</span>
            </div>
          </el-row>
        </el-card>
        <img style="height: 130px;" src="@/assets/img/cat.png" alt="一堆卡通猫">
        <span style="font-family: 华文隶书;font-size: 24px; color: #9d6017">我们提倡：领养代替购买</span>
      </el-col>
      <el-col :span="13">
        <el-card body-style="padding:0">
          <img @click="this.$router.push('/communicate')" class="img" src="@/assets/img/bird.png" alt="一只鹤">
        </el-card>
        <el-card body-style="padding:0">
          <img @click="this.$router.push('/adoption')" class="img" src="@/assets/img/stray_cat.png" alt="流浪猫">
        </el-card>
      </el-col>
    </el-row>

    <el-divider/>
    <el-row>
      <el-col :span="8">
        <el-card>
          <div v-for="post in posts">
            <el-row v-if="animalId === '' ? true : post.animal['id'] - animalId === 0">
              <el-col :span="6">
                <img class="avatar" :src="post.user['headImg']" alt="头像" @click="toUser(post.user['id'])">
                <div style="margin-left: 10px">
                  <span class="nick" @click="toUser(post.user['id'])">{{ post.user['nickName'] }}</span>
                </div>
              </el-col>
              <el-col :span="18">
                <div class="post">
                  <span class="title" @click="toPost(post.id)">{{ post.title }}</span>
                  <span class="time">{{ post.time }}</span>
                </div>
              </el-col>
              <el-divider />
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row>
          <el-col
              v-for="(adoption, index) in adoptions"
              :key="adoption"
              :span="10"
              :offset="2"
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Home",
  data() {
    return {
      imgItems:[
        {
          img:'http://120.79.190.143:9090/files/stray_cat',
          alt:'一群流浪的猫咪',
        },
        {
          img:'http://120.79.190.143:9090/files/stray_dog',
          alt:'为一只流浪狗做的家',
        },
        {
          img:'http://120.79.190.143:9090/files/kiss_bird',
          alt:'一对亲嘴的鹦鹉',
        },
      ],
      mouseenter: false,
      animalId:'',
      adoptions: [],
      isAdopt: 0,
      posts:[],
      isPass: 1,
    }
  },
  created() {
    this.animalId = sessionStorage.getItem('animalId')?sessionStorage.getItem('animalId'):''
    this.getPosts()
    this.getAdoptions()
  },
  methods: {
    getPosts() {
      request.get('/post/show').then(res => {
        // console.log(res)
        this.posts = res.data
      })
    },
    getAdoptions() {
      console.log(this.animalId)
      request.get('/adoption/show', {
        params:{
          isAdopt: this.isAdopt,
          animalId: this.animalId
        }}).then(res => {
        // console.log(res)
        this.adoptions = res.data
      })
    },
    toUser(id) {
      this.$router.push({path:'/userinfo', query:{userid: id}})
    },
    toPost(id) {
      this.$router.push({path:"/post_detail", query:{postId:id}})
    },
    toDetail(id) {
      this.$router.push({path:'/adopt_detail', query:{adoptId: id}})
    },
    mouChange() {
      this.mouseenter = true
    },
    mouChange1() {
      this.mouseenter = false
    }
  }

}
</script>

<style lang="less" scoped>
.img {
  width: 100%;
  height: 220px;
  cursor: pointer;
}
.post {
  span {
    display: block;
  }
}
.avatar {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  box-shadow: rgba(52, 94, 131, 0.52) 0 0 3px;
  margin-top: 5px;
  margin-left: 27px;
  cursor: pointer;
}
.nick {
  padding: 5px;
  margin-left: 15px;
  font-size: 16px;
  display: block;
  cursor: pointer;
}
.nick:hover {
  color: #e3b48c;
}
.title {
  color: #38230b;
  font-size: 26px;
  padding-top: 10px;
  padding-left: 10px;
}
.title:hover {
  color: rgb(213, 175, 124);
  cursor: pointer;
}
.time {
  font-size: 12px;
  padding-top: 10px;
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
.box-card {
  text-align: center;
  /*margin-left: 10%;*/
  width: 97%;
  height: 302px;
  background-color: rgba(255, 255, 255, 0.7);
  /*opacity: 0.7;*/
    .medical {
      size: 3000px;
      width: 577px;
      height: 302px;
      z-index: 0;
    }
    .doctor {
      background: rgba(255, 255, 255, 0.7);
      width: 577px;
      height: 302px;
      z-index: 1;
      >span {
        position: relative;
        top: 60px;
        font-size: 50px;
        font-family: 华文行楷;
        color:rgba(0,0,0,0.45);
        cursor: pointer;
      }
    }
}
.box-card .change {
  animation: myMou 1s;
  animation-fill-mode: forwards;
}
.box-card .change1 {
  animation: myMou1 1s;
  animation-fill-mode: forwards;
}
@keyframes myMou {
  0% {
    margin-right: 0px;
  }
  100% {
    margin-right: -577px;
  }
}
@keyframes myMou1 {
  0% {
    margin-right: -577px;
  }
  100% {
    margin-right: 0px;
  }
}
.head {
  size: 300px;
  height: 600px;
  width: 100%;
}
.el-carousel__item img {
  size:3000px;
  width: 100%;
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>