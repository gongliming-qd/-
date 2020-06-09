<template>
  <div>
    <!-- 导航和主内容 -->
    <div class="main">
      <div class="menu_left">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="black"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <div  v-for="(ele,index) in menu_list" :key="index">
            <el-submenu v-if="ele.limit.includes($store.state.user.weight)" :index="index+''">
              <template slot="title" >
                <i class="el-icon-location"></i>
                <span>{{ele.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  @click="router_push(item.path)"
                  v-for="(item, index1) in ele.children"
                  :key="index1+''+index"
                  :index="index+'-'+index1"
                >
                  <template v-if="item.limit.includes($store.state.user.weight)">{{item.name}}</template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </div>
      <div class="box_right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import tabselect from "../../../../components/tabselect/tabselect";
export default {
  data() {
    return {
      // 竖向菜单
      menu_list: []
    };
  },
  created() {
    // 1. 获取菜单列表
    this.menu_list = this.$store.state.all_pages_router[2];
    console.log(this.menu_list);
  },
  methods: {
    router_push(path) {
      this.$router.replace("/main" + path);
    }
  },
  components: { tabselect }
};
</script>

<style scoped lang="less">
// 导航和主内容
.main {
  position: absolute;
  left: 0;
  top: 60px;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;

  .menu_left {
    height: 100%;
    width: 250px;
    background-color: black;
    padding: 2px;
    box-sizing: border-box;
  }
  .box_right {
    flex: 1;
    height: 100%;
    background-color: #f5f7f9;
  }
}
</style>

