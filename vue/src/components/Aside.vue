<template>
  <div :style="{'width':(isCollapse ? '64px' : '210px')}">
    <div>
      <el-radio-group v-model="isCollapse" style="margin-bottom: 0px">
        <div class="toggle-button" @click="change" :label="label">
          <span style="color: cornflowerblue" v-show="show">=—————————></span>
          <img class="logo" src="@/assets/img/logo.jpg" >
        </div>
      </el-radio-group>
      <el-menu
          unique-opened
          router
          text-color="rgba(103, 130, 145, 0.92)"
          class="el-menu-vertical-demo"
          :default-active="path"
          :collapse="isCollapse"
          :collapse-transition="false"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><documentCopy /></el-icon>
            <span>数据管理</span>
          </template>
          <el-menu-item-group>
            <el-sub-menu index="1-1">
              <template #title>
                <el-icon><stamp /></el-icon>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/administration/userinfo">普通用户</el-menu-item>
              <el-menu-item index="/administration/vet_info">医疗人员</el-menu-item>
            </el-sub-menu>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-sub-menu index="1-2">
              <template #title>
                <el-icon><bicycle /></el-icon>
                <span>行为数据</span>
              </template>
              <el-menu-item index="/administration/posts">帖子管理</el-menu-item>
              <el-menu-item index="/administration/adopt">领养管理</el-menu-item>
              <el-menu-item index="/administration/comments">评论管理</el-menu-item>
            </el-sub-menu>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/administration/stray_animal_base">
              <el-icon><location /></el-icon>
              基地管理</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><documentChecked /></el-icon>
            <span>审核操作</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/administration/vet_audit">医疗申请审核</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/administration/post_audit">用户帖子审核</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/administration/adopt_audit">领养发布审核</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/administration/animal_audit">增加动物种类申请</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><helpFilled /></el-icon>
            <span>反馈处理</span>
          </template>
<!--          <el-menu-item-group>-->
<!--            <el-menu-item>-->
<!--              <el-icon><location /></el-icon>-->
<!--              <span>投诉</span>-->
<!--            </el-menu-item>-->
<!--          </el-menu-item-group>-->
          <el-menu-item-group>
            <el-menu-item index="/administration/suggest">
              <el-icon><creditCard /></el-icon>
              <span>建议</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script>

export default {
  name: "Aside",
  data() {
    return {
      isCollapse: false,
      label: false,
      show: true,
      path: this.$route.path
    }
  },
  methods: {
    change() {
      this.label = !this.label;
      this.show = !this.show;
      this.isCollapse = !this.isCollapse;
    },
  }
}
</script>

<style scoped>
.logo{
  width: 50px;
  height: 30px;
}
.el-menu-vertical-demo{
  background-color: aliceblue;
}
.toggle-button {
  background-color: #ffffff;
  font-size: 10px;
  line-height: 32px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>