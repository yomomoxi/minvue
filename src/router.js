import Vue from 'vue'
import Router from 'vue-router'
import userQquestionnaire from "./views/userQquestionnaire"
import submit from "./views/submit.vue"
import nucleicAcid from './views/Gaoyang/nucleicAcid.vue'
import nuclearAcidResults from './views/Gaoyang/nuclearAcidResults.vue'
import picture from './views/Gaoyang/picture.vue'

Vue.use(Router)

// 公共路由
export const constantRoutes = [
  {

    // path: '/:id/:uname/:token',
    path:'/picture',
    name: '转图片',
    component: picture
  },
  {

    // path: '/:id/:uname/:token',
    path:'/',
    name: '核酸报告',
    component: nucleicAcid
  },
  {

    // nuclearAcidResults
    path:'/nuclearAcidResults',
    name: '核酸结果',
    component: nuclearAcidResults
  },
  {

    // path: '/:id/:uname/:token',
    path:'/userQquestionnaire',
    name: '问卷',
    component: userQquestionnaire
  },
  {
    // path: '/:id/:uname/:token',
    path:'/submit',
    name: '问卷提交',
    component: submit
  },
  ]

  export default new Router({
    mode: 'history', // 去掉url中的#
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })
  
  