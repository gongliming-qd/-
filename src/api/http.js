import {http} from './ajax';

export const get_family_all = (data)=>{
    return http.get('/api/liming/',{params:data})
   }



// 账户登录部分
export const tologin = (data)=>{
    return http.post('/api/tologin/',data)
}