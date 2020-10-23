<template>
<div>
 <navTopS :types="typest" v-if="navtop"></navTopS>  <div class="wrappers">
  
    <div v-if="onVif">
      
        <div class="documentInformation">
        <van-form @submit="onSubmit">
            <div class="formes_top">
            <van-field label="单据编号" label-width="22%"	 required colon v-model="formes.tradeNo" disabled placeholder=""/>
            <van-field label="出售日期"  name="sellTime"  required :rules="[{ required: true, message: '' }]" label-width="22%" @focus="editTime" colon v-model="formes.sellTime"/>
                 <van-popup v-model="timeC" round position="bottom">
                     <div class="times">
                        <van-datetime-picker
                        
                        class="shij"
                            v-model="time"
                            type="datehour"
                     
                            @confirm="addTime"
                            @cancel="timeC=false"
                            
                        />
                    </div>
                </van-popup>
            <van-field label="出售牧场"  name="sellFactoryName" required  :rules="[{ required: true, message: '' }]" label-width="22%" @focus="showPopup=true" colon v-model="formes.sellFactoryName" />
                 <van-popup v-model="showPopup" round position="bottom">
                  <van-picker
                   
                      show-toolbar
                      :columns="factorylist"
                      @confirm="getMuc"
                      @cancel="showPopup=false"
                    
                    />
                </van-popup>
            <van-field label="出售方" required label-width="22%" colon v-model="formes.sellType"/>
            <van-field label="备注" required label-width="22%" colon v-model="formes.remark"/>
            </div>
            <van-row style="margin: 2% auto;width: 96%;">
                <van-col span="12"><p style="  line-height: 30px;">牛只信息</p></van-col>
                <van-col span="12" style="font-size:30px ;text-align: right;"><van-icon name="scan" @click="addEarts"/></van-col>
            </van-row>
            
            <!--牛只信息-->
            <ul>
                <li v-for="(item,index) in formes.details" :key="index" class="eartCss">
                    <div @click="eartDetails(item)">
                    <span>{{item.earTradeNo}}</span>
                    &nbsp;<span>{{item.chusfs}}</span>
                    &nbsp;<span>{{item.illness}}</span>
                    &nbsp;<span>{{item.sellWeight}}KG</span>
                    </div>
                    <div style="font-size:30px;line-height: 40px;padding-top:2%">
                <span  ><van-icon name="close" @click="onEart(item,index)"/></span>
                </div>
                </li>
            </ul>
        </van-form>
        <div class="tijn"  v-if="!timeC">
                <van-button round block type="info" @click="ssst(0)" >
                    保存
                </van-button>
                <van-button round block type="info"  @click="ssst(1)" >
                    提交
                </van-button>
            </div>
        </div>
        <van-overlay :show="show" @click="show = false">
        <div class="wrapper" @click.stop>
      <div class="block" >
          <p style="line-height: 40px;">牛耳号1234568</p>
          <van-form @submit="onSubmits" class="niuerCss">
                <van-field
                     name="sellWeight"
                    v-model="erform.sellWeight"
                    placeholder="请输入出场重"
                
                />
                <van-field
                        readonly
                        clickable
                          name="chusfs"
                        :value="value"
                        
                        placeholder="点击选择出售状态"
                        @click="showPicker = true"
                        />
                        <van-popup v-model="showPicker" position="bottom">
                        <van-picker
                            show-toolbar
                            :columns="columns"
                            @confirm="onConfirm"
                            @cancel="showPicker = false"
                        />
                </van-popup>
                <van-field
                v-if="jbmc"
                  name="illness"
                    v-model="erform.illness"
                    placeholder="请输入疾病名称"
                
                />
                <van-field
                
                  name="systemIllness"
                    v-model="erform.systemIllness"
                    placeholder="请输入系统疾病"
                
                />
                <div style="margin: 16px;display: flex;justify-content: space-between;height:20%">
                    <van-button round block type="info" class="anniu" native-type="submit">
                    提交
                    </van-button>
                     <div class="anniu"  @click="cancelEaret">
                    取消
                    </div>
                </div>
         </van-form>
        
      </div>
       </div>
       </van-overlay>
    </div>
    <div v-if="!onVif">
       <eartDetails :lists="list">  </eartDetails> 
    </div>
  </div>
  </div>
</template>

<script>
import eartDetails from './eartDetails'
import navTopS from './navTopS'

import Vue from 'vue';
import { Overlay } from 'vant';
import { Toast } from 'vant';

Vue.use(Toast);
Vue.use(Overlay);
export default {
  components:{
      eartDetails,
      navTopS
  },
  props:{},
  data(){
    return {
        navtop:true,
            typest:1,
      list:{},
      jbmc:false,
      onVif:true,
      erform:{},
      value: '',
      columns: ['正常', '非正常'],
      showPicker: false,
      show: false,
      timeC:false,
      time:new Date,
      formes:{
          tradeNo:"",
          sellTime:"",
          sellFactoryName:"",
          sellType:"",
          remark:"",
          details:[]
      },
      factorylist:[],
      muc:[],
      showPopup:false,

        

    }
  },
  watch:{},
  computed:{},
  methods:{
    guanb(){
      this.onVif=true;
      this.typest=1;
    },
     getMuc(values){
      this.formes.sellFactoryName=values
      this.showPopup=false;
   
      this.formes.sellFactoryId=this.muc.filter(item=>item.name==values)[0].id
   
    },
    //牧场选择
    onMuc(){
         this.$json({
                url: `/mhj/dispatchCowBills/getFactoryBox`,
                method: 'get'
            }).then((res) => {
              this.muc=res.resp;
              for( let i in res.resp){
                    this.factorylist.push(res.resp[i].name)
              }
                //  this.factorylist=res.resp;  
               
                  console.log(res)
            });
    },
      ssst(types){
       
        if (this.formes.sellTime==""||this.formes.sellFactoryName==""||this.formes.sellType=="") {
          Toast.fail('请确保数据的完整性');
          return
        }
          this.formes.status=types
          console.log(this.formes,'另外提交')
            this.$json({
                url: `/mhj/cowSellBills/addOrUpdateBill`,
                method: 'post',
                data:this.formes
            }).then((res) => {
                Toast.success('提交成功');
                setTimeout(()=>{
                          this.$router.push('/sellingCattle')
                },1000)
            
            });
      },
      onSubmits(valuest){
           console.log(valuest,'小表单')
            this.$json({
                url: `/mhj/cowSellBills/getCowDetail?earTradeNo=GN0WL200001`,
                method: 'get'
            }).then((res) => {
                 this.list=res.resp;
                 if (valuest.chusfs=="正常") {
                      this.list.sellStatus=0
                 }else if (valuest.chusfs=="非正常") {
                     this.list.sellStatus=1
                 }
                 this.list.chusfs=valuest.chusfs;
                 this.list.sellWeight=valuest.sellWeight;
                 this.list.systemIllness=valuest.systemIllness
                 this.list.illness=valuest.illness

                console.log(this.list)
                 this.formes.details.push(this.list)
                this.show=false
            });
      },
      //取消新增牛耳号
      cancelEaret(){
        this.show= false
      },
     //选择牛耳号健康状态
       onConfirm(value) {
      this.value = value;
      console.log(value)
     
      this.showPicker = false;
    },
    //二维码添加牛耳号
      addEarts(){
         this.show=true
      },
      //进入牛耳号详情
      eartDetails(item){

          this.list= this.formes.details.filter(ite=>ite.earTradeNo==item.earTradeNo)[0]
          this.onVif=false;
            this.typest=2;
          this.navtop=false;
          this.navtop=true;
      
          //  this.$json({
          //       url: `/mhj/cowSellBills/getCowDetail?earTradeNo=${item.tradeNo}`,
          //       method: 'get'
          //   }).then((res) => {
          //        this.list=res.resp;
               
          //        this.onVif=false;
          //        this.show=false
          //   });
      },
      //删除牛耳号
      onEart(item,index){
         console.log(item)
         this.formes.details.splice(index,1)
       
      },
      onSubmit(values){
      
      },
      //时间控件
      editTime(){
           this.timeC=true;
      },
      outTime(){
            this.timeC=false;
      },
      addTime(){
         this.timeC=false;
         this.formes.sellTime=`${this.time.getFullYear()}-${(this.time.getMonth() + 1).toString().padStart(2, "0")}-${(this.time.getDate()).toString().padStart(2, "0")} `+
     `${(this.time.getHours()).toString().padStart(2, "0")}:${(this.time.getMinutes()).toString().padStart(2, "0")}:${(this.time.getSeconds()).toString().padStart(2, "0")}`;
     console.log( this.formes.sellTime)
      },
      //查询
      onSearch(){
        this.$json({
            url: `/mhj/cowSellBills/getBillDetail?tradeNo=${this.formes.tradeNo}`,
            method: 'get',
        }).then((res) => {
            this.formes=res.resp
            console.log(this.formes)
             for(let i in this.formes.details){
               if (this.formes.details[i].sellStatus==0) {
                   this.formes.details[i].chusfs='正常'
               }else{
                    this.formes.details[i].chusfs='非正常'
               }
            }
          
        });
      }
  },
 
  created(){
      
  },

  mounted(){
      this.formes.tradeNo=this.$route.query.tradeNo;
      this.onSearch()
      this.onMuc()
  }
}
</script>
<style lang="less" scoped>
.anniu{width: 40%;background: #1989FA;color:#FFFFFF;height:100%;text-align: center;line-height: 6vh;font-size: 15px;border-radius:20px ;}
.niuerCss{
         border: 1px #F0F0F0 solid; 
         width: 90%;height: 70%;
         margin: 5% auto;
}
.eartCss{
        background: white;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        border: 1px #F0F0F0 solid; 
        width: 96%;
        line-height: 40px;
        padding: 0 2%;
}
.tijn{display: flex;justify-content: space-around;
  
    margin: 12% 0 6% 0;
}
.formes_top{
  border: 1px #F0F0F0 solid;
}
.documentInformation{
  
    margin: 0 auto;
  
    width: 96%;
    border-radius:5px ;
}
.times{height: 300px;}
.shij{width: 100%;
   
}
.wrappers{
    position: relative;
      padding-top: 5%;
       height: 83vh;
          background: white;

}
 .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
   
  }

  .block {
    width: 95%;
    height: 45%;
    background-color: #fff;
  }
</style>