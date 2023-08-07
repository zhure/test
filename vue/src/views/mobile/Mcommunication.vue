<template>


</template>

<script>
import request from "@/utils/request";

export default {
  name: "Mcommunication",
  data() {
    return {
      animalId:'',
      posts:[],
      isPass: 1,
      isNotice: false
      // isAdopt: 0,
    }
  },
  created() {
    this.animalId = sessionStorage.getItem('animalId')?sessionStorage.getItem('animalId'):''
    this.getPosts()
  },
  methods: {
    getPosts() {
      request.get('/post/show').then(res => {
        console.log(res)
        this.posts = res.data
      })
    },
    toUser(id) {
      this.$router.push({path:'/userinfo', query:{userid: id}})
    },
    toPost(id) {
      this.$router.push({path:"/post_detail", query:{postId:id}})
    },
    changeDate() {
      this.posts.sort((a, b) => {
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

</style>