<template>
<!--  新增出库单 -->
  <div>
    <!--  新增病情 -->
    <van-form @submit="onSubmit">
    <van-cell title="单据信息" center style="height:2.8rem" ></van-cell>
    <van-row type="flex" justify="center">
		<van-col span="22"  class="col">
	<van-cell-group>
	  <van-field v-model="ruleForm.tradeNo"   label="单据编号" required   placeholder="自动生成" readonly >
			</van-field>
		<van-field :value="ruleForm.soTime"  label="出库日期" required :rules="[{ required: true, message: '' }]"   placeholder="" @click="show2 = true"/>
		<van-field label="仓库" required  readonly  placeholder="读取发货单仓库"/>
    <van-field v-model="ruleForm.dlTradeNo" label="发货单号" required :rules="[{ required: true, message: '' }]" @blur="getinfo()"  clearable placeholder="请输入发货单号"/>
    <van-field v-model="ruleForm.custName" label="客户" readonly  placeholder="根据发货单获取"/>
    <van-field v-model="ruleForm.deliverAddress" label="发货地址" readonly  placeholder="根据发货单获取"/>
		<van-field v-model="ruleForm.remark" label="备注"   placeholder="请输入备注"/>

	</van-cell-group>
	</van-col>
	</van-row>
     <div v-for="(item, index) of list" :key="index">
       	<van-cell title="产品信息" center style="height:2.8rem"></van-cell>
  	<van-row type="flex" justify="center">
		  <van-col span="21" class="col" >
        <van-cell-group>
			<van-field :label="item.zxTradeNo==null ? '无' :'' " label-width='4rem' :value="item.bpCode+item.bpName+' '+' '+' '+item.weight+'KG'" readonly />
      </van-cell-group>
			</van-col>
		 
		</van-row>
     </div>
    
    	<van-row type="flex" justify="space-around">
	<van-col span="10" style='margin-top: 1rem;'>
	<van-button type="info" round block  native-type="submit">保存</van-button>
 
	</van-col>
   <van-col span="10" style='margin-top: 1rem;'>
	<van-button type="info" round block  native-type="submit">保存并提交</van-button>
 
	</van-col>
		</van-row>
    <van-popup v-model="show2" position="bottom">
			<van-datetime-picker
  v-model="currentDate"
  type="datetime"
  title="选择完整时间"
	@confirm="confirm"
        @cancel="cancel"
  :min-date="minDate"
/>
 </van-popup>
   
    </van-form>
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
  import { Calendar } from 'vant';
export default {
    data() {
      return {
         minDate: new Date(2020, 0, 1),
      currentDate: new Date(),
     text:'',
     text1:'',
     show: false,
     show2:false,
     date:'',
     minDate: new Date(2020, 0, 1),
     ruleForm:{
         
     },
     value:'',
     list:[],
      }
    },
     mounted(){
	 this.ruleForm.userName = JSON.parse(localStorage.getItem("userInfo")).userName;
	  },
    methods: {
      confirm() {
      this.show2 = false;
      this.ruleForm.soTime=
        this.currentDate.getFullYear() +"-"+
        (Number(this.currentDate.getMonth()) + 1) +"-"+
        this.currentDate.getDate() +" "+
        this.currentDate.getHours() +":" +this.currentDate.getMinutes()+":"+this.currentDate.getSeconds()+"0";
      this.starttime1 = new Date(this.currentDate).getTime() / 1000;
    },
			cancel() {
      this.show2 = false;
		},
    onSubmit(values) {
	         this.buttonClick();
		
    },
    buttonClick(){
         let params=this.ruleForm;
				this.$json({
                url: `/mhj/addCowDiseaseLog`,
								method: `put`,
								 data: params,
            }).then(res => {
                	 Toast({
				   message: '单据保存成功',
				   icon: 'success',
				 });
				 this.$router.push('/diseaseManagement');
            })
    },
    getinfo(){
          this.$json({
                url: `/mhj/getSalesOutgoingBillsTemp?fhTradeNo=${this.ruleForm.dlTradeNo}`,
                method: "get"
            }).then(res => {
              if (res.resp.length==0) {
                    Notify({ type: 'danger', message: '请输入正确的发货单号!' });
                    this.ruleForm.dlTradeNo='';
                    return;
              }
              console.log(res.resp)
              this.ruleForm=res.resp;
              this.list=res.resp.salesOutgoingBillsDetailsList;
            })
    },
    
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.ruleForm.soTime = this.formatDate(date);
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
</style>