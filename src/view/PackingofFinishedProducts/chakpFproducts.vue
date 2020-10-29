<template>
<div >
  <navTopS :types="typest" v-if="navtop" class="navtops"></navTopS>
  <div class="wrappers">
   
    <div v-if="onVif">  
         
       
        <div class="documentInformation">
        <van-form @submit="onSubmit">
            <div class="formes_top">
            <van-field label="单据编号" label-width="22%"	 required colon v-model="formes.tradeNo" disabled placeholder=""/>
            <van-field label="装箱日期" disabled name="packingTime"  required :rules="[{ required: true, message: '' }]" label-width="22%" @focus="editTime" colon v-model="formes.packingTime"/>
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
             <van-field label="装箱产品"  label-width="22%" required colon v-model="formes.tradeNo" disabled placeholder=""/>
            <van-field label="包材" disabled name="materialName" required  :rules="[{ required: true, message: '' }]" label-width="22%" @focus="showPopup=true" colon v-model="formes.materialName" />
                 <van-popup v-model="showPopup" round position="bottom">
                  <van-picker
                   
                      show-toolbar
                      :columns="factorylist"
                      @confirm="getMuc"
                      @cancel="showPopup=false"
                    
                    />
                </van-popup>
             <van-field label="包材重量" disabled label-width="22%"	name="materialWeight" required colon v-model="formes.materialWeight"  placeholder=""/>
            <van-field label="总重"  disabled name="totalWeight" required :rules="[{ required: true, message: '' }]" label-width="22%" colon v-model="formes.totalWeight"/>
            <van-field label="备注" disabled name="remark" required :rules="[{ required: true, message: '' }]" label-width="22%" colon v-model="formes.remark"/>

        
            </div>
            <van-row style="margin: 2% auto;width: 96%;">
                <van-col span="12"><p style="  line-height: 30px;">产品信息</p></van-col>
                <van-col span="12" style="font-size:30px ;text-align: right;"><van-icon name="scan"/></van-col>
            </van-row>
           
            <!--牛只信息-->
            <ul>
                <li v-for="(item,index) in formes.detailVoList" :key="index" class="eartCss">
                    <div @click="eartDetails(item)">
                    <span>{{item.labelCode}}</span><br>
                    &nbsp;<span>{{item.bpCode}}</span>
                    &nbsp;<span>{{item.bpName}}</span>
                    &nbsp;<span>{{item.weight}}KG</span>
                    </div>
                    <div style="font-size:30px;line-height: 40px;padding-top:2%">
                <span  ><van-icon name="close" /></span>
                </div>
                </li>
            </ul>
              <!-- <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                    提交
                    </van-button>
                </div> -->
        
        </van-form>
           
        </div>
    
        
        <!-- <van-overlay :show="show" @click="show = false">
        <div class="niuerhzt" @click.stop>
      <div class="niurblock" >
          <p style="line-height: 40px;">牛耳号1234568</p>
          <van-form @submit="onSubmits" class="niuerCss">
                <van-field
                     name="sellWeight"
                    v-model="erform.sellWeight"
                    placeholder="请输入出场重"
                
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
       </van-overlay> -->
    </div>
    
    <div v-if="!onVif">
       <pFproductsDetails :lists="list">  </pFproductsDetails> 
    </div>
  </div>
  </div>
</template>

<script>
import navTopS from '../navTopS'

import { Toast } from 'vant';

Vue.use(Toast);
import pFproductsDetails from './pFproductsDetails'
import Vue from 'vue';
import { Overlay } from 'vant';

Vue.use(Overlay);
export default {
  components:{
      pFproductsDetails,
      navTopS
  },
  props:{},
  data(){
    return {
      navtop:true,
      typest:1,
      showPopup:false,
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
        
        },
      factorylist:[],
        muc:[],
        context:"",
        list:{}
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
      this.formes.materialName=values
      this.showPopup=false;
      this.formes.materialId=this.muc.filter(item=>item.name==values)[0].id;
    },
    //牧场选择
    onMuc(){
         this.$json({
                url: `/mhj/getPackingMaterialsBox`,
                method: 'get'
            }).then((res) => {
              this.muc=res.resp;
              console.log(this.muc)
              for( let i in res.resp){
                    this.factorylist.push(res.resp[i].name)
              }
                //  this.factorylist=res.resp;  
               
                  console.log(this.factorylist)
            });
    },
   
     //提交表单
      ssst(types){
        if (this.formes.sellTime==""||this.formes.sellFactoryName==""||this.formes.sellType=="") {
          Toast.fail('请确保数据的完整性');
          return
        }
          this.formes.status=Number(types) 
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
   
   
      eartDetails(item){
          this.list= this.formes.detailVoList.filter(ite=>ite.lplId==item.lplId)[0]
          this.onVif=false;
          this.typest=2;
          this.navtop=false;
          this.navtop=true;
      },
  
      onSubmit(values){
      },
      //时间控件
      editTime(){
           this.timeC=true;
      },
    
      addTime(){
         this.timeC=false;
         this.formes.sellTime=`${this.time.getFullYear()}-${(this.time.getMonth() + 1).toString().padStart(2, "0")}-${(this.time.getDate()).toString().padStart(2, "0")} `+
     `${(this.time.getHours()).toString().padStart(2, "0")}:${(this.time.getMinutes()).toString().padStart(2, "0")}:${(this.time.getSeconds()).toString().padStart(2, "0")}`;
      },
      //查询
      onSearch(){
        this.$json({
            url: `/mhj/PackingList/getBillListDetail?tradeNo=${this.formes.tradeNo}`,
            method: 'get',
        }).then((res) => {
            this.formes=res.resp
              this.formes.materialName= this.$route.query.materialName;
              this.list= this.formes.detailVoList
          
        });
      }
  },
 
  created(){
      
  },

  mounted(){
    this.onMuc();
    this.formes.tradeNo=this.$route.query.tradeNo;
  
 

      this.onSearch();
  }
}
</script>
<style lang="less" scoped>
.navtops{position: absolute;top: 0;}

.pasture{
  width: 100%;
  position: absolute;bottom: 0;
}
.anniu{width: 40%;background: #1989FA;color:#FFFFFF;height:100%;text-align: center;line-height: 6vh;font-size: 15px;border-radius:20px ;}
.niuerCss{
         border: 1px #F0F0F0 solid; 
         width: 90%;height: 70%;
         margin: 5% auto;
}
.eartCss{
    font-size: 12px;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        border: 1px #F0F0F0 solid; 
        width: 96%;
        line-height: 40px;
        padding: 0 2%;
        background: white;
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
 padding-top: 16%;     

}
 .niuerhzt {
 display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
   
  }

  .niurblock {
    width: 90%;
    padding: 2%;
    background-color: #fff;
  }
</style>