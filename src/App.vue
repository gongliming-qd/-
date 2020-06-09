<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { get_userinfo_by_username } from "@/api/http";

export default {
  name: "app",
  methods: {
    async get_user() {
      let data = {
        username: localStorage.getItem("username")||''
      };
      // 如果没存储, 那么不请求数据了
      if(data.username == ''){
        this.$router.replace('/login')
        return
      }
      let aaa = await get_userinfo_by_username(data);
      console.log(aaa);
      this.$store.dispatch("set_user", aaa.data.results[0]);
    }
  },
  created() {
    this.get_user()
  }
};
</script>

<style lang="less">
</style>
