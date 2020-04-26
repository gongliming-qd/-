import {http} from './ajax';

export const get_family_all = ({url,info,key})=>{
    return http.get(url,{params:{info:info, key:key}})
   }