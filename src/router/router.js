import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import login from "../components/Login.vue";
import main_stu from "../components/MainView.vue";
import main_tea from "../components/TeaMainView.vue"
import tea_select from "../components/tea/TeaFormSelect"
import tea_warning from "../components/tea/TeaFormWarning"
import tea_changepwd from "../components/tea/TeaPwdChange";
import stu_upload from "../components/stu/FormUpload"
import stu_select from "../components/stu/FormSelect";
import stu_changepwd from "../components/stu/PwdChange";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [

    {
        path:"/",
        name:'login',
        component: login
    },
    {
        path: "/main_stu",
        name:'main_stu',

        component: main_stu,
        children: [

            {
                path: 'stu_upload',
                name:'stu_upload',
                component: stu_upload
            },
            {
                path: 'stu_select',
                name:'stu_select',
                component: stu_select
            },
            {
                path:'stu_changepwd',
                name:'stu_changepwd',
                component:stu_changepwd
            }
        ]
    },
    {
        path: "/main_tea",
        name:'main_tea',
        component: main_tea,
        children: [
            {
                path: 'tea_warning',
                name:'tea_warning',
                component: tea_warning
            },
            {
                path: 'tea_select',
                name:'tea_select',
                component: tea_select
            },
            {
                path: 'tea_changepwd',
                name:'tea_changepwd',
                component: tea_changepwd
            }
        ]
    }
]

var router =  new VueRouter({
    routes
})
export default router;