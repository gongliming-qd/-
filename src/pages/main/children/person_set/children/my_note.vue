<template>
  <div class="main_by_mynote">
    <!-- 顶部面包屑 -->
    <breadnav :title="breadnav.title" />
    <!-- markdown 编辑器 -->
    <div class="markdown_id">
      <mavon-editor v-model="value" @save="save_code" default_open="preview" :subfield="true" />
    </div>
    <div ref="fuck">

    </div>
  </div>
</template>

<script>
import breadnav from "@/components/breadNav/breadnav";

export default {
  data() {
    return {
      // 顶部导航
      breadnav: {
        title: ["个人中心", "笔记管理", "笔记操作"]
      },
      value: "#### 你好啊!"
    };
  },
  methods:{
      save_code(value, render){
          console.log(value);
          console.log('----------------------------');
          console.log(render);
         this.$refs.fuck.innerHTML = render
      }
  },
  components: {
    breadnav
  }
};
</script>

<style scoped lang="less">
.main_by_mynote {
  width: 100%;
  .markdown_id {
    width: 100%;
    /deep/ .v-note-wrapper {
      min-height: 650px;
    }
  }
}
</style>
