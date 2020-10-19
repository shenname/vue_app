<template>
  <div>
    <form action="/" v-if="$route.meta.keepAlive">
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
    <div id="app">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active" v-if="$route.meta.keepAlive">
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
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="less" scoped>
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
</style>
