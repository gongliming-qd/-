<template>
  <div>
    <!-- 顶部面包屑 -->
    <breadnav :title="breadnav.title" />
    <!-- 新增搜索按钮 -->
    <div class="add_search_nav">
      <div class="to_left">
        <el-form :inline="true" :model="add_search" class="form_set">
          <el-form-item label="权限">
            <el-select
              v-model="add_search.value"
              filterable
              default-first-option
              placeholder="请选择文章标签"
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
        <el-button type="primary">新增用户</el-button>
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
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="权限" align="center">
          <template slot-scope="scope">{{ scope.row.power }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="pagination">
        <el-pagination
          background
          @current-change="change_pagination"
          :current-page.sync="table_all.currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="table_all.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// 导入面包屑
import breadnav from "@/components/breadNav/breadnav";
import searchbar from "@/components/searchbar/search_bar";
export default {
  data() {
    return {
      // 顶部导航
      breadnav: {
        title: ["个人中心", "权限管理", "管理人页面"]
      },
      // 新增搜索按钮部分
      add_search: {
        search: "",
        options: [
          {
            value: "0",
            label: "全选"
          },
          {
            value: "1",
            label: "超级管理员"
          },
          {
            value: "2",
            label: "开发人员"
          },
          {
            value: "3",
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
            name: "root",
            power: "1"
          },
          {
            id: "2",
            name: "admin",
            power: "2"
          },
          {
            id: "3",
            name: "v_lmgong",
            power: "3"
          }
        ],
        // 全部数据
        all_list: [],
        // 分页器
        currentPage: 1,
        total: 12
      }
    };
  },
  methods: {
    // 新增搜索按钮部分-----------------------------------------------
    click_search(search) {
      console.log(search);
    },
    // 新增搜索按钮部分-----------------------------------------------
    // 主内容部分-----------------------------------------------------
    // 1. 单个编辑
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 2. 单个删除
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 3. 改变分页器
    change_pagination(index) {
      console.log(index);
    }
    // 主内容部分-----------------------------------------------------

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
</style>
