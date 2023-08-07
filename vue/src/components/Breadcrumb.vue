<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
          v-for="(item,index) in breadList"
          :key="index"
          :to="{ path: item.path }"
      >{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      breadList: [] // 路由集合
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    isHome(route) {
      return route.name === "管理台";
    },
    getBreadcrumb() {
      let matched = this.$route.matched;
      // 如果不是首页
      if (!this.isHome(matched[0])) {
        matched = [{ path: "/administration/home", name:'首页' }].concat(matched);
      }
      this.breadList = matched;
    }
  },
  created() {
    this.getBreadcrumb();
  }
}

</script>

<style scoped>
.breadcrumb {
  background-color: aliceblue;
}
</style>