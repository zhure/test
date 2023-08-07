<template>
  <div class="common-layout">
    <el-container class="main_container" style="border: 1px solid #eee">
      <el-header height="100px" style="padding: 0; background-color: aliceblue">
        <Header/>
      </el-header>
      <el-container>
        <el-aside width="210px">
          <Aside/>
        </el-aside>
        <el-container>
          <el-main>
            <Breadcrumb/>
            <router-view/>
          </el-main>
          <el-footer height="30px" style="background-color: aliceblue">
            <Footer/>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import {onMounted} from "vue";

export default {
  name: "Layout1",
  components: {
    Header,
    Aside,
    Breadcrumb,
    Footer,
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

</style>