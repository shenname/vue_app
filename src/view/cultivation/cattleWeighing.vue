<template>
<!--  牛只称重 -->
	<div>
		<van-form @submit="onSubmit">
	<van-cell title="牛只信息" center >
	 
	  <template #right-icon>
			<van-icon name="plus" size="2rem" @click="add"/>
	    <van-icon name="scan"  size="2rem" @click="show = true;" />
	  </template>
	</van-cell>
	<van-row type="flex" justify="center">
		<van-col span="22" style="border:1px solid #cccccc">
	<van-cell-group v-for="(item, index) of eaList" :key="index">
		<van-swipe-cell>
	  <van-field v-model="item.earTradeNo"  center  label="牛耳号" @blur="getEaName(item.earTradeNo,index)" clearable  required :rules="[{ required: true, message: '' }]"  placeholder="请选择牛耳号或扫描电子耳标获取">
			</van-field>
			<template #right>
                    <van-button square text="删除" type="danger" class="delete-button" @click="deleteFun(index)" />
                </template>
			</van-swipe-cell>
	</van-cell-group>
	</van-col>
	</van-row>
	<van-cell title="体重信息"  center  style="height:2.8rem"/>
	<van-row type="flex" justify="center">
		<van-col span="22" style="border:1px solid #cccccc">
	<van-cell-group>
	  <van-field v-model="ruleForm.cowHouse" label="牛舍" required :rules="[{ required: true, message: '' }]"  placeholder="根据牛耳号获取" disabled />
		<van-field v-model="ruleForm.weight" label="重量" required :rules="[{ required: true, message: '' }]" clearable  placeholder="请输入重量(KG)"/>
		<van-field v-model="ruleForm.weighTime" label="称重时间" required :rules="[{ required: true, message: '' }]"  @click="show1=true"/>
		<van-field v-model="ruleForm.remark" label="备注"   placeholder="请输入备注"/>
	</van-cell-group>
	</van-col>
	
	</van-row>
	<van-row type="flex" justify="center">
	<van-col span="22" style='border:none;margin-top: 0.625rem;'>
	<van-button type="info" round  block  native-type="submit">提交</van-button>
	</van-col>
		</van-row>
		<van-popup v-model="show1" position="bottom">
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
	import { Notify } from 'vant';
	import { DatetimePicker } from 'vant';
	import { Form } from 'vant';
	import { SwipeCell } from 'vant';
	export default {
	  // 数据
	  data() {
	    return {
				minDate: new Date(2020, 0, 1),
      currentDate: new Date(),
				show:false,
				show1:false,
				value:'',
				eaList:[],
				ruleForm:{
					userName:'',
					cowHouse:'',
					cowHouseId:'',
					weight:'',
					weighTime:'',
					remark:'',
				},
	    };
	  },
	  methods: {
			deleteFun(key){
            this.eaList.splice(key,1);
        },
			getEaName(earTradeNo,index){
        this.$json({
                url: `/mhj/getCowWeighLogList?earTradeNo=${earTradeNo}`,
                method: "get"
            }).then(res => {
							if (res.resp.length==0) {
								 Notify({ type: 'danger', message: '请输入正确的牛耳号!' });
                    return;
							}
								 let type = false,htype = false;
								 let num=0;
                for(let item of this.eaList){
                    if(item.earTradeNo == earTradeNo){
                            num++;
										}
                    if (item.cowHouse!="") {
												if(res.resp[0].cowHouse != item.cowHouse){
                        htype = true
                    }
										}
								}
								if(num>1){
									 type = true;
								}
                if(type){
										Notify({ type: 'danger', message: '该牛只已存在!' });
                    return;
								}
								if(htype){
										Notify({ type: 'danger', message: '请输入同一个牛舍的牛只!' });
                    return;
								}
								this.eaList[index].cowHouse=res.resp[0].cowHouse
                this.eaList[index].cowHouseId=res.resp[0].cowHouseId
                this.ruleForm.cowHouse = res.resp[0].cowHouse;
                this.ruleForm.cowHouseId = res.resp[0].cowHouseId;
            })
			},
			 confirm() {
      this.show1 = false;
      this.ruleForm.weighTime=
        this.currentDate.getFullYear() +"-"+
        (Number(this.currentDate.getMonth()) + 1) +"-"+
        this.currentDate.getDate() +" "+
        this.currentDate.getHours() +":" +this.currentDate.getMinutes()+":"+this.currentDate.getSeconds()+"0";
      this.starttime1 = new Date(this.currentDate).getTime() / 1000;
    },
			cancel() {
      this.show1 = false;
		},
		 onSubmit(values) {
	         this.buttonClick();
		
    },
			add(){
            this.eaList.push({
								earTradeNo: '',
								cowHouse: '',
                cowHouseId: '',    
            })
        },
			buttonClick(){
							 let params=this.ruleForm;
							 let ear='';
							 for(let i in this.eaList){
                    ear+=this.eaList[i].earTradeNo+","
							 }
							 if (ear.length > 0) {
              ear = ear.substr(0,ear.length - 1);
                }
							 params.earTradeNo=ear;
				this.$json({
                url: `/mhj/addCowWeighLog`,
								method: `put`,
								 data: params,
            }).then(res => {
                	 Toast({
				   message: '单据保存成功',
				   icon: 'success',
				 });
				 this.$router.push('/weighRecord');
            })
			
				 
			},
		
        getCowByEarTag(){
            this.$json({
                url: `/mhj/getCowWeighLogList?earTradeNo=${this.value}`,
                method: "get"
            }).then(res => {
							if (res.resp.length==0) {
								 Notify({ type: 'danger', message: '请输入正确的牛耳号!' });
                    return;
							}
                 let type = false,htype = false;
                for(let item of this.eaList){
                    if(item.earTradeNo == res.resp[0].earTradeNo){
                        type = true;
										}
										if(res.resp[0].cowHouse != item.cowHouse){
                        htype = true
                    }
                }
                if(type){
										Notify({ type: 'danger', message: '该牛只已存在!' });
                    return;
								}
								if(htype){
										Notify({ type: 'danger', message: '请输入同一个牛舍的牛只!' });
                    return;
                }
                this.eaList.push({
										earTradeNo: res.resp[0].earTradeNo,
										cowHouse: res.resp[0].cowHouse,
                    cowHouseId: res.resp[0].cowHouseId,    
								})
                this.ruleForm.cowHouse = res.resp[0].cowHouse;
                this.ruleForm.cowHouseId = res.resp[0].cowHouseId;
            })
        },
	  },
	  mounted(){
	 this.ruleForm.userName = JSON.parse(localStorage.getItem("userInfo")).userName;
	  }
	}
</script>

<style scoped="scoped">
	.van-col{
	 border: 1px solid #e4e4e4;
	}
	.delete-button {
    height: 100%;
}
</style>
