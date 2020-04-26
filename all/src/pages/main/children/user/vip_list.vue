<template>
  <div>
    <!-- 面包屑导航 -->
    <breadnav class="breadnav" :title1="'用户管理'" :title2="'会员管理'" :title3="'会员列表'" />
    <!-- 标题导航 -->
    <div class="header_nav">
      <!-- 标题 -->
      <div class="header_nav_title">会员列表</div>
      <!-- 中线 -->
      <div class="line"></div>
      <!-- 导航 -->
      <div class="header_nav_datail">
        <!-- 排序 -->
        <div class="paixu">
          <myselect
            :title="'排序'"
            :options="pai_xu.option"
            :placeholder="'请选择排序方式'"
            :value="pai_xu.value"
            :change="paixu_change"
          />
        </div>
        <!-- 注册时间 -->
        <div class="register_time">
          <span class="front">注册时间</span>
          <el-date-picker
            v-model="register_time.value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="register_time_change"
          ></el-date-picker>
        </div>
        <!-- 性别 -->
        <div class="sex">
          <myselect
            :title="'性别'"
            :options="sex.option"
            :placeholder="'请选择性别'"
            :value="sex.value"
            :change="sex_change"
          />
        </div>
        <!-- 会员 -->
        <div class="vip_select">
          <myselect
            :title="'会员'"
            :options="vip_select.option"
            :placeholder="'会员类型'"
            :value="vip_select.value"
            :change="vip_select_change"
          />
        </div>
        <!-- 搜索框 -->
        <div class="searchbar">
          <searchbar :mychange="searchbarchange" />
        </div>
        <!-- 导出数据 -->
        <div class="export_shuju">导出数据</div>
      </div>
    </div>
    <!-- 数据列表 -->
    <div class="shuju_list">
      <!-- 数据表单 -->
      <el-table :data="tableData" style="width: 100%" border stripe highlight-current-row>
        <el-table-column type="index" width="50" height="48px"></el-table-column>
        <el-table-column label="会员编号" width="166">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.vip_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="会员账号" width="166">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.vip_admin }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" width="166">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.vip_admin }}</span>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" width="166">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.register_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" width="127">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex }}</span>
          </template>
        </el-table-column>
        <el-table-column label="会员等级" width="166">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.vip_grande }}</span>
          </template>
        </el-table-column>
        <el-table-column label="购买金额" width="166">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.pay_count }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剩余积分" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.surplus_jifen }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="$router.push('/main/viplistdetail')">查看详情</el-button>
            <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">冻结</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <mypagination
        :total="100"
        :handleCurrentChange="handleCurrentChange"
        :handleSizeChange="handleSizeChange"
        class="pagination"
      />
    </div>
    <!-- dasdas -->
    <iframe
      id="headerIframe"
      src="https://www.baidu.com"
      width="100%"
      height="1006"
      frameborder="0"
      border="0"
      marginheight="0"
      marginwidth="0"
      scrolling="no"
    ></iframe>
    
  </div>
</template>

<script>
// 1. 导入面包屑导航
import breadnav from "../../../../components/breadNav/breadnav";
// 2. 导入选择器
import myselect from "../../../../components/myselect/myselect";
// 3. 导入搜索框
import searchbar from "../../../../components/searchbar/search_bar";
// 4. 导入分页器
import mypagination from "../../../../components/pagination/pagination";
import { log } from 'util';
export default {
  data() {
    return {
      // 排序
      pai_xu: {
        option: [
          {
            value: "0",
            label: "总购买金额降序"
          },
          {
            value: "1",
            label: "总购买金额升序"
          }
        ]
      },
      // 注册时间
      register_time: {
        value: ""
      },
      // 性别
      sex: {
        option: [
          {
            value: "0",
            label: "男"
          },
          {
            value: "1",
            label: "女"
          },
          {
            value: "2",
            label: "全部"
          }
        ]
      },
      // 会员类型
      vip_select: {
        option: [
          {
            value: "0",
            label: "所有会员"
          },
          {
            value: "1",
            label: "普通会员"
          },
          {
            value: "2",
            label: "VIP会员"
          }
        ]
      },
      // 数据列表
      tableData: [
        {
          vip_number: "13612163235",
          vip_admin: "admin",
          phone: "13145846564",
          register_time: "2019-11-21",
          sex: "男",
          vip_grande: "普通会员",
          pay_count: "0.00",
          surplus_jifen: 10
        },
        {
          vip_number: "77885522",
          vip_admin: "admin",
          phone: "13145846564",
          register_time: "2019-11-21",
          sex: "男",
          vip_grande: "普通会员",
          pay_count: "0.00",
          surplus_jifen: 10
        },
        {
          vip_number: "5564982",
          vip_admin: "admin",
          phone: "13145846564",
          register_time: "2019-11-21",
          sex: "男",
          vip_grande: "普通会员",
          pay_count: "0.00",
          surplus_jifen: 10
        },
        {
          vip_number: "7894652",
          vip_admin: "admin",
          phone: "13145846564",
          register_time: "2019-11-21",
          sex: "男",
          vip_grande: "普通会员",
          pay_count: "0.00",
          surplus_jifen: 10
        },
        {
          vip_number: "987561234",
          vip_admin: "admin",
          phone: "13145846564",
          register_time: "2019-11-21",
          sex: "男",
          vip_grande: "普通会员",
          pay_count: "0.00",
          surplus_jifen: 10
        },
        {
          vip_number: "987561234",
          vip_admin: "admin",
          phone: "13145846564",
          register_time: "2019-11-21",
          sex: "男",
          vip_grande: "普通会员",
          pay_count: "0.00",
          surplus_jifen: 10
        },
        {
          vip_number: "987561234",
          vip_admin: "admin",
          phone: "13145846564",
          register_time: "2019-11-21",
          sex: "男",
          vip_grande: "普通会员",
          pay_count: "0.00",
          surplus_jifen: 10
        }
      ]
    };
  },
  methods: {
    // 排序
    paixu_change(e) {
      console.log(e);
    },
    // 性别
    sex_change(e) {
      console.log(e);
    },
    register_time_change(e) {
      console.log(e);
    },
    // 会员
    vip_select_change(e) {
      console.log(e);
    },
    // 搜索框
    searchbarchange(input) {
      console.log(input);
    },
    // 编辑
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row);
    },
    /*********** 分页器部分 *******************/

    // 改变当前页
    handleCurrentChange(e) {
      console.log(e);
    },
    // 改变当前页显示个数
    handleSizeChange(e) {
      console.log(e);
    }
  },
  components: {
    breadnav,
    myselect,
    searchbar,
    mypagination
  },
  mounted() {
    console.dir(document.getElementById("headerIframe"));
    
    // document.getElementById("headerIframe").contentDocument.getElementById("su").value = 'test'
  }
};
</script>

<style scoped lang="less">
// 标题导航
.header_nav {
  width: 100%;
  height: 137px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  padding: 0 20px;
  box-sizing: border-box;
  // 标题
  .header_nav_title {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(61, 64, 71, 1);
    height: 57px;
    display: flex;
    align-items: center;
  }
  // 中线
  .line {
    width: 100%;
    height: 1px;
    background-color: rgba(224, 224, 224, 1);
  }
  // 导航
  .header_nav_datail {
    height: 79px;
    display: flex;
    align-items: center;
    // 排序
    .paixu {
      width: 200px;
    }
    // 注册时间
    .register_time {
      display: flex;
      align-items: center;
      margin-left: 28px;
      margin-right: 28px;
      // 前缀
      .front {
        min-width: 40px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(51, 62, 108, 1);
        margin-right: 6px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        // background-color: red;
      }
      // 总体宽度
      /deep/ .el-range-editor {
        height: 30px;
      }
      // 小图标
      /deep/ .el-input__icon {
        margin-top: -10px;
      }
      // 至字
      /deep/ .el-range-separator {
        margin-top: -10px;
      }
    }
    // 性别
    .sex {
      width: 121px;
      margin-right: 28px;
    }

    // 会员
    .vip_select {
      width: 182px;
      margin-right: 60px;
    }
    // 导出数据
    .export_shuju {
      width: 95px;
      height: 31px;
      background: rgba(71, 164, 255, 1);
      border-radius: 16px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-left: 160px;
    }
  }
}
// 数据列表
.shuju_list {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  margin-top: 13px;
  padding: 61px 66px;
  box-sizing: border-box;
  // 分页器
  .pagination {
    margin-top: 60px;
  }
}
</style>
