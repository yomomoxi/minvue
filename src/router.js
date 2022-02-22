import Vue from 'vue'
import Router from 'vue-router'
import userQquestionnaire from "./views/userQquestionnaire"
Vue.use(Router)

// 公共路由
export const constantRoutes = [
  {
    // path: '/:id/:uname/:token',
    path:'/userQquestionnaire',
    name: '问卷',
    component: userQquestionnaire
  },
  ]

  export default new Router({
    // mode: 'history', // 去掉url中的#
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })
  
  