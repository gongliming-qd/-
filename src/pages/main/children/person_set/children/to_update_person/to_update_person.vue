<template>
  <div>
    <!-- 面包屑 -->
    <breadnav :title="breadnav.title" />
    <!-- 修改按钮 -->
    <div>
      <el-button type="primary" style="marginLeft:25px; marginTop:10px" @click="open_update">修改信息</el-button>
      <el-button type="primary" style="marginLeft:25px; marginTop:10px">修改密码</el-button>
    </div>
    <!-- 用户信息展示 -->
    <div class="form_main_update">
      <div class="form_main_update_in">
        <el-form
          :model="show_form"
          status-icon
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名:">
            <span style="marginLeft:100px">{{ show_form.username}}</span>
          </el-form-item>
          <el-form-item label="权重级别:">
            <span style="marginLeft:100px">{{show_form.weight}}</span>
          </el-form-item>
          <el-form-item label="标签:">
            <span style="marginLeft:100px">{{show_form.label}}</span>
          </el-form-item>
          <el-form-item label="头像:">
            <img class="set_img" :src="count_img" alt />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 用户信息修改模态框 -->
    <div>
      <el-drawer
        title="修改用户信息"
        :visible.sync="update_add.is_show"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
        size="50%"
      >
        <div class="in_form_class">
          <el-form :model="update_add" status-icon label-width="100px">
            <el-form-item label="用户名">
              <el-input
                v-model="update_add.form_data.username"
                placeholder="请输入用户名"
                style="width:350px"
              ></el-input>
            </el-form-item>
            <el-form-item label="标签">
              <el-input
                v-model="update_add.form_data.label"
                placeholder="请输入标签"
                style="width:350px"
              ></el-input>
            </el-form-item>
            <el-form-item label="头像">
              <div class="set_opacity_img">
                <input ref="change_img" type="file" title="" @change="get_add_file" class="set_opacity_img" />
                <img class="creat_img" :src="update_add.form_data.zancun_img" alt="">
                <img class="count_img" :src="count_img">
              </div>
            </el-form-item>
          </el-form>
          <div class="btn_set">
            <el-button style="marginRight:150px" @click="update_add.is_show=false">取消</el-button>
            <el-button type="primary" @click="update_user_confirm">修改</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import breadnav from "@/components/breadNav/breadnav";
import { get_userinfo_by_username } from "@/api/http";
import axios from "axios";

export default {
  data() {
    return {
      // 顶部导航
      breadnav: {
        title: ["个人中心", "用户操作", "修改信息"]
      },
      show_form: {
        username: "",
        weight: "",
        label: "",
        avatar_address: ""
      },
      update_add: {
        is_show: false,
        form_data: {
          username: "",
          avatar_address:'',
          label: "",
          zancun_img:''
        }
      }
    };
  },
  computed: {
    count_img() {
      if (process.env.NODE_ENV === "development") {
        return "http://127.0.0.1:8000/api/get_img/?img_name=touxiang.jpg";
      } else {
        return "/api/get_img/?img_name=touxiang.jpg";
      }
    }
  },
  methods: {
    // 1. 获取vuex用户信息
    get_user_info() {
      console.log(this.$store.state.user);
      this.show_form.username = this.$store.state.user.username;
      this.show_form.weight = this.$store.state.user.weight;
      this.show_form.label = this.$store.state.user.label;
      this.show_form.avatar_address = this.$store.state.user.avatar_address;
    },
    // 2. 打开修改模态框
    open_update() {
        // 1. 清空图像数据
         this.update_add.form_data.zancun_img = ''
        // 2. 设置默认数据
         this.update_add.form_data.username = this.$store.state.user.username;
         this.update_add.form_data.avatar_address = this.$store.state.user.avatar_address;
         this.update_add.form_data.label = this.$store.state.user.label;
        this.update_add.is_show = true;
    },
    // 3. 修改确定
    update_user_confirm() {
        // 处理数据
          let formData = new FormData();
           formData.append("username", this.ruleForm.pass);

           axios({
            method: "post",
            url: "/glm/api/check_pass/",
            data: formData,
            headers: {
              Authorization:
                window.sessionStorage.getItem("token") || "hello_world"
            }
          }).then(function(response) {
            console.log(response);
          });
    },
    // 4. 当文件发生改变的时候
    get_add_file(e) {
        // 1. 创建虚拟图像路径
      this.update_add.form_data.zancun_img = window.URL.createObjectURL(this.$refs.change_img.files[0])
        // 2. 记录文件
      let file = e.target.files[0];
      this.ruleForm.avatar_address = file;
    },
  },
  created() {
    this.get_user_info();
  },
  components: {
    breadnav
  }
};
</script>

<style scoped lang="less">
.form_main_update {
  width: 100%;
  height: 800px;
  padding: 20px 25px;
  box-sizing: border-box;
  .form_main_update_in {
    background-color: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.set_img {
  width: 50px;
  height: 50px;
  margin-left: 100px;
  border-radius: 50%;
}
// 修改模态框样式
.in_form_class {
  padding: 20px 125px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .btn_set {
    margin-top: 150px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
.set_opacity_img {
    position: relative;
  >input{
      opacity: 0;
      left: 0;
      top: 0;
      position: absolute;
      z-index: 112;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      cursor: pointer;
  }
  .count_img{
      left: 0;
      top: 0;
      position: absolute;
      z-index: 110;
      width: 100px;
      height: 100px;
      border-radius: 50%;
  }
  .creat_img{
      left: 0;
      top: 0;
      position: absolute;
      z-index: 111;
      width: 100px;
      height: 100px;
      border-radius: 50%;
  }
}
</style>
