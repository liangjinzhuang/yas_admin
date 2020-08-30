/**
 * 用户模块接口
 */
import base from './base';//导入接口域名列表
import axios from '@/utils/http';//导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const user = {
  //用户列表
  userList (params) {
    return axios.get(`${base.test}/admin/userlist`, { params: params });
  },
  //删除用户
  userDelete (params) {
    return axios.post(`${base.test}/admin/userDelete`, params);
  }
}

export default user;