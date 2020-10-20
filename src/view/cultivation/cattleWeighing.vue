<template>
	<div>
	<van-cell title="牛只信息" center >
	 
	  <template #right-icon>
			<van-icon name="plus" size="2rem"/>
	    <van-icon name="scan"  size="2rem"/>
	  </template>
	</van-cell>
	<van-row type="flex" justify="center">
		<van-col span="22">
	<van-cell-group>
	  <van-field v-model="text1"  label="牛耳号" required  placeholder="请选择牛耳号或扫描电子耳标获取">
		<template #button>
		    <van-button size="small" type="primary">发送验证码</van-button>
		  </template>
			</van-field>
		<van-field v-model="text" label="牛耳号" required  placeholder="请选择牛耳号或扫描电子耳标获取"/>
		<van-field v-model="text" label="牛耳号" required  placeholder="请选择牛耳号或扫描电子耳标获取"/>
	</van-cell-group>
	</van-col>
	</van-row>
	<van-cell title="体重信息"  center />
	<van-row type="flex" justify="center">
		<van-col span="22">
	<van-cell-group>
	  <van-field v-model="text" label="牛舍" required  placeholder="根据牛耳号获取" disabled />
		<van-field v-model="text" label="重量" required  placeholder="请输入重量(KG)"/>
		<van-field v-model="text" label="称重时间" required />
		<van-field v-model="text" label="备注"   placeholder="请输入备注"/>
	</van-cell-group>
	</van-col>
	
	</van-row>
	<van-row type="flex" justify="center">
	<van-col span="22" style='border:none;margin-top: 0.625rem;'>
	<van-button type="info" round  block @click='buttonClick'>提交</van-button>
	</van-col>
		</van-row>
	</div>
</template>

<script>
	import { Field } from 'vant';
	import { Toast } from 'vant';
	import { Button } from 'vant';
	export default {
	  // 数据
	  data() {
	    return {
				text: '',
				text1:'',
	    };
	  },
	  methods: {
			buttonClick(){
				 Toast({
				   message: '单据保存成功',
				   icon: 'success',
				 });
			},
	  },
	  mounted(){
	 
	  }
	}
</script>

<style scoped="scoped">
	.van-col{
	 border: 1px solid #e4e4e4;
	}
	.van-field{
		position: static;
		border-bottom: 1px solid #E4E4E4;
	}
</style>
