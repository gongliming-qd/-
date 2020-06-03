<template>
  <div>
    <!-- 顶部 -->
    <div class="top_nav">
      <div class="left_title">纸角边-website</div>
      <div class="right_menu">
        <!-- 横向导航 -->
        <div class="list_menu">
          <tabselect :index="count_tableselect_index" :list_data="heng_menu.list_data" @action_select="action_select" />
        </div>
        <!-- 登录头像 -->
        <div class="login_img" @mouseenter="enter_menu()" @mouseleave="out_menu()">
          <img :src="count_img"/>
          <!-- 子菜单 -->
          <div class="sun_two" v-if="main_img.sum_isshow">
            <div class="sanjiao"></div>
            <div class="nihao">
              <div class="sun_two_son" @click.stop="click_to_me">个人中心</div>
              <div class="sun_two_son" style="marginTop:8px" @click.stop="click_to_login">退出</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { get_family_all } from "@/api/http";
import tabselect from "@/components/tabselect/tabselect";
export default {
  data() {
    return {
      // 头像部分
      main_img: {
        sum_isshow: false
      },
      // 横向菜单
      heng_menu: {
        list_data: ["首页", "数据质量", "个人中心"],
        list_data_path:['home','data_quality','person_set']
      },
      
    };
  },
  created() {
    this.init_get_data();
    console.log(this.$route.path);
    
  },
  computed:{
    count_tableselect_index(){
      if(this.$route.path.includes('/main/person_set')){
        return 2
      }
       if(this.$route.path.includes('/main/xxx')){
        return 1
      }
       if(this.$route.path.includes('/main/home')){
        return 0
      }
      
    },
    // 1. 控制头像
    count_img() {
      if (process.env.NODE_ENV === "development") {
        return (
          "http://127.0.0.1:8000/api/get_img/?img_name=" +
          (this.$store.state.user.avatar_address || 'default_one.jpg')
        );
      } else {
        return (
          "/api/get_img/?img_name=" + (this.$store.state.user.avatar_address || 'default_one.jpg')
        );
      }
    }
  },
  methods: {
    async init_get_data() {
      let aaa = await get_family_all();
      console.log(aaa);
    },
    //顶部导航---------------------------------------------------------------------------------------
    action_select(index) {
      // 1. 修改顶部横向导航
      if(index == 0){
        this.$router.push("/home");
      }else{
      this.$router.push("/main/"+ this.heng_menu.list_data_path[index]);
      }
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
   
  },
  components: { tabselect }
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

</style>

