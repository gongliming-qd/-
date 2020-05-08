import {http} from './ajax';

export const get_family_all = (data)=>{
    return http.get('/api/liming/',{params:data})
   }