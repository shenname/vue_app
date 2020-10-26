export const routes = [
	{
		path: '/',
		redirect: '/home'
	},
	// 货位调拨 Goods allocate
	{
		path: '/goodsAllocate',
		name:　"goodsAllocate",
		component: () => import('@/view/goodsAllocate/index.vue'),
		meta: {
			title: "货位调拨",
			keepAlive: true,
			keepheaderAlive: true,
		}
	},
	{
		path: '/goodsAllocateAdd',
		name:　"goodsAllocateAdd",
		component: () => import('@/view/goodsAllocate/add.vue'),
		meta: {
			title: "新增调拨单",
			keepAlive: true,
			keepheaderAlive: true,
		}
	},
	// 治疗用药
	{
		path: '/treatment',
		name:　"treatment",
		component: () => import('@/view/treatment/index.vue'),
		meta: {
			title: "治疗用药",
			keepAlive: true,
			keepheaderAlive: true,
		}
	},
	{
		path: '/treatmentAdd',
		name:　"treatmentAdd",
		component: () => import('@/view/treatment/add.vue'),
		meta: {
			title: "用药记录",
			keepAlive: true,
			keepheaderAlive: true,
		}
	},
	{
		path: '/treatmentInfo',
		name:　"treatmentInfo",
		component: () => import('@/view/treatment/info.vue'),
		meta: {
			title: "用药记录",
			keepAlive: true,
			keepheaderAlive: true,
		}
	},
	{
		path: '/pFproducts',
		name:　"pFproducts",
		component: () => import('@/view/PackingofFinishedProducts/pFproducts.vue'),
		meta: {
			title: "装箱单列表",
			keepAlive: true,
			keepheaderAlive: true,
		}
	},
	{
		path: '/addPfproducts',
		name:　"addPfproducts",
		component: () => import('@/view/PackingofFinishedProducts/addPfproducts.vue'),
		meta: {
			title: "新增装箱单",
			keepAlive: false,
			keepheaderAlive: true,
		}
	},
	{
		path: '/editpFproducts',
		name:　"editpFproducts",
		component: () => import('@/view/PackingofFinishedProducts/editpFproducts.vue'),
		meta: {
			title: "修改装箱单",
			keepAlive: false,
			keepheaderAlive: true,
		}
	},
	{
		path: '/chakpFproducts',
		name:　"chakpFproducts",
		component: () => import('@/view/PackingofFinishedProducts/chakpFproducts.vue'),
		meta: {
			title: "装箱单详情",
			keepAlive: false,
			keepheaderAlive: true,
		}
	},
	{
		path: '/fgWarehousing',
		name:　"fgWarehousing",
		component: () => import('@/view/finishedGoodsWarehousing/fgWarehousing.vue'),
		meta: {
			title: "产成品入库单",
			keepAlive: true,
			keepheaderAlive: true,
		}
	},
	{
		path: '/fgWarehousingEdit',
		name:　"fgWarehousingEdit",
		component: () => import('@/view/finishedGoodsWarehousing/fgWarehousingEdit.vue'),
		meta: {
			title: "编辑入库单",
			keepAlive: true,
			keepheaderAlive: true,
		}
	},
	{
		path: '/earMarkers',
		name:　"earMarkers",
		component: () => import('@/view/earMarkers/index.vue'),
		meta: {
			title: "电子耳标",
			keepAlive: true,
			keepheaderAlive: true,
		}
	},
	{
		path: '/earMarkersAdd',
		name:　"earMarkersAdd",
		component: () => import('@/view/earMarkers/add.vue'),
		meta: {
			title: "新增关联",
			keepAlive: true,
			keepheaderAlive: true,
		}
	},
	{
		path: '/earMarkersInfo',
		name:　"earMarkersInfo",
		component: () => import('@/view/earMarkers/info.vue'),
		meta: {
			title: "关联详情",
			keepAlive: true,
			keepheaderAlive: true,
		}
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
		path: '/diseaseInfo',
		name:　"diseaseInfo",
		component: () => import('@/view/cultivation/diseaseInfo.vue'),
		meta: {
			title: '病情详情',
			keepAlive: true,
			keepheaderAlive: true,
		}
	},
	{
		path: '/transferInfo',
		name:　"transferInfo",
		component: () => import('@/view/transfer/info.vue'),
		meta: {
			title: '转舍详情',
			keepAlive: true,
			keepheaderAlive: true,
		}
	},
	
	{
		path: '/transferAdd',
		name:　"transferAdd",
		component: () => import('@/view/transfer/add.vue'),
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
		path: '/weightInfo',
		name:　"weightInfo",
		component: () => import('@/view/cultivation/weightInfo.vue'),
		meta: {
			title: '牛只称重详情',
			keepAlive: true,
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
		path: '/diseaseManagement',
		name:　"diseaseManagement",
		component: () => import('@/view/cultivation/diseaseManagement.vue'),
		meta: {
			title: '病情管理',
			keepAlive: true,
			keepheaderAlive: true,
		}
	},
	{
		path: '/addDisease',
		name:　"addDisease",
		component: () => import('@/view/cultivation/addDisease.vue'),
		meta: {
			title: '新增病情',
			keepAlive: true,
			keepheaderAlive: true,
		}
	},
	{
		path: '/editDisease',
		name:　"editDisease",
		component: () => import('@/view/cultivation/editDisease.vue'),
		meta: {
			title: '编辑病情',
			keepAlive: true,
			keepheaderAlive: true,
		}
	},
	{
		path: '/sellingCattle',
		name:　"sellingCattle",
		component: () => import('@/view/sellingcattles/sellingCattle.vue'),
		meta: {
			title: '出售牛只单',
			keepAlive: true,
			keepheaderAlive: true,
		}
	},
	{
		path: '/sellingCattleAdd',
		name:　"sellingCattleAdd",
		component: () => import('@/view/sellingcattles/sellingCattleAdd.vue'),
		meta: {
			title: '新增出售单',
			keepAlive: false,
			keepheaderAlive: true,
		}
	},
	{
		path: '/sellingCattleEdit',
		name:　"sellingCattleEdit",
		component: () => import('@/view/sellingcattles/sellingCattleEdit.vue'),
		meta: {
			title: '编辑出售单',
			keepAlive: false,
			keepheaderAlive: true,
		}
	},
	{
		path: '/sellingDDetails',
		name:　"sellingDDetails",
		component: () => import('@/view/sellingcattles/sellingDDetails.vue'),
		meta: {
			title: '出售牛只单详情',
			keepAlive: false,
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
			keepheaderAlive: false,
		}
	},
	{
		path: '/share',
		name:　"share",
		component: () => import('@/view/404.vue'),
		meta: {
			title: 'share',
			keepAlive: false,
			keepheaderAlive: false,
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
