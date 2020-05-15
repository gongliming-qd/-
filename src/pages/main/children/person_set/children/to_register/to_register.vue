<template>
<div>
  <!-- 顶部面包屑 -->
   <breadnav :title="breadnav.title"/>
  <!-- 总体 -->
  <div class="main">
    <!-- 登录界面 -->
    <div class="login">
      <!-- 标题 -->
      <div class="title">注册用户</div>
      <!-- 主要内容 -->
      <div class="body">
        <!-- 账号 -->
        <div class="common zhanhao">
          <span class="iconfont icon-iconzh1" :class=" icon_admin == true? 'select':''"></span>
          <el-input placeholder="请输入账号" v-model="login.username" clearable></el-input>
        </div>
        <!-- 密码 -->
        <div class="common password">
          <span class="iconfont" :class="icon_psw == true? 'select icon-mima':'icon-mima1'"></span>
          <el-input placeholder="请输入密码" v-model="login.psw" show-password></el-input>
        </div>
        <!-- 密码 -->
        <div class="common password">
          <span class="iconfont" :class="icon_psw == true? 'select icon-mima':'icon-mima1'"></span>
          <el-input placeholder="请输入确认密码" v-model="login.psw_confirm" show-password></el-input>
        </div>
        <!-- 登录按钮 -->
        <el-button type="primary" @click="btn_tologin">注册</el-button>
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
import {register_user} from '@/api/http'
import breadnav from '@/components/breadNav/breadnav'
export default {
  data() {
    return {
       breadnav:{
         title:['用户操作','注册用户']
       },
      login:{
         username: "",
          psw: "",
          psw_confirm:''
      },
      confirm: "",
      // 正则控制
      icon_admin: false,
      icon_psw: false,
      icon_confirm: false
    };
  },
  methods: {
    // 点击登录按钮
    async btn_tologin() {
      let data = {
        username : this.login.username,
        psw : this.login.psw,
        psw_confirm : this.login.psw_confirm,
        
      }
      console.log(data);
      
      let aaa = await register_user(data)
      console.log(aaa);
      
    },
  },
  watch: {
   
  },
   components: {
      breadnav
   }
};
</script>

<style scoped lang="less">
@import url("../../../../../../static/iconfont/iconfont.less");
// 总体
.main {
  position: relative;
  width: 100%;
  // 登录界面
  .login {
    width: 590px;
    height: 536px;
    background: #cfe8fc;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    right: 35%;
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
        }
      }
    }
  }
}
</style>
