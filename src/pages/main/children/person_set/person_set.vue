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
          <el-submenu :index="index+''" v-for="(ele,index) in menu_list" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ele.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                @click="router_push(item.path)"
                v-for="(item, index1) in ele.children"
                :key="index1+''+index"
                :index="index+'-'+index1"
              >{{item.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
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
      menu_list: [
        {
          title: "用户操作",
          children: [
            { path: "/person_set/to_update_person", name: "修改信息" },
          ]
        },
        {
          title: "权限管理",
          children: [
            { path: "/person_set/admin_set", name: "超级管理员" },
            { path: "/person_set/pt_set", name: "普通管理员" }
          ]
        }
      ]
    };
  },
  created() {},
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

