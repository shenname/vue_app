<template>
<!-- 牛只称重详情 -->
  <div>
    <van-cell title="牛只信息" center style="height:2.8rem">
	</van-cell>
  <van-row type="flex" justify="center">
		<van-col span="22" >
	<van-cell-group v-for="(item, index) of eaList" :key="index" >
	  <van-field v-model="item.earTradeNo"  center  label="牛耳号"  readonly >
			</van-field>
	</van-cell-group>
	</van-col>
	</van-row>
  <van-cell title="体重信息"  center  style="height:2.8rem"/>
	<van-row type="flex" justify="center">
		<van-col span="22" >
	<van-cell-group>
	  <van-field v-model="ruleForm.cowHouse" label="牛舍"  readonly />
		<van-field v-model="ruleForm.weight" label="重量" readonly/>
		<van-field v-model="ruleForm.weighTime" label="称重时间" readonly />
		<van-field v-model="ruleForm.remark" label="备注"  readonly  />
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
     data(){
       return{
          eaList:[],
          ruleForm:{},
       }
     },
     mounted(){
      let test=this.$route.query.tradeNo;
      let test1=test.split(",");
      for(let item of test1){
             this.eaList.push({
                  earTradeNo:item
             })
      }
    this.getInfo();
	  },
     methods: {
       getInfo(){
            this.$json({
                url: `/mhj/getCowWeighLogList?earTradeNo=${this.$route.query.tradeNo}`,
                method: "get",
            }).then(res => {
              for(let i in res.resp){
                 if( this.$route.query.cwlId==res.resp[i].cwlId){
                       this.ruleForm=res.resp[i];
                 }
              }
               
            })
    },
     },  
}
</script>
<style lang="less" scoped>
</style>