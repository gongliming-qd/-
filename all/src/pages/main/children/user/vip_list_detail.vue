<template>
  <div>
    <!-- 面包屑导航 -->
    <breadnav class="breadnav" :title1="'用户管理'" :title2="'会员管理'" :title3="'会员列表'" :title4="'会员详情'" />
    <!-- 标题导航 -->
    <div class="header_nav">
      <!-- 标题 -->
      <div class="header_nav_title">会员详情</div>
      <!-- 中线 -->
      <div class="line"></div>
      <!-- tabselect选择 -->
      <tabselect :list_data='["基本信息", "课程订单", "积分订单", "积分流水", "收货地址"]' :tabaction="tabaction"/>
    </div>
    <!-- 基本信息 -->
    <div class="base_info"></div>
  </div>
</template>

<script>
// 1. 导入面包屑导航
import breadnav from "../../../../components/breadNav/breadnav";
// 2. 导入tab选择
import tabselect from '../../../../components/tabselect/tabselect'
export default {
  data() {
    return {
        // 控制页面显示哪个组件
        show_index:0
    };
  },
  methods: {
    //   tabselect选择 -- 切换传参
    tabaction(index){
        this.show_index = index
    }
  },
  components: {
    breadnav, tabselect
  }
};
</script>

<style scoped lang="less">
// 标题导航
.header_nav {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  padding: 0 20px;
  box-sizing: border-box;
  // 标题
  .header_nav_title {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(61, 64, 71, 1);
    height: 57px;
    display: flex;
    align-items: center;
  }
  // 中线
  .line {
    width: 100%;
    height: 1px;
    background-color: rgba(224, 224, 224, 1);
  }
  
}
// 基本信息
.base_info{
    width: 100%;
    height: 650px;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 8px
}
</style>
