<template>
  <van-tabs v-model:active="active">
    <van-tab title="登录">

    </van-tab>
    <van-tab title="注册">

    </van-tab>
  </van-tabs>

</template>

<script>
export default {
  name: "Mlogin",
  setup() {
    const active = ref(0);
    return { active };
  },
}
</script>

<style scoped>

</style>