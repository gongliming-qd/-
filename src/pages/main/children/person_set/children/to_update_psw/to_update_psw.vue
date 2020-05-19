<template>
  <div>
    <!-- 顶部面包屑 -->
    <breadnav :title="breadnav.title" />
    <!--  -->
    <div>
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文件" prop="age">
          <input type="file" @change="get_add_file">
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img :src="count_img" alt="">
  </div>
</template>

<script>
import axios from "axios";
// 导入面包屑
import breadnav from "@/components/breadNav/breadnav";
export default {
  data() {
    return {
      breadnav: {
        title: ["资产治理", "修改密码"]
      },
      ruleForm: {
        pass: "",
        checkPass: "",
        img: ""
      },
    };
  },
  computed:{
    count_img(){
      if(process.env.NODE_ENV === 'development'){
      return 'http://127.0.0.1:8000/api/get_img/?img_name=touxiang.jpg'
      }else{
      return '/api/get_img/?img_name=touxiang.jpg'
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 处理数据
          let formData = new FormData();
          formData.append("psw", this.ruleForm.pass);
          formData.append("checkPass", this.ruleForm.checkPass);
          formData.append("file_img", this.ruleForm.img);

          axios({
            method: "post",
            url: "/glm/api/check_pass/",
            data: formData,
            headers: {'Authorization': window.sessionStorage.getItem('token')||'hello_world'},
          }).then(function(response) {
            console.log(response);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    get_add_file(e){
      let file = e.target.files[0]
      this.ruleForm.img = file
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  components: {
    breadnav
  }
};
</script>

<style scoped lang="less">
</style>
