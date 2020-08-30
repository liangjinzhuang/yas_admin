/**
 * 后台登录模块接口
 */
import axios from '@/utils/http' // 导入http中创建的axios实例
import base from './base' // 导入接口域名列表
/* import qs from 'qs' // 根据需求是否导入qs模块 */

const login = {
  // 社区房源详情
  login (params) {
    return axios.post(`${base.test}/admin/login`, params)
  }
}
export default login
