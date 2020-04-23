<template>
  <div class="breadcrumb">
    <!-- 横线 -->
    <span class="line"></span>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>{{title1}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{title2}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{title3}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="title4">{{title4}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title1:{
      type:String
    },
    title2:{
      type:String
    },
    title3:{
      type:String
    },
    title4:{
      default:'',
      type:String
    }
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
