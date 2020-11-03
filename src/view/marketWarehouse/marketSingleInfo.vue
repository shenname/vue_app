<template>
<!-- 销售出库单详情 -->
  <div>
    <navTopS :types="typest" v-if="navtop" class="navtopst"></navTopS>
   <div v-if="moduleShow">
       <van-cell title="单据信息" center style="height:2.8rem">
	</van-cell>
  <van-row type="flex" justify="center">
		<van-col span="22" >
	<van-cell-group >
	  <van-field v-model="ruleForm.tradeNo"  center  label="单据编号"  readonly ></van-field>
    <van-field v-model="ruleForm.soTime"  center  label="入库日期"  readonly />
    <van-field v-model="ruleForm.warehouseNameList"  center  label="仓库"  readonly />
    <van-field v-model="ruleForm.dlTradeNo"  center  label="发货单号"  readonly />
    <van-field v-model="ruleForm.custName"  center  label="客户"  readonly />
    <van-field v-model="ruleForm.deliverAddress"  center  label="发货地址"  readonly />
    <van-field v-model="ruleForm.remark"  center  label="备注"  readonly />
	</van-cell-group>
	</van-col>
	</van-row>
  <div v-for="(item, index) of list" :key="index">
      <van-cell center style="height:3.5rem">
            <template #title>
    <span class="custom-title">产品信息</span>
    <span style="margin-left:0.5rem">( {{item.bpCode+item.bpName}}&nbsp;&nbsp;{{item.foodType}}&nbsp;&nbsp;{{item.weight}}kg )</span>
  </template>
         </van-cell>
  	<van-row type="flex" justify="center">
		  <van-col span="22" class="col" >
        <van-cell-group>
			<!-- <van-field @click="skipInfo(item)"   label-width='4rem' :value="item.bpCode+item.bpName+' '+' '+' '+item.weight+'KG'" readonly >
			</van-field> -->
      <van-field   v-for="(it, idx) of item.salesOutgoingBillsDetails" :label="it.zxTradeNo || it.labelCode" :key="idx"   label-width='7rem' :value="it.bpCode+it.bpName+' '+' '+' '+it.weight+'KG'" readonly  @click="skipInfo(it)" >
			</van-field>
      </van-cell-group>
			</van-col>
		 
		</van-row>
     </div>
   </div>
     <div v-if="!moduleShow">
          <market :list="listInfo">  </market> 
    </div>
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
  import market from './productDetails'
  import navTopS from '../navTopS'
export default {
  data() {
    return {
      ruleForm:{},    
      list:[],
      moduleShow:true,
      listInfo:{},
      typest:1,
      navtop:true,
    }
  },
  components:{
     market,
     navTopS
  },
   mounted() {
    this.ruleForm.tradeNo=this.$route.query.tradeNo;
    this.getInfo();
  },
  methods: {
    guanb(){
      this.moduleShow=true;
      this.typest=1;
    },
    skipInfo(val){
          this.moduleShow=false;
          this.listInfo=val;
          this.typest=2;
          // this.navtop=true;
      },
     getInfo(){
            this.$json({
                url: `/mhj/getSalesOutgoingBillsDetail?tradeNo=${this.ruleForm.tradeNo}`,
                method: "get",
            }).then(res => {
              this.ruleForm=res.resp;
              this.list=res.resp.salesOutgoingBillsDetailsList;
              this.list.map((item,key)=>{
                 this.$json({
                      url: `/mhj/getSalesOutgoingBillsDetailUnfold?sobdId=${item.sobdId}`,
                      method: "get",
                 }).then(res=>{
                     item.salesOutgoingBillsDetails=res.resp;
                 })
              })
            })
    },
  },
}
</script>
<style lang="less" scoped>
.navtopst{position: absolute;top: 0;}
.col{
	 border: 1px solid #e4e4e4;
	}

</style>