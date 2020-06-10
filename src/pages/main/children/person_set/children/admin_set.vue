<template>
  <div>
    <!-- 顶部面包屑 -->
    <breadnav :title="breadnav.title" />
    <!-- 新增和搜索按钮 -->
    <div class="add_search_nav">
      <div class="to_left">
        <el-form :inline="true" :model="add_search" class="form_set">
          <el-form-item label="权限">
            <el-select
              v-model="add_search.value"
              filterable
              default-first-option
              placeholder="请选择文章标签"
              @change="change_select"
            >
              <el-option
                v-for="item in add_search.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="add_user">新增用户</el-button>
      </div>
      <!-- 查询 -->
      <div class="to_right">
        <searchbar :search="add_search.search" @click_search="click_search" />
      </div>
    </div>
    <!-- 主内容 -->
    <div class="table_set">
      <el-table stripe border :data="table_all.show_now" style="width: 100%">
        <el-table-column label="ID" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="账号" align="center">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="密码" align="center">
          <template slot-scope="scope">{{ scope.row.psw }}</template>
        </el-table-column>
        <el-table-column label="权限" align="center">
          <template slot-scope="scope">{{ scope.row.weight}}</template>
        </el-table-column>
        <el-table-column label="标签" align="center">
          <template slot-scope="scope">{{ scope.row.label}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="update_user(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="dele_user(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="pagination">
        <el-pagination
          background
          @current-change="change_pagination"
          :current-page.sync="table_all.currentPage"
          :page-size="table_all.page_size"
          layout="prev, pager, next, jumper"
          :total="table_all.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 新增和编辑模态框 -->
    <div>
      <el-drawer
        :title="update_add.title"
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
            <el-form-item label="密码">
              <el-input v-model="update_add.form_data.psw" placeholder="请输入密码" style="width:350px"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" v-if="update_add.status=='0'">
              <el-input
                v-model="update_add.form_data.psw_confirm"
                placeholder="请输入确认密码"
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
            <el-form-item label="权重">
              <el-select
                v-model="update_add.form_data.weight"
                placeholder="请选择权重"
                style="width:350px"
              >
                <el-option label="管理员" :value="'1'"></el-option>
                <el-option label="普通人员" :value="'2'"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="btn_set">
            <el-button style="marginRight:150px" @click="update_add.is_show=false">取消</el-button>
            <el-button  v-if="update_add.status=='0'" type="primary" @click="add_user_confirm">新增</el-button>
            <el-button v-if="update_add.status=='1'" type="primary" @click="update_user_confirm">修改</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
// 导入面包屑
import breadnav from "@/components/breadNav/breadnav";
import searchbar from "@/components/searchbar/search_bar";

import {
  get_api_username_all_info,
  get_api_username_all_info_by_search,
  add_api_username_all_info,
  update_api_username_all_info,
  dele_api_username_all_info
} from "@/api/http";
export default {
  data() {
    return {
      // 顶部导航
      breadnav: {
        title: ["个人中心", "权限管理", "管理人页面"]
      },
      // 新增/ 搜索按钮部分
      add_search: {
        search: "",
        options: [
          {
            value: "0",
            label: "全选"
          },
          {
            value: "1",
            label: "管理员"
          },
          {
            value: "2",
            label: "普通用户"
          }
        ],
        value: "0"
      },
      // 主内容
      table_all: {
        //   表格显示数据
        show_now: [
          {
            id: "1",
            username: "root",
            weight: "1"
          }
        ],
        // 全部数据
        all_list: [],
        // 分页器
        currentPage: 1,
        total: 1,
        page_size: 6
      },
      // 新增和修改部分
      update_add: {
        title: "新增用户",
        status: "0",
        is_show: false,
        form_data: {
          id: "",
          username: "",
          psw: "",
          weight: "",
          label: "",
          psw_confirm: ""
        },
        zancun_form: {}
      }

      //
    };
  },
  created() {
    // 1. 初始化获取数据
    this.get_init_data();
  },
  methods: {
    // 主要内容------------------------------------------------------
    // 1. 获取数据
    async get_init_data() {
      // 0. 清空数据
      this.table_all.show_now = [];
      this.table_all.all_list = [];
      // 1. 获取数据
      let data = {
        weight: this.add_search.value
      };
      let result_api = await get_api_username_all_info(data);
      let result_api_data = result_api.data.results.lists;
      this.table_all.total = result_api_data.length;
      this.table_all.all_list = result_api_data;
      // 2. 整理数据
      console.log(result_api_data);
      this.change_pagination(this.table_all.currentPage);
    },
    // 2. 改变分页器
    change_pagination(index) {
      let _start = (index - 1) * this.table_all.page_size;
      let _end = index * this.table_all.page_size;
      this.table_all.show_now = this.table_all.all_list.slice(_start, _end);
      this.table_all.currentPage = index;
    },
    // 3. 下拉选择改变
    change_select() {
      this.get_init_data();
    },
    // 4. 新增搜索按钮部分
    async click_search(search) {
      // 0. 清空数据
      this.table_all.show_now = [];
      this.table_all.all_list = [];
      console.log(search);
      let data = {
         weight: this.add_search.value,
         search: `%${search}%`
          };
      let result_api = await get_api_username_all_info_by_search(data);
      let result_api_data = result_api.data.results.lists;
      this.table_all.total = result_api_data.length;
      this.table_all.all_list = result_api_data;
      // 2. 整理数据
      console.log(result_api_data);
      this.change_pagination(this.table_all.currentPage);

    },
    // 主要内容------------------------------------------------------

    // 新建-------------------------------------------------------
    // 1. 点击新增按钮
    add_user() {
      // 1. 清空数据
      this.update_add.form_data.username = "";
      this.update_add.form_data.psw = "";
      this.update_add.form_data.label = "";
      this.update_add.form_data.weight = "";
      this.update_add.form_data.psw_confirm = "";
      // 2. 打开模态框
      this.update_add.is_show = true;
    },
    // 2. 确定新增
    async add_user_confirm() {
      // 1. 获取数据
      let data = {
        username: this.update_add.form_data.username,
        psw: this.update_add.form_data.psw,
        label: this.update_add.form_data.label,
        weight: this.update_add.form_data.weight
      };
      let result_api = await add_api_username_all_info(data);
      console.log(result_api);
      if (result_api.data.state == "success") {
        this.update_add.is_show = false;
        this.$message.success("新建用户成功哦(*^▽^*)!!");
        this.get_init_data();
      }
    },
    // 新建-------------------------------------------------------
    // 修改------------------------------------------------------
    // 1. 点击修改按钮
    update_user(value) {
      console.log(value);
      this.update_add.title = "修改用户信息";
      this.update_add.status = "1";
      // 1. 存储内容
      this.update_add.zancun_form = { ...value };
      // 2. 赋值
      this.update_add.form_data.username = value.username;
      this.update_add.form_data.psw = value.psw;
      this.update_add.form_data.weight = value.weight;
      this.update_add.form_data.label = value.label;
      // 3. 打开模态框
      this.update_add.is_show = true;
    },
    // 2. 修改确认
    async update_user_confirm() {
      // 1. 获取数据
      let data = {
        id: this.update_add.zancun_form.id,
        username: this.update_add.form_data.username,
        psw: this.update_add.form_data.psw,
        label: this.update_add.form_data.label,
        weight: this.update_add.form_data.weight
      };
      let result_api = await update_api_username_all_info(data);
      console.log(result_api);
      if (result_api.data.state == "success") {
        this.update_add.is_show = false;
        this.$message.success("修改成功哦(*^▽^*)!!");
        this.get_init_data();
      }
    },
    // 修改-------------------------------------------------------

    // 删除-------------------------------------------------------
    // 1. 点击删除按钮
    async dele_user(value) {
      this.$confirm("此操作将永久删除该用户哦(*^▽^*), 真的要继续吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let data = {
            id: value.id
          };
          let result_api = await dele_api_username_all_info(data);
          if (result_api.data.state == "success") {
            this.$message.success("修改成功哦(*^▽^*)!!");
            this.get_init_data();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除(*^▽^*)!!"
          });
        });
    },
    // 2. 删除确定
    dele_user_confirm() {}
    // 删除-------------------------------------------------------
  },
  components: {
    // breadnav, searchbar
    breadnav,
    searchbar
  }
};
</script>

<style scoped lang="less">
// 新增搜索按钮
.add_search_nav {
  padding: 0px 25px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  box-sizing: border-box;
  justify-content: space-between;
  .to_left {
    display: flex;
    align-items: center;
    .form_set {
      height: 40px;
      margin-right: 50px;
    }
  }
}
// table
.table_set {
  margin-top: 30px;
  padding: 0 25px;
  box-sizing: border-box;
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

// 新增/修改模态框
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
