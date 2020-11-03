<template>
<!--  新增出库单 -->
  <div>
     <navTopS :types="typest" v-if="navtop" class="navtopst"></navTopS>
    <div v-if="moduleShow">
<van-form @submit="onSubmit">
    <van-cell title="单据信息" center style="height:2.8rem" ></van-cell>
    <van-row type="flex" justify="center">
		<van-col span="22"  class="col">
	<van-cell-group>
	  <van-field v-model="ruleForm.tradeNo"   label="单据编号" required   placeholder="自动生成" readonly >
			</van-field>
		<van-field :value="ruleForm.soTime"  label="出库日期" required :rules="[{ required: true, message: '' }]"   placeholder="" @click="show2 = true"/>
		<van-field :value="ruleForm.warehouseNameList" label="仓库"  required  readonly  placeholder="读取发货单仓库"/>
    <van-field v-model="ruleForm.dlTradeNo" label="发货单号" required :rules="[{ required: true, message: '' }]" @blur="getinfo()"  clearable placeholder="请输入发货单号"/>
    <van-field v-model="ruleForm.custName" label="客户" readonly  placeholder="根据发货单获取"/>
    <van-field v-model="ruleForm.deliverAddress" label="发货地址" readonly  placeholder="根据发货单获取"/>
		<van-field v-model="ruleForm.remark" label="备注"   placeholder="请输入备注"/>

	</van-cell-group>
	</van-col>
	</van-row>
     <div v-for="(item, index) of list" :key="index">
       	<van-cell center style="height:3.5rem">
            <template #title>
    <span class="custom-title">产品信息</span>
    <span style="margin-left:0.5rem">( {{item.bpCode+item.bpName}}&nbsp;&nbsp;{{item.foodType}}&nbsp;&nbsp;{{item.weight}}kg )</span>
  </template>
           <template #right-icon>
    <van-icon name="scan" size="2rem" @click="scan(item.bpId)" />
  </template>
         </van-cell>
  	<van-row type="flex" justify="center">
		  <van-col span="22" class="col" >
        <van-cell-group>
			<!-- <van-field  @click="skipInfo(item)"   label-width='4rem' :value="item.bpCode+item.bpName+' '+' '+' '+item.weight+'KG'" readonly >
       
			</van-field> -->
      
<van-field   v-for="(it, idx) of item.salesOutgoingBillsDetails" :label="it.zxTradeNo || it.labelCode" :key="idx"   label-width='6.1rem' :value="it.bpCode+it.bpName+' '+' '+' '+it.weight+'KG'" readonly @click="skipInfo(it)"  >
        <template #right-icon>
    <van-icon name="close" size="1.5rem"  color="red" @click="deleteList(index,idx)" />
  </template>
			</van-field>

      </van-cell-group>

			</van-col>
		 
		</van-row>
     </div>
    
    	<van-row type="flex" justify="space-around">
	<van-col span="10" style='margin-top: 1rem;'>
	<van-button type="info" round block @click="buttonClick(0)">保存</van-button>
 
	</van-col>
   <van-col span="10" style='margin-top: 1rem;'>
	<van-button type="info" round block @click="buttonClick(1)">保存并提交</van-button>
 
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
    <van-dialog v-model="show1" title="扫码" show-cancel-button @confirm="getCowByEarTag">
        <van-field label="单号" label-width="3rem" v-model="value" placeholder="请输入装箱单号或者产品标签" />
    </van-dialog>
    <div v-if="!moduleShow">
          <product :list="listInfo">  </product> 
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
  import { Calendar } from 'vant';
  import product from './productDetails'
  import navTopS from '../navTopS'
export default {
    data() {
      return {
         minDate: new Date(2020, 0, 1),
      currentDate: new Date(),
     typest:1,
     show: false,
     show1:false,
     show2:false,
     date:'',
     minDate: new Date(2020, 0, 1),
     ruleForm:{},
     navtop:true,
     list:[],
     listInfo:{},
     bpid:'',
     value:'',
     eaList:[],
     moduleShow:true,
     namelist:[],
      }
    },
    components:{
     product,
     navTopS
  },
     mounted(){
	 this.ruleForm.userName = JSON.parse(localStorage.getItem("userInfo")).userName;
	  },
    methods: {
      scan(id){
        this.show1=true;   
        this.bpid=id;
      },
      getCowByEarTag(){
            this.$json({
                url: `/mhj/getSalesOutgoingBillsBp?bpId=${this.bpid}&searchContext=${this.value}`,
                method: "get"
            }).then(res => {
               for(let i in this.list){
                     if(this.list[i].bpId==this.bpid){
                         this.list[i].salesOutgoingBillsDetails.push(res.resp[0])
                        //  this.ruleForm.warehouseNameList=res.resp[0].warehouseName
                         this.namelist.push(res.resp[0])
                     }
               }
               let hash={};
				this.namelist = this.namelist.reduce(function(item, next) {
         hash[next.warehouseName] ? '' : hash[next.warehouseName] = true && item.push(next);
         return item
				}, [])
				let namelist1='';
				for(let i in this.namelist){
						 namelist1+=this.namelist[i].warehouseName+','
				}
				this.ruleForm.warehouseNameList=namelist1.substring(0,namelist1.length-1);
            })
        },
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
      // 删除数组数据
      deleteList(i,val){
         this.list[i].salesOutgoingBillsDetails.splice(val,1);
      },
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
	        //  this.buttonClick();
		
    },
    buttonClick(type){
         let params=this.ruleForm;
         params.status=type;
         params.salesOutgoingBillsDetailsList=this.list;
				this.$json({
                url: `/mhj/addSalesOutgoingBills`,
								method: `put`,
								 data: params,
            }).then(res => {
                	 if (type==0) {
                     Toast({
				   message: '单据保存成功',
				   icon: 'success',
				 });
                   }else{
                     Toast({
				   message: '单据保存并提交成功',
				   icon: 'success',
				 });
                   }
				 this.$router.push('/marketSingle');
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
.navtopst{position: absolute;top: 0;}
.col{
	 border: 1px solid #e4e4e4;
	}
	.van-cell-group .van-field{
		position: static;
		border-bottom: 1px solid #E4E4E4;
  }
</style>