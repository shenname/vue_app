<template>
  <div>
    <van-form ref="formData" @submit="onSubmit">
    <van-cell title="单据信息" center ></van-cell>
    <van-row type="flex" justify="center">
		<van-col span="22"  class="col">
	<van-cell-group>
	  <van-field v-model="ruleForm.earTradeNo"  label="牛耳号" required :rules="[{ required: true, message: '' }]"  placeholder="请选择牛耳号或扫描电子耳标获取" right-icon="scan" @click-right-icon="show1 = true" >
			</van-field>
		<van-field :value="ruleForm.oncomeTime"  label="发病日期" required :rules="[{ required: true, message: '' }]"  placeholder="" @click="show2 = true"/>
		<van-field v-model="ruleForm.symptom" label="症状" required :rules="[{ required: true, message: '' }]"  placeholder="请填写症状"/>
    <van-field v-model="ruleForm.organ" label="所属系统" required :rules="[{ required: true, message: '' }]"  placeholder="所属系统"/>
		<van-field v-model="ruleForm.symptomRemark" label="症状备注"   placeholder="请输入备注"/>

	</van-cell-group>
	</van-col>
	</van-row>
  	<van-cell title="牛只信息" center ></van-cell>
  	<van-row type="flex" justify="center">
		  <van-col span="21" >
			<van-field label="场别" label-width='4rem' :value="ruleForm.fname" readonly />
			<van-field label="牛舍名" label-width='4rem' :value="ruleForm.cowHouse" readonly />
			<van-field label="发病月龄" label-width='4rem' :value="ruleForm.oncomeMoonAge" readonly />
			<van-field label="商品名" label-width='4rem' :value="ruleForm.tradeName" readonly />
			<van-field label="出生日期" label-width='4rem' :value="ruleForm.birthTime" readonly />
      <van-field label="原牧场" label-width='4rem' :value="ruleForm.oldFName" readonly />
      <van-field label="入场时间" label-width='4rem' :value="ruleForm.callInTime" readonly />
      <van-field label="性别" label-width='4rem' :value="ruleForm.sex" readonly />
			</van-col>
		 
		</van-row>
    	<van-row type="flex" justify="center">
	<van-col span="22" style='margin-top: 0.625rem;'>
	<van-button type="info" round  block native-type="submit">提交</van-button>
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
     <van-dialog v-model="show1" title="扫码" show-cancel-button @confirm="getCowByEarTag">
        <van-field label="耳标号" v-model="value" placeholder="请输入耳标号" />
    </van-dialog>
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
  data(){
    return{
 minDate: new Date(2020, 0, 1),
      currentDate: new Date(),
     text:'',
     text1:'',
     show: false,
     show1:false,
     show2:false,
     date:'',
     minDate: new Date(2020, 0, 1),
     ruleForm:{
         earTradeNo:''
     },
     value:'',
    }
  },
  mounted(){
    this.ruleForm.earTradeNo=this.$route.query.tradeNo;
    this.getInfo();
	 this.ruleForm.userName = JSON.parse(localStorage.getItem("userInfo")).userName;
	  },
  methods: {
    getInfo(){
            this.$json({
                url: `/mhj/getCowDiseaseLogList`,
                method: "get",
            }).then(res => {
               for(let i in res.resp){
                   if (this.ruleForm.earTradeNo==res.resp[i].earTradeNo) {
                     this.ruleForm=res.resp[i]
                   }
               }
            })
    },
    confirm() {
      this.show2 = false;
      this.ruleForm.oncomeTime=
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
                url: `/mhj/modifyCowDiseaseLog`,
								method: `post`,
								 data: params,
            }).then(res => {
                	 Toast({
				   message: '单据保存成功',
				   icon: 'success',
				 });
				 this.$router.push('/diseaseManagement');
            })
    },
    getCowByEarTag(){
            this.$json({
                url: `/mhj/getAddCowDiseaseLogCowBox?earTradeNo=${this.value}`,
                method: "get"
            }).then(res => {
              this.ruleForm=res.resp[0];
            })
        },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.ruleForm.oncomeTime = this.formatDate(date);
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