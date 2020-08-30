/**
 * 房源模块接口
 */
import base from './base';//导入接口域名列表
import axios from '@/utils/http';//导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const house = {
    //房源列表
    houseList (params) {
        return axios.get(`${base.test}/admin/houselist`, { params: params });
    },
    //添加房源
    addhouse (params) {
        return axios.post(`${base.test}/admin/addhouse`, params);
    },

    //添加房源
      addImage (params) {
        return axios.post(`${base.test}/admin/addImage`, params);
    },

    //删除房源
    houseDelete (params) {
        return axios.post(`${base.test}/admin/houseDelete`, params);
    },

    //房源分类
    houseCate (params) {
        return axios.post(`${base.test}/admin/houseCate`);
    },
    //房源分类更新
    houseCateUpdate (params) {
        return axios.post(`${base.test}/admin/houseCateUpdate`, params);
    },
    //删除房源分类
    houseCateDelete (params) {
        return axios.post(`${base.test}/admin/houseCateDelete`, params);
    },

    //新增房源分类
    houseCateAdd (params) {
        return axios.post(`${base.test}/admin/houseCateAdd`, params);
    },

}

export default house;