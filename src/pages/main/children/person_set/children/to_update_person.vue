<template>
  <div>
    <!-- 面包屑 -->
    <breadnav :title="breadnav.title" />
    <!-- 修改按钮 -->
    <div>
      <el-button type="primary" style="marginLeft:25px; marginTop:10px" @click="open_update">修改信息</el-button>
      <el-button type="primary" style="marginLeft:25px; marginTop:10px" @click="open_up_psw">修改密码</el-button>
    </div>
    <!-- 用户信息展示 -->
    <div class="form_main_update">
      <div class="form_main_update_in">
        <el-form :model="update_add" status-icon label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名:">
            <span style="marginLeft:100px">{{ $store.state.user.username}}</span>
          </el-form-item>
          <el-form-item label="权重级别:">
            <span style="marginLeft:100px">{{$store.state.user.weight}}</span>
          </el-form-item>
          <el-form-item label="标签:">
            <span style="marginLeft:100px">{{$store.state.user.label}}</span>
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
                <input
                  ref="change_img"
                  type="file"
                  title
                  @change="get_add_file"
                  class="set_opacity_img"
                />
                <img class="creat_img" :src="update_add.form_data.zancun_img" alt />
                <img class="count_img" :src="count_img" />
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
    <!-- 修改密码模态框 -->
    <div>
      <el-drawer
        :title="'修改密码'"
        :visible.sync="up_psw_add.is_show"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
        size="50%"
      >
        <div class="in_form_class">
          <el-form :model="up_psw_add" status-icon label-width="100px">
            <el-form-item label="原密码">
              <el-input
                show-password
                v-model="up_psw_add.form_data.odd_psw"
                placeholder="请输入密码"
                style="width:350px"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码">
              <el-input
                show-password
                v-model="up_psw_add.form_data.new_psw"
                placeholder="请输入密码"
                style="width:350px"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input
                v-model="up_psw_add.form_data.psw_confirm"
                show-password
                placeholder="请输入确认密码"
                style="width:350px"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="btn_set">
            <el-button style="marginRight:150px" @click="up_psw_add.is_show=false">取消</el-button>
            <el-button @click="up_psw_confirm" type="primary">修改</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import breadnav from "@/components/breadNav/breadnav";
import { get_userinfo_by_username, update_userinfo_by_id, update_userpws_by_id } from "@/api/http";
import axios from "axios";


export default {
  data() {
    return {
      // 顶部导航
      breadnav: {
        title: ["个人中心", "用户操作", "修改信息"]
      },
      // 修改用户信息部分
      update_add: {
        is_show: false,
        form_data: {
          username: "",
          avatar_address: "",
          label: "",
          zancun_img: ""
        }
      },
      // 修改密码部分
      // 新增和修改部分
      up_psw_add: {
        is_show: false,
        form_data: {
          id: "",
          odd_psw: "",
          new_psw:"",
          psw_confirm: ""
        },
      }
    };
  },
  computed: {
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
    // 2. 打开修改模态框
    open_update() {
      // 1. 清空图像数据
      this.update_add.form_data.zancun_img = "";
      // 2. 设置默认数据
      this.update_add.form_data.username = this.$store.state.user.username;
      this.update_add.form_data.avatar_address = this.$store.state.user.avatar_address;
      this.update_add.form_data.label = this.$store.state.user.label;
      this.update_add.is_show = true;
    },
    // 3. 修改确定
    async update_user_confirm() {
      // 处理数据
      let formData = new FormData();
      formData.append("username", this.update_add.form_data.username);
      formData.append("id", this.$store.state.user.id);
      formData.append("label", this.update_add.form_data.label);
      formData.append(
        "avatar_address",
        this.update_add.form_data.avatar_address
      );

      let baseURL = "";
      process.env.NODE_ENV === "development"
        ? (baseURL = "/glm")
        : (baseURL = "");
      let response = await axios({
        method: "post",
        url: baseURL + "/api/update_userinfo_by_id/",
        data: formData,
        headers: {
          Authorization: window.sessionStorage.getItem("token") || "hello_world"
        }
      })
      console.log(response);
      if(response.data.results.message == "当前用户名已注册"){
          this.$message.error("当前用户已注册哦(*^▽^*)!!!");
      }
        if (response.data.message == "true") {
          localStorage.setItem("username",this.update_add.form_data.username)
          this.get_user();
          this.$message.success("修改成功哦(*^▽^*)!!!");
          // 关闭模态框
          this.update_add.is_show = false;

        }
      ;
    },
    // 4. 当文件发生改变的时候
    get_add_file(e) {
      // 1. 创建虚拟图像路径
      this.update_add.form_data.zancun_img = window.URL.createObjectURL(
        this.$refs.change_img.files[0]
      );
      // 2. 记录文件
      let file = e.target.files[0];
      this.update_add.form_data.avatar_address = file;
    },
    // 5. 更新当前用户信息
    async get_user() {
      let data = {
        username: this.update_add.form_data.username
      };
      let aaa = await get_userinfo_by_username(data);
      console.log(aaa);

      this.$store.dispatch("set_user", aaa.data.results[0]);
    },
    // 修改密码部分--------------------------------------------------------------------
    // 1. 打开模态框
    open_up_psw(){
      this.up_psw_add.is_show = true

      // 1. 清空数据 
      this.up_psw_add.form_data = {
          id: this.$store.state.user.id,
          odd_psw: "",
          new_psw:"",
          psw_confirm: ""
      }
    },
    // 2. 点击修改密码
     async up_psw_confirm(){
       // 1. 验证数据信息
       if(this.up_psw_add.form_data.odd_psw == ''){
         this.$message.warning('旧密码不能为空哦(*^▽^*)!!!');
       }
       if(this.up_psw_add.form_data.new_psw == ''){
         this.$message.warning('新密码不能为空哦(*^▽^*)!!!');
       }
       if(this.up_psw_add.form_data.psw_confirm == ''){
         this.$message.warning('确认密码不能为空哦(*^▽^*)!!!');
       }
       if(this.up_psw_add.form_data.psw_confirm != this.up_psw_add.form_data.new_psw){
         this.$message.warning('新密码和确认密码不一致哦(*^▽^*)!!!');
       }
       let data = {...this.up_psw_add.form_data}
       console.log(data);
       let aaa = await update_userpws_by_id(data)
        console.log(aaa);
        if(aaa.data.results.message == '修改成功!!'){
         this.$message.success('修改成功哦(*^▽^*)!!!');
         setTimeout(()=>{
         this.$message.success('请重新登录哦!!(*^▽^*)!!!');
         // 删除token
        window.sessionStorage.setItem("token", 'hello_world');
         this.$router.replace('/login')
         },500)
        }
        if(aaa.data.results.message == '"密码不正确"'){
         this.$message.error('密码不正确哦(*^▽^*)!!!');
        }
     },
    // 修改密码部分--------------------------------------------------------------------


  },
  created() {},
  components: {
    breadnav
  },
  mounted(){
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
  > input {
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
  .count_img {
    left: 0;
    top: 0;
    position: absolute;
    z-index: 110;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .creat_img {
    left: 0;
    top: 0;
    position: absolute;
    z-index: 111;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
// 修改密码模态框
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
</style>
