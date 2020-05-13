<template>
  <div class="breadcrumb">
    <!-- 横线 -->
    <span class="line"></span>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, index) in title" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title:{
      type:Array
    },
  }
};
</script>

<style scoped lang="less">
.breadcrumb {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  box-sizing: border-box;
  .line {
    width: 3px;
    height: 17px;
    background: rgba(71, 164, 255, 1);
    border-radius: 2px;
    margin-right: 8px;
  }
}
</style>
