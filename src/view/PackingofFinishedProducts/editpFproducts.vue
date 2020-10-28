<template>
<div >
  <navTopS :types="typest" v-if="navtop" class="navtops"></navTopS>
  <div class="wrappers">
   
    <div v-if="onVif">  
         
       
        <div class="documentInformation">
        <van-form @submit="onSubmit">
            <div class="formes_top">
            <van-field label="单据编号" label-width="22%"	 required colon v-model="formes.tradeNo" disabled placeholder=""/>
            <van-field label="装箱日期"  name="packingTime"  required :rules="[{ required: true, message: '' }]" label-width="22%" @focus="editTime" colon v-model="formes.packingTime"/>
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
             <van-field label="装箱产品" label-width="22%" required colon v-model="zhuangxcp" disabled placeholder=""/>
            <van-field label="包材"  name="materialName" required  :rules="[{ required: true, message: '' }]" label-width="22%" @focus="showPopup=true" colon v-model="formes.materialName" />
                 <van-popup v-model="showPopup" round position="bottom">
                  <van-picker
                   
                      show-toolbar
                      :columns="factorylist"
                      @confirm="getMuc"
                      @cancel="showPopup=false"
                    
                    />
                </van-popup>
              <van-field label="包材重量" label-width="22%"	name="materialWeight" placeholder="" v-model="formes.materialWeight"/>
            <van-field label="总重"  name="totalWeight"  label-width="22%" colon v-model="formes.totalWeight"/>
            <van-field label="备注"  name="remark" required :rules="[{ required: true, message: '' }]" label-width="22%" colon v-model="formes.remark"/>

        
            </div>
            <van-row style="margin: 2% auto;width: 96%;">
                <van-col span="12"><p style="  line-height: 30px;">产品信息</p></van-col>
                <van-col span="12" style="font-size:30px ;text-align: right;"><van-icon name="scan" @click="addEarts"/></van-col>
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
                <span  ><van-icon name="close" @click="onEart(item,index)"/></span>
                </div>
                </li>
            </ul>
              <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                    提交
                    </van-button>
                </div>
        
        </van-form>
           
        </div>
    
        
        <van-overlay :show="show" @click="show = false">
        <div class="niuerhzt" @click.stop>
      <div class="niurblock" >
          <p style="line-height: 40px;">牛耳号1234568</p>
          <van-form @submit="onSubmits" class="niuerCss">
                <van-field
                     name="sellWeight"
                    v-model="context"
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
       </van-overlay>
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
      zhuangxcp:"",
      navtop:true,
      typest:1,
      showPopup:false,
      
        onVif:true,

    

       show: false,
        timeC:false,
        time:new Date,
        formes:{
        
        },
      factorylist:[],
        muc:[],
        context:"",
        list:{},
        tableData1:[],
    }
  },
  watch:{},
  computed:{},
  methods:{
    //详情切换
     guanb(){
      this.onVif=true;
      this.typest=1;
    },
    //包材下拉框
    getMuc(values){
      this.formes.materialName=values
      this.showPopup=false;
      this.formes.materialId=this.muc.filter(item=>item.name==values)[0].id;
    },
    //包材选择
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
   
    
      onSubmits(valuest){
        if (this.tableData1.length<1) {
            Toast.fail('暂无数据');
             this.show= false;
          return
        }
           this.list.push(this.tableData1[0]);
           console.log(this.list,'这是list')
            this.show= false;
            console.log(this.tableData1[0]);
          this.zhuangxcp=this.tableData1[0].bpCode+this.tableData1[0].bpName;
          
      },
      //取消新增牛耳号
      cancelEaret(){
        this.show= false
      },
    
    //二维码添加牛耳号
      addEarts(){
         this.show=true
          let params = `?bpId=${38}`;
            params += `${this.context != '' ? `&context=${this.context}` : ''}`;
            let lplIds = [];
            for(let item of this.formes.detailVoList){
                lplIds.push(item.lplId);
            }
            params += `&lplIds=${lplIds}${this.context != '' ? `&context=${this.context}` : ''}`;
            this.$json({
                url: `/mhj/PackingList/getChildLabelCodeSelectVo${params}`,
                method: 'get',
            }).then(res => {
                this.tableData1 = res.resp;
            })
      },
      //进入牛耳号详情
      eartDetails(item){
          this.list= this.formes.detailVoList.filter(ite=>ite.lplId==item.lplId)[0]
          this.onVif=false;
          this.typest=2;
          this.navtop=false;
          this.navtop=true;
      },
      //删除牛耳号
      onEart(item,index){
         this.formes.detailVoList.splice(index,1)
      },
      //提交表单
      onSubmit(values){
         if (this.formes.packingTime==""||this.formes.zhuangxcp==""||this.formes.materialName=="") {
          Toast.fail('请确保数据的完整性');
          return
        }
          this.formes.status=0; 
          this.formes.bpId=38;
          console.log(this.formes,'表单提交')
          let arrys=[]
          for (let i in this.formes.detailVoList) {
            arrys.push({
              lplId:this.formes.detailVoList[i].lplId
              })
            
          }
          console.log(arrys)
   
            // this.$json({
            //     url: `/mhj/PackingList/addOrUpdateBill`,
            //     method: 'post',
            //     data:this.formes
            // }).then((res) => {
            //     Toast.success('提交成功');
            //     setTimeout(()=>{
            //               this.$router.push('/pFproducts')
            //     },1000)
            
            // });
      },
      //时间控件
      editTime(){
           this.timeC=true;
      },
    
      addTime(){
         this.timeC=false;
         this.formes.packingTime=`${this.time.getFullYear()}-${(this.time.getMonth() + 1).toString().padStart(2, "0")}-${(this.time.getDate()).toString().padStart(2, "0")} `+
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
              this.list= this.formes.detailVoList;
              if (this.list[0].bpCode!==null&&this.list[0].bpName!==null) {
                  this.zhuangxcp=this.list[0].bpCode+this.list[0].bpName;
              }
            
              console.log(this.formes,'返回的表单')
          
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