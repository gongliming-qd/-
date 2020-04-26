<template>
  <div class="main">
    <div
      v-for="(item, index) in list_data"
      :class="index==select_index? 'select':''"
      :key="index"
      @click="select_btn(index)"
    >{{item}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select_index: 0
    };
  },
  props: {
    list_data: { type: Array },  // 传递的数据列表
    tabaction: { type: Function } // 更改选择的参数
  },
  methods: {
    select_btn(index) {
      this.select_index = index;  // 更改当前组件的下标
      this.tabaction(index);  // 当前选择的下标传递给外界
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
.main {
    margin-top: 10px;
  display: flex;
  align-items: center;
  > div {
    padding: 11px 14px;
    border-bottom: 2px solid white;
    margin-right: 8px;
    cursor: pointer;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(61, 64, 71, 1);
  }
  .select {
    border-bottom: 2px solid #47a4ff;
  }
}
</style>
