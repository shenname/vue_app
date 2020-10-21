import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes:[
		{
        	path: '/',
			redirect: '/home'
		},
		{
			path: '/transfer',
			name:　"transfer",
			component: () => import('@/view/transfer/index.vue'),
			meta: {
				title: '转舍记录',
				keepAlive: true,
				keepheaderAlive: true,
			}
		},
		{
			path: '/transferInfo',
			name:　"transferInfo",
			component: () => import('@/view/transfer/info.vue'),
			meta: {
				title: '新增转舍',
				keepAlive: true,
				keepheaderAlive: true,
			}
		},
		{
			path: '/home',
			name:　"home",
			component: () => import('@/view/home.vue'),
			meta: {
				title: '首页',
				keepAlive: true,
				keepheaderAlive: true,
			}
		},
		{
			path: '/user',
			name:　"user",
			component: () => import('@/view/user.vue'),
			meta: {
				title: '我的',
				keepAlive: true,
				keepheaderAlive: true,
			}
		},
		{
			path: '/agency',
			name:　"agency",
			component: () => import('@/view/agency.vue'),
			meta: {
				title: '代办',
				keepAlive: true,
				keepheaderAlive: true,
			}
		},
		{
			path: '/login',
			name:　"login",
			component: () => import('@/view/login.vue'),
			meta: {
				title: '登录',
				keepAlive: false,
				keepheaderAlive: true,
			}
		},
		{
			path: '/404',
			name:　"404",
			component: () => import('@/view/404.vue'),
			meta: {
				title: '404',
				keepAlive: true,
				keepheaderAlive: false,
			}
		},
		{
			path: '*',
			redirect: '/404'
		}
		
	]
})
