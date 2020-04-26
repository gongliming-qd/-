<template>
  <div class="pagination_style">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5, 7, 10, 15]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    currentPage4: { default: 1, type: Number }, // 默认当前第几页
    total:{type: Number},   // 总页数
    handleCurrentChange:{   // 当前选择第几页
        type:Function
    },
    handleSizeChange:{   // 当前页数的改变
        type:Function   
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
.pagination_style{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
