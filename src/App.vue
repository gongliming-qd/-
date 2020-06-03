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
        username: localStorage.getItem("username")
      };
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
