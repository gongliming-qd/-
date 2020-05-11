<template>
  <div>
    nihao
    <router-view></router-view>
  </div>
</template>

<script>
import {get_family_all} from '@/api/http'
export default {
  data() {
    return {};
  },
  created() {
    this.init_get_data()
  },
  methods: {
    async init_get_data(){
        let aaa = await get_family_all()
        console.log(aaa);
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
</style>

