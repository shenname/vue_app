<template>
	<div class="record">
		<van-pull-refresh v-model="refreshing"   @refresh="onRefresh">
		<van-row>
		  <van-col span="24" >
			<van-field label="牛耳号:" value="GN0301190001" readonly />
			<van-field label="牛舍:" value="S308" readonly />
			<van-field label="重量:" value="1680.69KG" readonly />
			<van-field label="称重时间:" value="2020-10-15 11:59:38" readonly />
			<van-field label="备注:" value="批量称重" readonly />
			</van-col>
		 
		</van-row>
		</van-pull-refresh>
		<div class="addList">
			<van-icon name="add-o" size="3rem" @click='iconClick'/>
		</div>
	</div>
</template>

<script>
	import { Col, Row } from 'vant';
	import { Cell, CellGroup } from 'vant';
	import { Field } from 'vant';
	import { PullRefresh } from 'vant';
	import { Toast } from 'vant';
	export default {
	  // 数据
	  data() {
	    return {
				refreshing:false,
	    };
	  },
	  methods: {
	    iconClick(){
				 this.$router.push('/cattleWeighing');
			},
			onRefresh() {
				setTimeout(() => {
       this.refreshing = false;
      }, 1000);
        },
	  },
	  mounted(){
	 
	  }
	}
</script>
<style>
</style>
<style scoped="scoped">
	.addList .van-icon{
		position: fixed;
		bottom: 6rem;
		right: 2rem;
	}
	.record .van-col{
		border: 1px solid #e4e4e4;
		margin-top: 0.9375rem;
		margin-left: 0.625rem;
	}
	.record .van-cell{
		position: static;
	}
</style>
