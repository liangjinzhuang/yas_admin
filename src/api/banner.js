/**
 * banner模块接口
 */
import axios from '@/utils/http' // 导入http中创建的axios实例
import base from './base' // 导入接口域名列表
/* import qs from 'qs' // 根据需求是否导入qs模块 */

const banner = {
  // 获取轮播图
  bannerList () {
    return axios.get(`${base.test}/banner`)
  },

  // 后台获取轮播图
   adminBannerList () {
    return axios.get(`${base.test}/admin/banner`)
  },
  // 轮播图上传接口
  bannerImage (params) {
    return axios.post(`${base.test}/bannerImage`, params)
  },
  //修改轮播图
  uploadBanner (params) {
    return axios.post(`${base.test}/upload/banner`, params)
  },
  //新增轮播图
  addBanner (params) {
    return axios.post(`${base.test}/add/banner`, params)
  },
  //删除轮播图
  deleteBanner (params) {
    return axios.post(`${base.test}/delete/banner`, params)
  }

}
export default banner
