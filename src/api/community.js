/**
 * 社区模块接口
 */
import base from './base';//导入接口域名列表
import axios from '@/utils/http';//导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const community = {
  //房源列表
  communityList (params) {
    return axios.get(`${base.test}/admin/communitylist`, { params: params });
  },
  //房源列表
  communityDelete (params) {
    return axios.post(`${base.test}/admin/communityDelete`, params);
  }
}

export default community;