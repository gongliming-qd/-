import {http} from './ajax';

export const get_family_all = (data)=>{
    return http.get('/api/liming/',{params:data})
   }



// 账户登录部分
export const tologin = (data)=>{
    return http.post('/api/tologin/',data)
}

// 账户注册部分
export const register_user = (data)=>{
    return http.post('/api/register_user/',data)
}

// 验证是否登录
export const check_api_token = (data)=>{
    return http.get('/api/check_api_token/',{params:data})
}