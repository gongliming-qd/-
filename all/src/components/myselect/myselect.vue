<template>
  <div class="mtset">
    <!-- 前缀 -->
    <div class="front">{{title}}</div>
    <el-select v-model="value" :placeholder="placeholder" @change="change">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
        value:'0'
    };
  },
  //  title : 标题  options:传递的值   placeholder:占位符   change:改变参数
  props: ["title", "placeholder", "options", "change"],
  components: {}
};
</script>

<style scoped lang="less">
//
.mtset {
  width: 100%;
  display: flex;
  align-items: center;
  // 前缀
  .front {
    min-width: 40px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(51, 62, 108, 1);
    margin-right: 6px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    // background-color: red;
  }
  /deep/.el-input__inner{
      height: 30px;
  }
  /deep/ .el-select__caret{
      margin-top: 5px;
  }
}
</style>
