import {http} from './ajax';

http.get_users = ({query,pagenum,pagesize})=>{
    return http.get(url,{params:{query,pagenum,pagesize}})
   }