import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import Vant from 'vant'
import 'element-plus/dist/index.css'
import 'vant/lib/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ELIcons from '@element-plus/icons-vue'
import less from 'less'

import '@/assets/css/global.css'

const app = createApp(App)

router.beforeEach((to, from, next) => {
    if(to.meta.requireAuth) {
        if(store.state.user.username) {
            next()
        } else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    } else if(to.meta.requireAuth2) {
        if(store.state.admin.accountNum) {
            next()
        } else {
            next({
                path: '/administration/login'
            })
        }
    } else {
        next()
    }
    // if (to.meta.requireAuth) {
    //     if(store.state.admin.accountNum || store.state.user.username) {
    //         next()
    //     } else {
    //         if(to.path.startsWith('/administration')) {
    //             console.log(1)
    //             next({
    //                 path: '/administration/login'
    //             })
    //         }else {
    //             console.log(2)
    //             next({
    //                 path: 'login',
    //                 query: {redirect: to.fullPath}
    //             })
    //         }
    //     }
    // } else {
    //     next()
    // }
})

app.use(store).use(router).use(ElementPlus,{ locale: zhCn, size:'small' }).use(Vant)

for (let iconName in ELIcons) {
    app.component(iconName, ELIcons[iconName])
}

app.mount('#app')