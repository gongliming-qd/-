<template>
  <div>
    <!-- 顶部 -->
    <div class="top_nav">
      <div class="left_title">纸角边-website</div>
      <div class="right_menu">
        <!-- 横向导航 -->
        <div class="list_menu">
              <tabselect :list_data="heng_menu.list_data" @action_select="action_select"/>
        </div>
        <!-- 登录头像 -->
        <div class="login_img" @mouseenter="enter_menu()" @mouseleave="out_menu()">
          <img src="../../static/imgs/main/index/user.png" alt />
          <!-- 子菜单 -->
          <div class="sun_two" v-if="main_img.sum_isshow">
            <div class="sanjiao">
            </div>
            <div class="nihao">
              <div class="sun_two_son" @click.stop="click_to_me">个人中心</div>
              <div class="sun_two_son" style="marginTop:8px" @click.stop="click_to_login">退出</div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import { get_family_all } from "@/api/http";
import tabselect from '../../components/tabselect/tabselect'
export default {
  data() {
    return {
      // 头像部分
      main_img: {
        sum_isshow: false
      },
      // 横向菜单
      heng_menu:{
         list_data:['首页','资产治理','数据治理','个人中心']
      },
      // 竖向菜单
      menu_list: [
        {
          title: "用户操作",
          children: [
            { path: "/to_register", name: "注册用户" },
            { path: "/to_update_psw", name: "修改密码" }
          ]
        },
        {
          title: "权限管理",
          children: [
            { path: "/admin_set", name: "超级管理员" },
            { path: "/to_update_psw", name: "普通管理员" }
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
    //顶部导航---------------------------------------------------------------------------------------
    action_select(index){
        console.log(index);
    },
    // 4. 鼠标移入
    enter_menu() {
      this.main_img.sum_isshow = true;
    },
    // 5. 鼠标移出
    out_menu() {
      this.main_img.sum_isshow = false;
    },
    // 退出登录
    click_to_login() {
      this.$confirm("想好了真的要离开我吗?o(╥﹏╥)o").then(() => {
        // 1. 清除token
        window.sessionStorage.setItem("token", "hello_world");
        this.$router.replace("/login");
      });
    },
    // 去个人中心
    click_to_me() {},
    //顶部导航---------------------------------------------------------------------------------------
    router_push(path) {
      this.$router.replace("/main" + path);
    }
  },
  components: {tabselect}
};
</script>

<style scoped lang="less">
// 顶部
.top_nav {
  width: 100%;
  background-color: black;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left_title {
    color: white;
    font-size: 25px;
    margin-left: 35px;
  }
  .right_menu {
    display: flex;
    align-items: center;
    .list_menu {
      width: 800px;
    }
    .login_img {
      width: 50px;
      height: 50px;
      background-color: #fff;
      border-radius: 50%;
      margin-right: 50px;
      position: relative;
      margin-left: 100px;
      cursor: pointer;
      .sun_two {
        position: absolute;
        color: black;
        left: 50%;
        top: 40px;
        transform: translateX(-50%);
        z-index: 10;
        .sanjiao {
          width: 10px;
          height: 10px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 6px;
        }
        .nihao {
          display: flex;
          border: 1px solid #ccc;
          padding: 10px 15px;
          border-radius: 5px;
          overflow: hidden;
          flex-direction: column;
          margin-top: 15px;
          background-color: black;
          .sun_two_son {
            color: white;
            margin-right: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
            transition: all 0.5s;
            font-size: 10px;
            cursor: pointer;
            &:hover {
              color: tomato;
            }
          }
        }
      }
      > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
}
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

