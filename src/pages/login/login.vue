<template>
  <!-- 总体 -->
  <div class="main">
    <!-- 登录界面 -->
    <div class="login">
      <!-- 标题 -->
      <div class="title">用户登录</div>
      <!-- 主要内容 -->
      <div class="body">
        <!-- 账号 -->
        <div class="common zhanhao">
          <span class="iconfont icon-iconzh1" :class="class_icon.icon_username == true? 'select':''"></span>
          <el-input placeholder="请输入账号" v-model="login.username" clearable></el-input>
        </div>
        <!-- 密码 -->
        <div class="common password">
          <span class="iconfont" :class="class_icon.icon_psw == true? 'select icon-mima':'icon-mima1'"></span>
          <el-input placeholder="请输入密码" v-model="login.psw" show-password></el-input>
        </div>
        <!-- 验证码 -->
        <div class="common confirm">
          <span class="iconfont icon-anquan" :class="class_icon.icon_confirm == true? 'select':''"></span>
          <el-input placeholder="请输入验证码" v-model="login.confirm"></el-input>
          <div class="img" @click="change_confim">
            {{confirm}}
            <img src alt />
          </div>
        </div>
        <!-- 登录按钮 -->
        <el-button type="primary" @click="btn_tologin">登录</el-button>
      </div>
    </div>
    <!-- 底部logo遮住 -->
    <div class="shadow_logo">
      <!-- Copyright©1998-2018 Tencent Inc. All Rights Reserved. 腾讯公司计费平台部 版权所有 -->
For personal notes to learn personal website. 后台笔记个人网站 版权专属
    </div>
  </div>
</template>

<script>
import { tologin, check_api_token } from "@/api/http";
export default {
  data() {
    return {
      // 1. 登录信息
      login: {
        username: "",
        psw: "",
        confirm: ""
      },
      // 2. 验证码
      confirm: "",
      // 3. 控制样式
      class_icon: {
        icon_username: false,
        icon_psw: false,
        icon_confirm: false
      }
    };
  },
  created(){
    this.change_confim()
  },
  methods: {
    // 1. 点击登录按钮
    async btn_tologin() {
      // 1.验证格式
      if(this.login.username == ''){
        this.$message.warning("请输入账号哦(*^▽^*)!");
        this.change_confim()
        return 
      }
      if(this.login.psw == ''){
        this.$message.warning("请输入密码哦(*^▽^*)!");
        this.change_confim()
        return 
      }
      if(this.confirm != this.login.confirm){
        this.$message.warning("验证码不正确哦(*^▽^*)!");
        this.change_confim()
        return 
      }
      // 2. 整理请求参数
      let data = {
        username: this.login.username,
        psw: this.login.psw
      };
      console.log(data);
      let aaa = await tologin(data);
      console.log(aaa);
      if (aaa.data.code == 0 && aaa.data.state == "success") {
        // 3. 存储token
        window.sessionStorage.setItem("token", aaa.data.token);
        // 4. 存储个人信息在vuex中
        localStorage.setItem("username", this.login.username)

        this.$message.success(this.login.username + '同学,登录成功哦(*^▽^*)!!!');
        this.$router.replace("/");
      } else {
        this.$message.warning(aaa.data.results.message);
      }
    },
    // 2. 变换验证码数字
    change_confim(){
      this.confirm = Math.random().toString(36).substr(2).slice(1,5)
    }
  },
  watch: {
    // 1. 监听账号
    "login.username"() {
      if (this.login.username.length > 0) {
        this.class_icon.icon_username = true
      }
      if (this.login.username.length == 0) {
        this.class_icon.icon_username = false
      }
    },
    // 2. 监听密码
    "login.psw"() {
      if (this.login.psw.length > 0) {
        this.class_icon.icon_psw = true
      }
      if (this.login.psw.length == 0) {
        this.class_icon.icon_psw = false
      }
    },
    // 3. 监听验证码
    "login.confirm"() {
      if (this.login.confirm.length > 0) {
        this.class_icon.icon_confirm = true
      }
      if (this.login.confirm.length == 0) {
        this.class_icon.icon_confirm = false
      }
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
@import url("../../static/iconfont/iconfont.less");
// 总体
.main {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: url('../../static/imgs/login/bg1.jpg') center center repeat-x;
  background-color: black;
  // 登录界面
  .login {
    width: 590px;
    height: 536px;
    background: #080808;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    transform: translateY(-55%);
    right: 16%;
    padding: 63px 62px 83px 62px;
    box-sizing: border-box;
    // 标题
    .title {
      width: 91px;
      height: 22px;
      font-size: 22px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    // 主要内容
    .body {
      padding: 40px;
      // 控制所有的间隙
      /deep/ input {
        text-indent: 2em;
        height: 50px;
        border: 0px solid red;
      }
      /deep/ button {
        width: 100%;
        height: 56px;
        margin-top: 16px;
        border-radius: 25px;
      }
      // 大众
      .common {
        position: relative;
        margin-bottom: 38px;
        // 字体图标
        > span {
          width: 22px;
          height: 22px;
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          color: #999999;
          z-index: 999;
        }
        // 变色的颜色
        .select {
          color: #4b87ff;
        }
      }
      // 验证码
      .confirm {
        /deep/ input {
          text-indent: 2em;
          width: 250px;
        }
        // 验证码图片
        .img {
          height: 50px;
          width: 100px;
          background-color: #7e95b0;
          position: absolute;
          top: 0;
          right: 0;
          display: flex;
          border-radius: 5px;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
        }
      }
    }
  }
  .shadow_logo{
    width: 100%;
    height: 80px;
    position: absolute;
    background-color: black;
    left: 0;bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: white;
  }
}
</style>
