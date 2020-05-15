<template>
  <div class="_tabselect_main">
    <div
      class="one_secect"
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
    list_data: { type: Array }, // 传递的数据列表
    index:Number
  },
  methods: {
    select_btn(index) {
      this.select_index = index; // 更改当前组件的下标
      this.$emit("action_select", index);
    }
  },
  created(){
    this.select_index = this.index || 0
  },
  components: {}
};
</script>

<style scoped lang="less">
._tabselect_main {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .one_secect{
    margin-right: 60px;
    &:last-child{
      margin-right: 0px;
    }
  }
  > div {
    padding: 11px 14px;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: white;
    transition: all 0.4s;
    &:hover{
      border-bottom: 2px solid #47a4ff;
    color: #47a4ff;
    }
  }
  .select {
    border-bottom: 2px solid #47a4ff;
    color: #47a4ff;
  }
}
</style>
