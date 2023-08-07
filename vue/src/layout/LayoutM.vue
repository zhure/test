<template>
  <router-view />

  <van-tabbar route>
    <van-tabbar-item replace to="/home" icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item replace to="/medical" icon="shield-o">医疗</van-tabbar-item>
    <van-tabbar-item replace to="/communication" icon="smile-comment-o">社区</van-tabbar-item>
    <van-tabbar-item replace to="/info" icon="friends-o">我的</van-tabbar-item>
  </van-tabbar>

</template>

<script>
export default {
  name: "LayoutM"
}
</script>

<style scoped>

</style>