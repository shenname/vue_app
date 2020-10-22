<template>
	<div>
	<van-cell title="牛只信息" center >
	 
	  <template #right-icon>
			<van-icon name="plus" size="2rem" @click="add"/>
	    <van-icon name="scan"  size="2rem" @click="show = true;" />
	  </template>
	</van-cell>
	<van-row type="flex" justify="center">
		<van-col span="22">
	<van-cell-group v-for="(item, index) of eaList" :key="index">
	  <van-field v-model="item.earTradeNo" center  label="牛耳号" required  placeholder="请选择牛耳号或扫描电子耳标获取">
			</van-field>
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
		<van-dialog v-model="show" title="扫码" show-cancel-button @confirm="getCowByEarTag">
        <van-field label="耳标号" v-model="value" placeholder="请输入耳标号" />
    </van-dialog>
	</div>
</template>

<script>
	import { Field } from 'vant';
	import { Toast } from 'vant';
	import { Button } from 'vant';
	import { Dialog } from 'vant';
	export default {
	  // 数据
	  data() {
	    return {
				text: '',
				text1:'',
				show:false,
				value:'',
				eaList:[],
	    };
	  },
	  methods: {
			add(){
            this.eaList.push({
                earTradeNo: '',
                // oldCowHouse: '',
                // oldcowHouseId: '',
            })
        },
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
