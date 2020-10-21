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
			path: '/sellingCattle',
			name:　"sellingCattle",
			component: () => import('@/view/sellingCattle.vue'),
			meta: {
				title: '出售牛只单',
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
			},
			children: [
				
			]
		},
		{
			path: '/personalInformations',
			name:"personalInformations",
			component: () => import('@/view/users/personalInformations.vue'),
			meta: {
				title: '个人信息',
				keepAlive: true,
				keepheaderAlive: true,    
			}
		},
		{
			path: '/phoneChange',
			name:"phoneChange",
			component: () => import('@/view/users/phoneChange.vue'),
			meta: {
				title: '修改手机号',
				keepAlive: true,
				keepheaderAlive: true,    
			}
		},
		{
			path: '/passwordChange',
			name:"passwordChange",
			component: () => import('@/view/users/passwordChange.vue'),
			meta: {
				title: '修改密码',
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
			path: '/weighRecord',
			name:　"weighRecord",
			component: () => import('@/view/cultivation/weighRecord.vue'),
			meta: {
				title: '称重管理',
				keepAlive: true,
				keepheaderAlive: true,
			}
		},
		{
			path: '/cattleWeighing',
			name:　"cattleWeighing",
			component: () => import('@/view/cultivation/cattleWeighing.vue'),
			meta: {
				title: '牛只称重',
				keepAlive: true,
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
