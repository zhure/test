<template>
  <div style="width: 100%; height: 100vh; overflow: hidden">
    <div>
      <img class="background" src="../../assets/img/login_img.jpg" alt="background">
    </div>
    <div>
      <Login/>
    </div>

  </div>

</template>

<script>
import Login from "@/components/UserLogin";

export default {
  name: "UserLogin",
  components:{
    Login
  }
}
</script>

<style scoped>
.background{
  width:100%;
  height:100%;  /**宽高100%是为了图片铺满屏幕 */
  z-index:-1;  /*图片叠层关系*/
  position: absolute;
}
</style>