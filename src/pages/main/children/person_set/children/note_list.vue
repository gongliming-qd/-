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
        <el-button type="primary" @click="add_note">新增笔记</el-button>
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
  </div>
</template>

<script>
import breadnav from "@/components/breadNav/breadnav";
import searchbar from "@/components/searchbar/search_bar";

export default {
  data() {
    return {
      // 顶部导航
      breadnav: {
        title: ["个人中心", "权限管理", "笔记列表"]
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
      // 新增/ 搜索按钮部分
      add_search: {
        search: "",
        options: [
          {
            value: "0",
            label: "最近一周"
          },
          {
            value: "1",
            label: "最近一月"
          },
          {
            value: "2",
            label: "全部"
          }
        ],
        value: "2"
      }
    };
  },
  methods: {
    //   主要内容 -----------------------------------------------------------
    // 1. 获取数据
    async get_init_data() {
      // 0. 清空数据
      this.table_all.show_now = [];
      this.table_all.all_list = [];
      // 1. 获取数据
      let data = {
        weight: this.add_search.value
      };
      //   let result_api = await get_api_username_all_info(data);
      //   let result_api_data = result_api.data.results.lists;
      //   this.table_all.total = result_api_data.length;
      //   this.table_all.all_list = result_api_data;
      // 2. 整理数据
      //   console.log(result_api_data);
      //   this.change_pagination(this.table_all.currentPage);
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
      //   let result_api = await get_api_username_all_info_by_search(data);
      //   let result_api_data = result_api.data.results.lists;
      //   this.table_all.total = result_api_data.length;
      //   this.table_all.all_list = result_api_data;
      // 2. 整理数据
      //   console.log(result_api_data);
      //   this.change_pagination(this.table_all.currentPage);
    },
    //   主要内容 -----------------------------------------------------------
    //   主要内容 -----------------------------------------------------------
    // 1. 点击新建按钮
    add_note() {
      this.$router.push(`/main/person_set/my_note?note_id=`);
    },
    // 整理时间
    do_formdate(data) {
      let Y = data.getFullYear() + "";
      let M =
        (data.getMonth() + 1 < 10
          ? "0" + (data.getMonth() + 1)
          : data.getMonth() + 1) + "";
      let D =
        data.getDate() > 10 ? data.getDate() : "0" + data.getDate();
      return '' + Y + M + D 
    }
  },
  mounted() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    const date = [start, end];

    do_formdate(date[0])
  },
  components: {
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
</style>
