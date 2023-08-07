<template>
  <div class="common-layout">
<!--    <img class="background" src="@/assets/img/maple_leaf.jpg" alt="枫叶背景">-->
    <el-container class="main_container">
      <el-container>
        <el-header style="padding: 0">
          <UserHeader/>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
      <el-footer>
        <Footer/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import UserHeader from "@/components/UserHeader";
import Footer from "@/components/Footer";
import {onMounted} from "vue";

export default {
  name: "Layout2",
  components: {
    UserHeader,
    Footer
  },
  setup () {
    const bodyScale = () => {
      let devicewidth = document.documentElement.clientWidth//获取当前分辨率下的可是区域宽度
      let scale = devicewidth / 1536 // 分母——设计稿的尺寸
      document.body.style.zoom = scale//放大缩小相应倍数
    }
    onMounted(() => {
      bodyScale()
      window.onresize = () => {
        return (() => {
          bodyScale()
        })()
      }
    })
  }
}
</script>

<style scoped>
.common-layout {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main_container {
  height: 100%;
}
.background {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  z-index: -1;
}
</style>