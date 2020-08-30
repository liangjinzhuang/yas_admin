/**
 * api接口的统一出口
 */

//房源模块接口
import house from '@/api/house';
//房源模块接口
import community from '@/api/community';
//用户模块接口
import user from '@/api/user';
// 轮播图接口
import banner from '@/api/banner'
// 登录接口
import adminlogin from '@/api/adminlogin'
//其他模块接口....

//导出接口
export default {
    house,
    community,
    user,
    banner,
    adminlogin
}
