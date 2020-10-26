import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './router'


Vue.use(Router)

export default new Router({
	mode: 'history',  //去掉url中的#
	routes:	routes
})
