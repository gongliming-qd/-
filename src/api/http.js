import {http} from './ajax';

export const get_family_all = (data)=>{
    return http.get('/api/liming/',{params:data})
   }



// 账户登录部分
export const tologin = (data)=>{
    return http.post('/api/tologin/',data)
}

// 验证是否登录
export const check_api_token = (data)=>{
    return http.get('/api/check_api_token/',{params:data})
}



// 用户操作>修改信息
export const get_userinfo_by_username = (data)=>{
    return http.get('/api/get_userinfo_by_username/',{params:data})
}



// 权限管理>超级管理员 
export const get_api_username_all_info = (data)=>{
    return http.get('/api/get_api_username_all_info/',{params:data})
}
export const get_api_username_all_info_by_search = (data)=>{
    return http.get('/api/get_api_username_all_info_by_search/',{params:data})
}

export const add_api_username_all_info = (data)=>{
    return http.post('/api/add_api_username_all_info/',data)
}

export const update_api_username_all_info = (data)=>{
    return http.post('/api/update_api_username_all_info/',data)
}
export const dele_api_username_all_info = (data)=>{
    return http.post('/api/dele_api_username_all_info/',data)
}