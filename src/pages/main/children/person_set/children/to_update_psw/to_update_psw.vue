<template>
 <div>
  <!-- 顶部面包屑 -->
   <breadnav :title="breadnav.title"/>
 </div>
</template>

<script>
// 导入面包屑
import breadnav from '@/components/breadNav/breadnav'
 export default {
   data () {
     return {
       breadnav:{
         title:['资产治理','修改密码']
       }
     }
   },
   components: {
      breadnav
   }
 }
</script>

<style scoped lang="less">

 
</style>
