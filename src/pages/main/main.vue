<template>
  <div>
    nihao
    <router-view></router-view>
  </div>
</template>

<script>
import {http} from '../../api/ajax'
export default {
  data() {
    return {};
  },
  created() {
    http
      .get("/api/signing/", {
        params: {
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

