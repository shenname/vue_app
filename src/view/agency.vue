<template>
    <div>
			<van-pull-refresh style="min-height: 90vh;" v-model="isLoading" @refresh="onRefresh">
			  <p>刷新次数: {{ count }}</p>
			</van-pull-refresh>
    </div>
</template>
<script>
	import Vue from 'vue';
	import { PullRefresh } from 'vant';
	import { Toast } from 'vant';
	export default {
		data(){
			return{
				num:null,
				count: 0,
				      isLoading: false,
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