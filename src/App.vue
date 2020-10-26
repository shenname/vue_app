<template>
  <div>
    <form action="/" v-if="$route.meta.keepAlive" class="head">
	  	<van-nav-bar
		  v-if="$route.meta.title != '首页'"
		  :title="$route.meta.title"
		  left-text="返回"
		  right-text=""
		  left-arrow
		  @click-left="onClickLeft"
		  />
		<p class="header" v-else>{{$route.meta.title}}</p>
	</form>
    <div :id="$route.meta.keepAlive && $route.meta.keepheaderAlive ? 'app' : !this.$route.meta.keepAlive && this.$route.meta.keepheaderAlive ? 'app1' : !this.$route.meta.keepAlive && !this.$route.meta.keepheaderAlive ? 'app2' : ''">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active" v-if="$route.meta.keepheaderAlive">
	  	<van-tabbar-item icon="wap-home" replace to="/home">首页</van-tabbar-item>
	  	<van-tabbar-item icon="add-square" replace to="/agency">代办</van-tabbar-item>
	  	<van-tabbar-item icon="manager" replace to="/user">我的</van-tabbar-item>
	  </van-tabbar>
  </div>
</template>

<script>
import { Notify, Toast } from 'vant';
export default {
  name: 'App',
	data() {
		return {
			active: 0,
		}
	},
  // 加载执行
	created(){
  	},
  	mounted(){
  	},
  	methods: {
		onClickLeft() {
			let routers = localStorage.getItem('routers');
			this.$router.push({path: routers})
			// this.$router.go(-1);
		},
  	},
}
</script>
<style lang="less" scoped>
	@heights: 46px;
	.head{
		// width: 100vw;
		// position: fixed;
		// top: 0;
		// left: 0;
	}
	.header{
		height: 45px;
		line-height: 45px;
		color: #323233;
		font-weight: 500;
		font-size: 16px;
		text-align: center;
		background-color: #fff;
		-webkit-user-select: none;
		user-select: none;
		border-bottom: 1px solid #ebedf0;
	}
	#app{
		height: calc(100vh - 50px - @heights) !important;
		overflow-y: scroll;
		background-color: #FFF;
	}
	#app1{
		height: calc(100vh - 50px) !important;
		overflow-y: scroll;
		background-color: #FFF;
	}
	#app2{
		height: 100vh !important;
		overflow-y: scroll;
		background-color: #FFF;
	}
</style>
