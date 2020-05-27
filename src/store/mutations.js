export default{
     // 1. 设置用户名
     set_username(state,username){
            state.user.username = username
        },
    // 2.设置用户信息
    set_user(state,user){
        state.user = user
    }
}