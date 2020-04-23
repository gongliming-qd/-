<template>
 <div class="main">
     <el-input v-model.trim="input" placeholder="请输入搜索内容" @keyup.enter.native="change"></el-input>
     <span class="search_btn" @click="change">搜索</span>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         input:''
     }
   },
//    mychange : 发送搜索事件
   props:['mychange'],
   methods: {
       change(){
           this.mychange(this.input)
       }
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
      height: 30px;
  }
}
 
</style>
