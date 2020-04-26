<template>
  <div>
    nihao
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  created() {
    
    axios
      .get("/api", {
        params: {
          city: '深圳'
        }
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {},
  components: {}
};
</script>

<style scoped lang="less">
</style>

