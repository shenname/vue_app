<template>
  <div>
    <van-cell title="单据信息" center ></van-cell>
    <van-row type="flex" justify="center">
		<van-col span="22"  class="col">
	<van-cell-group>
	  <van-field v-model="text1"  label="牛耳号" required  placeholder="请选择牛耳号或扫描电子耳标获取">
			</van-field>
		<van-field v-model="text" label="发病日期" required  placeholder=""/>
		<van-field v-model="text" label="症状" required  placeholder="请填写症状"/>
    <van-field v-model="text" label="所属系统" required  placeholder="所属系统"/>
		<van-field v-model="text" label="症状备注"   placeholder="请输入备注"/>

	</van-cell-group>
	</van-col>
	</van-row>
  	<van-cell title="牛只信息" center ></van-cell>
  	<van-row type="flex" justify="center">
		  <van-col span="22" >
			<van-field label="场别" label-width='4rem' value="" readonly />
			<van-field label="牛舍名" label-width='4rem' value="" readonly />
			<van-field label="发病月龄" label-width='4rem' value="" readonly />
			<van-field label="商品名" label-width='4rem' value="" readonly />
			<van-field label="出生日期" label-width='4rem' value="" readonly />
      <van-field label="原牧场" label-width='4rem' value="" readonly />
      <van-field label="入场时间" label-width='4rem' value="" readonly />
      <van-field label="性别" label-width='4rem' value="" readonly />
			</van-col>
		 
		</van-row>
    	<van-row type="flex" justify="center">
	<van-col span="22" style='margin-top: 0.625rem;'>
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
  data(){
    return{
     text:'',
     text1:'',
    }
  },
  methods: {
    buttonClick(){
          Toast({
				   message: '单据保存成功',
				   icon: 'success',
				 });
    },
  },  
}
</script>
<style lang="less" scoped>
.col{
	 border: 1px solid #e4e4e4;
	}
	.van-cell-group .van-field{
		position: static;
		border-bottom: 1px solid #E4E4E4;
  }
  .van-field{
    position: static;
  }
</style>