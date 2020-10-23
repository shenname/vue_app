<template>
<div>
  <navTopS :types="typest" v-if="navtop"></navTopS>
  <div class="wrappers">
 
   <div v-if="onVif">
      
        <div class="documentInformation">
            <van-form>
                <div class="formes_top">
                <van-field label="单据编号" label-width="22%"	 required colon v-model="formes.tradeNo" disabled placeholder=""/>
                <van-field label="出售日期"  name="sellTime"  required :rules="[{ required: true, message: '' }]" label-width="22%" colon v-model="formes.sellTime"/>
                
                <van-field label="出售牧场"  name="sellFactoryName" required  :rules="[{ required: true, message: '' }]" label-width="22%"  colon v-model="formes.sellFactoryName" />
                    
                <van-field label="出售方" required label-width="22%" colon v-model="formes.sellType"/>
                <van-field label="备注" required label-width="22%" colon v-model="formes.remark"/>
                </div>
                <van-row style="margin: 2% auto;width: 96%;">
                    <van-col span="12"><p style="  line-height: 30px;">牛只信息</p></van-col>
                    <van-col span="12" style="font-size:30px ;text-align: right;"><van-icon name="scan"/></van-col>
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
                    <span  ><van-icon name="close"/></span>
                    </div>
                    </li>
                </ul>
            </van-form>
      </div>
  </div>
    <div v-if="!onVif">
       <eartDetails :lists="list">  </eartDetails> 
    </div>
  </div>
  </div>
</template>

<script>
import navTopS from './navTopS'

import eartDetails from './eartDetails'
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
            onVif:true,
         formes:{
        tradeNo:"",
        sellTime:"",
        sellFactoryName:"",
        sellType:"",
        remark:"",
          details:[]
        },
    }
  },
  watch:{},
  computed:{},
  methods:{
       guanb(){
      this.onVif=true;
      this.typest=1;
    },
      //牛耳号详情
          eartDetails(item){
           this.list= this.formes.details.filter(ite=>ite.earTradeNo==item.earTradeNo)[0]
          this.onVif=false;
              this.typest=2;
          this.navtop=false;
          this.navtop=true;
       
          },
        //查询
      onSearch(){
        this.$json({
            url: `/mhj/cowSellBills/getBillDetail?tradeNo=${this.formes.tradeNo}`,
            method: 'get',
        }).then((res) => {
            this.formes=res.resp
            console.log(this.formes,'返回数据')
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
  created(){},
  mounted(){
        this.formes.tradeNo=this.$route.query.tradeNo;
      this.onSearch()
  }
}
</script>
<style lang="less" scoped>
.documentInformation{
  
    margin: 0 auto;
  
    width: 96%;
    border-radius:5px ;
}
.wrapper{width: 98%;}
.wrappers{
    position: relative;
      padding-top: 5%;
       height: 83vh;
          background: white;

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
</style>