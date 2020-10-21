<template>
    <div>
			<!-- <van-pull-refresh style="min-height: 90vh;" v-model="isLoading" @refresh="onRefresh">
			  <p>刷新次数: {{ count }}</p>
			</van-pull-refresh> -->
			<van-cell-group>
			<van-field
  v-model="sms"
  center
  clearable
  label="短信验证码"
  placeholder="请输入短信验证码"
>
  <template #button>
    <van-button size="small" type="primary">发送验证码</van-button>
  </template>
</van-field>
</van-cell-group>
    </div>
</template>
<script>
	import { Cell, CellGroup } from 'vant';
	import { PullRefresh } from 'vant';
	import { Toast } from 'vant';
	import { Field } from 'vant';
	import { Button } from 'vant';
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