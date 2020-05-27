export default{
      // 1. 全局语言
      set_username({commit},username){
            commit('set_username',username)
        },
      
        set_user({commit},user){
            commit('set_user',user)
        }
      
}