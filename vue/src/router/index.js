import { createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import Layout1 from "@/layout/Layout1";
import Layout2 from "@/layout/Layout2"
import LayoutM from "@/layout/LayoutM";

const routerPc = [
  {
    path: '/',
    name: 'home',
    component: Layout2,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: '主页',
        component: () => import("@/views/Home")
      },
      {
        path: 'rescue_animal',
        name: '救助动物',
        component: () => import("@/views/user/Medical")
      },
      {
        path: 'communicate',
        name: '用户交流',
        component: () => import("@/views/user/Communication")
      },
      {
        path: 'adoption',
        name: '领养动物',
        component: () => import("@/views/user/Adoption")
      },
      {
        path: 'post_detail',
        name: '帖子',
        component: () => import("@/components/user/PostDetail")
      },
      {
        path: 'adopt_detail',
        name: '领养',
        component: () => import("@/components/user/AdoptDetail")
      },
      {
        path: 'base_position',
        name: '地图',
        component: () => import("@/views/user/BasePosition")
      },
      {
        path: 'userinfo/',
        name: '个人主页',
        component: () => import('@/views/user/UserInfo'),
        redirect: '/userinfo/dynamic',
        meta: {
          requireAuth: true
        },
        children: [
          {
            path: 'editor',
            name: '个人信息页',
            component: () => import('@/components/user/UserInfoEdit')
          },
          {
            path: 'dynamic',
            name: '个人动态',
            component: () => import('@/components/user/UserDynamic')
          },
          {
            path: 'release_adoption',
            name: '发布领养',
            component: () => import('@/components/user/ReleaseAdoption')
          },
          {
            path: 'write_posts',
            name: '发贴子',
            component: () => import('@/components/user/WritePosts')
          },
          {
            path: 'message',
            name: '消息',
            component: () => import('@/components/user/Message')
          }
        ]
      },
    ]
  },
  {
    path: '/im',
    name: 'Im',
    component: () => import("@/views/Im"),
    meta: {
      requireAuth: true
    },
  },
  {
    path: '/administration/login',
    name: '管理员登录',
    component: () => import('@/views/admin/AdminLogin')
  },
  {
    path: '/administration/',
    name: '管理台',
    component: Layout1,
    redirect: '/administration/login',
    meta: {
      requireAuth2: true
    },
    children: [
      {
        path: 'home',
        name: '首页',
        component: () => import('@/views/admin/AdminHome'),
      },
    ]
  },
  {
    path: '/administration/',
    name: '用户管理',
    component: Layout1,
    meta: {
      requireAuth2: true
    },
    children: [
      {
        path: 'userinfo',
        name: '普通用户',
        component: () => import('@/views/admin/data/UserManage'),
      },
      {
        path: 'vet_info',
        name: '医疗人员',
        component: () => import('@/views/admin/data/VetManage'),
      },
    ]
  },
  {
    path: '/administration/',
    name: '行为数据',
    component: Layout1,
    meta: {
      requireAuth2: true
    },
    children: [
      {
        path: 'posts',
        name: '帖子管理',
        component: () => import('@/views/admin/data/PostManage'),
      },
      {
        path: 'adopt',
        name: '领养管理',
        component: () => import('@/views/admin/data/AdoptManage')
      },
      {
        path: 'comments',
        name: '评论管理',
        component: () => import('@/views/admin/data/CommentManage'),
      },
    ]
  },
  {
    path: '/login',
    name: '用户登录',
    component: () => import('@/views/user/UserLogin')
  },
  {
    path: '/administration/',
    component: Layout1,
    meta: {
      requireAuth2: true
    },
    children: [
      {
        path:'stray_animal_base',
        name:'动物基地管理',
        component: () => import('@/views/admin/data/BaseManage'),
      }
    ],
  },
  {
    path: '/administration/',
    name: '审核操作',
    component: Layout1,
    meta: {
      requireAuth2: true
    },
    children: [
      {
        path: 'vet_audit',
        name: '医疗申请审核',
        component: () => import('@/views/admin/examine/VetAudit'),
      },
      {
        path: 'post_audit',
        name: '用户帖子审核',
        component: () => import('@/views/admin/examine/PostAudit'),
      },
      {
        path: 'adopt_audit',
        name: '领养发布审核',
        component: () => import('@/views/admin/examine/AdoptAudit')
      },
      {
        path: 'animal_audit',
        name: '增加动物种类审核',
        component: () => import('@/views/admin/examine/AnimalAudit'),
      },
    ]
  },
  {
    path: '/administration/',
    component: Layout1,
    name: '反馈处理',
    meta: {
      requireAuth2: true
    },
    children: [
      {
        path:'suggest',
        name:'建议',
        component: () => import('@/views/admin/feedback/Suggest'),
      }
    ],
  },
  // {
  //   path: '/register',
  //   name: '用户注册',
  //   component: () => import('@/components/Register')
  // }
]

const routerM = [
  {
    path: '/login',
    name: '移动端登录',
    component: () => import('@/views/mobile/Mlogin')
  },
  {
    path: '/',
    name: 'Mhome',
    component: LayoutM,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: '移动端首页',
        component: () => import("@/views/Mhome")
       },

    ]
  },
  {
    path: '/',
    name: 'home',
    component: Layout2,
    redirect: '/home',
    children: [
      {
        path: 'rescue_animal',
        name: '救助动物',
        component: () => import("@/views/user/Medical")
      },
      {
        path: 'communicate',
        name: '用户交流',
        component: () => import("@/views/user/Communication")
      },
      {
        path: 'adoption',
        name: '领养动物',
        component: () => import("@/views/user/Adoption")
      },
      {
        path: 'post_detail',
        name: '帖子',
        component: () => import("@/components/user/PostDetail")
      },
      {
        path: 'adopt_detail',
        name: '领养',
        component: () => import("@/components/user/AdoptDetail")
      },
      {
        path: 'userinfo/',
        name: '个人主页',
        component: () => import('@/views/user/UserInfo'),
        redirect: '/userinfo/dynamic',
        meta: {
          requireAuth: true
        },
        children: [
          {
            path: 'editor',
            name: '个人信息页',
            component: () => import('@/components/user/UserInfoEdit')
          },
          {
            path: 'dynamic',
            name: '个人动态',
            component: () => import('@/components/user/UserDynamic')
          },
          {
            path: 'release_adoption',
            name: '发布领养',
            component: () => import('@/components/user/ReleaseAdoption')
          },
          {
            path: 'write_posts',
            name: '发贴子',
            component: () => import('@/components/user/WritePosts')
          },
          {
            path: 'message',
            name: '消息',
            component: () => import('@/components/user/Message')
          }
        ]
      },
    ]
  },
  {
    path: '/im',
    name: 'Im',
    component: () => import("@/views/Im"),
    meta: {
      requireAuth: true
    },
  },
  {
    path: '/administration/login',
    name: '管理员登录',
    component: () => import('@/views/admin/AdminLogin')
  },
  {
    path: '/administration/',
    name: '管理台',
    component: Layout1,
    redirect: '/administration/login',
    meta: {
      requireAuth2: true
    },
    children: [
      {
        path: 'home',
        name: '首页',
        component: () => import('@/views/admin/AdminHome'),
      },
    ]
  },
  {
    path: '/administration/',
    name: '用户管理',
    component: Layout1,
    meta: {
      requireAuth2: true
    },
    children: [
      {
        path: 'userinfo',
        name: '普通用户',
        component: () => import('@/views/admin/data/UserManage'),
      },
      {
        path: 'vet_info',
        name: '医疗人员',
        component: () => import('@/views/admin/data/VetManage'),
      },
    ]
  }
]



var routes = []
let Adaptive = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
if (navigator.userAgent.match(Adaptive)) {
  routes = routerM
} else {
  routes = routerPc
}

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
