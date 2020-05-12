<template>
  <div>
    <!-- 顶部 -->
    <div class="top_nav">
      <div class="left_title">
          利明哥哥的个人网站
      </div>
      <div class="right_menu"></div>
    </div>
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
import { get_family_all } from "@/api/http";
export default {
  data() {
    return {
      menu_list: [
        {
          title: "用户操作",
          children: [
            { path: "/to_register", name: "注册" },
            { path: "/to_update_psw", name: "修改密码" }
          ]
        },
        {
          title: "用户操作",
          children: [
            { path: "/to_register", name: "注册" },
            { path: "/to_update_psw", name: "修改密码" }
          ]
        }
      ]
    };
  },
  created() {
    this.init_get_data();
  },
  methods: {
    async init_get_data() {
      let aaa = await get_family_all();
      console.log(aaa);
    },
    router_push(path) {
      this.$router.push("/main" + path);
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
.top_nav{
  width: 100%;
  background-color: black;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left_title{
    color: white;
    font-size: 25px;
    margin-left: 35px;
  }
}
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
    width: 350px;
    background-color: black;
    padding: 2px;
    box-sizing: border-box;
  }
  .box_right {
    flex: 1;
    height: 100%;
  }
}
</style>

