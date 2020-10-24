<template>
    <div>
			<!-- <van-pull-refresh style="min-height: 90vh;" v-model="isLoading" @refresh="onRefresh">
			  <p>刷新次数: {{ count }}</p>
			</van-pull-refresh> -->
		<van-swipe-cell>
  <van-cell :border="false" title="单元格" value="内容" />
  <template slot="right">
    <van-button square type="danger" text="删除" />
    <van-button square type="primary" text="收藏" />
  </template>
</van-swipe-cell>
    </div>
</template>
<script>
import Vue from 'vue';
	import { Cell, CellGroup } from 'vant';
	import { PullRefresh } from 'vant';
	import { Toast } from 'vant';
	import { Field } from 'vant';
	import { Button } from 'vant';
	import { SwipeCell } from 'vant';
	Vue.use(SwipeCell);
	export default {
		data(){
			return{
				num:null,
				count: 0,
							isLoading: false,
							sms:''
			}
		},
		mounted(){
			this.num=Math.floor(Math.random()*10);
		},
		methods:{
			 onRefresh() {
			      setTimeout(() => {
			        Toast('刷新成功');
			        this.isLoading = false;
			        this.count++;
			      }, 1000);
			    },
		}
	}
</script>