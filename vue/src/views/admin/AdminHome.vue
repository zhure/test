<template>
  <div class="welcome">
    <img src="@/assets/img/admin_welcome.png" alt="一只北极熊作为欢迎背景"/>
  </div>
</template>

<script>
export default {
  name: "AdminHome"
}
</script>

<style lang="less" scoped>
.welcome {
  margin: 10px 10px 0 0;
  background-color: aliceblue;
  >img{
    width: 88%;
  }
  //height: 100%;
  //font-family: 华文行楷;
  //color: rgba(57, 139, 246, 0.52);
}

</style>