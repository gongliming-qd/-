<template>
 <div class="main">
     <el-input v-model.trim="input" placeholder="请输入搜索内容" @keyup.enter.native="change" class="input-with-select"></el-input>
     <span class="search_btn el-icon-search"  @click="change" ></span>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         input:''
     }
   },
   props:['search'],
   methods: {
       change(){
         this.$emit('click_search', this.input)
       }
   },
   created(){
     this.input = this.search
   },
   components: {
       
   }
 }
</script>

<style scoped lang="less">
.main{
  position: relative;
  width: 280px;
  .search_btn{
    width: 43px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #47A4FF;
    color: white;
    position: absolute;
    top: 0;
    right: 0;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }
  /deep/.el-input__inner{
      height: 40px;
  }
}
 
</style>
