<template>
<!-- 病情详情 -->
  <div>
    <van-cell title="牛只信息" center style="height:2.8rem">
	</van-cell>
  <van-row type="flex" justify="center">
		<van-col span="22" >
	<van-cell-group >
	  <van-field v-model="ruleForm.earTradeNo"  center  label="牛耳号"  readonly ></van-field>
    <van-field v-model="ruleForm.oncomeTime"  center  label="发病日期"  readonly />
    <van-field v-model="ruleForm.symptom"  center  label="症状"  readonly />
    <van-field v-model="ruleForm.organ"  center  label="所属系统"  readonly />
	</van-cell-group>
	</van-col>
	</van-row>
  <van-cell title="体重信息"  center  style="height:2.8rem"/>
	<van-row type="flex" justify="center">
		<van-col span="22" >
	<van-cell-group>
	 	<van-field label="场别" label-width='4rem' :value="ruleForm.fname" readonly />
			<van-field label="牛舍名" label-width='4rem' :value="ruleForm.cowHouse" readonly />
			<van-field label="发病月龄" label-width='4rem' :value="ruleForm.oncomeMoonAge" readonly />
			<van-field label="商品名" label-width='4rem' :value="ruleForm.tradeName" readonly />
			<van-field label="出生日期" label-width='4rem' :value="ruleForm.birthTime" readonly />
      <van-field label="原牧场" label-width='4rem' :value="ruleForm.oldFName" readonly />
      <van-field label="入场时间" label-width='4rem' :value="ruleForm.callInTime" readonly />
      <van-field label="性别" label-width='4rem' :value="ruleForm.sex" readonly />
	</van-cell-group>
	</van-col>
	
	</van-row>
  </div>
</template>
<script>
import { Field } from 'vant';
	import { Toast } from 'vant';
	import { Button } from 'vant';
	import { Dialog } from 'vant';
	import { Notify } from 'vant';
	import { DatetimePicker } from 'vant';
	import { Form } from 'vant';
export default {
  data() {
    return {
        ruleForm:{},    
    }
  },
  mounted() {
    this.ruleForm.earTradeNo=this.$route.query.tradeNo;
    this.getInfo();
  },
  methods: {
    getInfo(){
            this.$json({
                url: `/mhj/getCowDiseaseLogList?searchContext=${this.ruleForm.earTradeNo}`,
                method: "get",
            }).then(res => {
              this.ruleForm=res.resp[0];
            })
    },
  },
}
</script>
<style lang="less" scoped>

</style>