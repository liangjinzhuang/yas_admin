import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const globalRoutes = [
  {
    path: '/login',
    title: '登录页',
    icon: '',
    name: 'login',
    aliasPath: '/login',
    hidden: true,
  },
  {
    path: '/404',
    title: '登录页',
    icon: '',
    name: '404',
    aliasPath: '/404',
    hidden: true
  }
]
const asyncRoutes = [
  {
    path: '/',
    title: '首页',
    icon: '',
    name: 'home',
    aliasPath: '/index/index',
    prefixPath: 'layouts',
    hidden: false,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        title: '首页',
        icon: 'el-icon-odometer',
        name: 'dashboard',
        aliasPath: '/dashboard/index',
        hidden: false
      },
      {
        path: '/banner',
        title: '轮播图管理',
        icon: 'el-icon-picture-outline',
        name: 'banner',
        aliasPath: '/banner',
        hidden: false,
      },
      {
        path: '/house',
        title: '房源管理',
        icon: 'el-icon-school',
        name: 'house',
        aliasPath: '/house',
        hidden: false,
        redirect: '/houseList',
        children: [
          {
            path: '/houseList',
            title: '房源列表',
            icon: 'el-icon-menu',
            name: 'houseList',
            aliasPath: '/house/houseList/index',
            hidden: false,
          },
          {
            path: '/addHouse',
            title: '新增房源',
            icon: 'el-icon-edit',
            name: 'addHouse',
            aliasPath: '/house/addHouse/index',
            hidden: false,
          },
          {
            path: '/cate',
            title: '房源分类',
            icon: 'el-icon-c-scale-to-original',
            name: 'cate',
            aliasPath: '/house/cate/index',
            hidden: false,
          }
        ]
      },
      {
        path: '/community',
        title: '社区列表',
        icon: 'el-icon-camera',
        name: 'community',
        aliasPath: '/community',
        hidden: false,
      },
      {
        path: '/user',
        title: '用户列表',
        icon: 'el-icon-user',
        name: 'user',
        aliasPath: '/user',
        hidden: false,
      }
    ]
  }
]
/*
{
   
}
*/

const _import = (file, prefix = 'views') => () => import(`@/${prefix}${file}`)

const createRoutes = (routes, parent = null, result = []) => {
  if (Array.isArray(routes)) {
    routes.forEach(route => {
      let routeItem = {}
      let { path, title, icon, name, aliasPath, hidden, redirect, children, prefixPath = null } = route
      routeItem = {
        path: path,
        link: parent && parent.path !== '/' ? `${parent.path}${path}` : path,
        name,
        redirect,
        meta: {
          title,
          icon
        },
        hidden,
        component: prefixPath ? _import(aliasPath, prefixPath) : _import(aliasPath)
      }
      if (Array.isArray(children)) {
        routeItem['children'] = createRoutes(children, routeItem)
      }
      result.push(routeItem)
    })
  }
  return result
}

const routes = createRoutes(globalRoutes.concat(asyncRoutes))
const router = new Router({
  routes: routes
})

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router;


