<template>
<div >
  <navTopS :types="typest" v-if="navtop" class="navtops"></navTopS>
  <div class="wrappers">   
    <div v-if="onVif">   
        <div class="documentInformation">
        <van-form @submit="onSubmit">
            <div class="formes_top">
            <van-field label="单据编号" label-width="22%"	 required colon v-model="formes.tradeNo" disabled placeholder=""/>
            <van-field label="入库日期"  name="storageTime"  required :rules="[{ required: true, message: '' }]"
                       label-width="22%" @focus="editTime" colon v-model="formes.storageTime"
                       placeholder="请选择入库日期"/>
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
            <van-field label="仓库"  name="warehouseName" required  :rules="[{ required: true, message: '' }]" label-width="22%"
                       @focus="showPopup=true" colon v-model="formes.warehouseName" 
                       placeholder="请选择仓库"/>
                 <van-popup v-model="showPopup" round position="bottom">
                  <van-picker
                   
                      show-toolbar
                      :columns="factorylist"
                      @confirm="getMuc"
                      @cancel="showPopup=false"
                    
                    />
                </van-popup>
            <van-field label="部门"  name="dname" label-width="22%" @focus="showPopupBm=true" colon v-model="formes.dname" placeholder="请选择部门"/>
                <van-popup v-model="showPopupBm" round position="bottom">
                    <van-picker
                        show-toolbar
                        :columns="bumen"
                        @confirm="getBum"
                        @cancel="showPopup=false"
                    />
                </van-popup>
            <van-field label="巷道" label-width="22%"  colon v-model="formes.roadway" disabled placeholder="巷道通过仓库自动获取"/>
            <van-field label="入库类别" label-width="22%" colon name="storageType" placeholder="请选择入库类别" v-model="formes.storageType"/>
            <van-field label="备注"  name="remark" label-width="22%" colon v-model="formes.remark"/>
        </div>
            <van-row style="margin: 2% auto;width: 96%;">
                <van-col span="12"><p style="  line-height: 30px;">产品信息</p></van-col>
                <van-col span="12" style="font-size:30px ;text-align: right;"><van-icon name="scan" @click="addEarts"/></van-col>
            </van-row>
           
            <!--牛只信息-->
            <ul>
                <li v-for="(item,index) in listArr" :key="index" class="eartCss">
                    <div @click="eartDetails(item)">
                    <span>{{item.labelCode}}</span>
                    &nbsp;<span>{{item.bpCode}}</span>
                    &nbsp;<span>{{item.bpName}}</span>
                    &nbsp;<span>{{item.weight}}KG</span>
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
       <fgWarehousingDetails :lists="list" :trken="formes.tradeNo">  </fgWarehousingDetails> 
    </div>
  </div>
  
</template>

<script>
import navTopS from '../navTopS'

import { Toast } from 'vant';

Vue.use(Toast);
import fgWarehousingDetails from './fgWarehousingDetails'
import Vue from 'vue';
import { Overlay } from 'vant';

Vue.use(Overlay);
export default {
  components:{
      fgWarehousingDetails,
      navTopS
  },
  props:{},
  data(){
    return {
        bumen:[],
        zhuangxcp:"",
        navtop:true,
        typest:1,
        showPopup:false,
        showPopupBm:false,
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
        listArr:[],
        tableData1:[],
        onbMen:[],
        xdPin:0,
    }
  },
  watch:{},
  computed:{},
  methods:{
   //提交扫码表单
     onSubmits(valuest){
        if (this.tableData1.length<1) {
            Toast.fail('暂无数据');
             this.show= false;
          return
        }
           
           console.log(this.tableData1[0],'添加的数据')
           this.listArr.push(this.tableData1[0]);
           this.formes.detailListVos=this.listArr;
         
           this.show=false
        
            console.log(this.tableData1[0]);
          this.zhuangxcp=this.tableData1[0].bpCode+this.tableData1[0].bpName;
          
      },
    //详情切换
     guanb(){
      this.onVif=true;
      this.typest=1;
    },
    //仓库下拉框确认

    getMuc(values){
      this.formes.warehouseName=values
      this.showPopup=false;
      this.formes.warehouseId=this.muc.filter(item=>item.warehouseName==values)[0].warehouseId;
      this.formes.roadway=this.muc.filter(item=>item.warehouseName==values)[0].roadway;
      this.formes.gmId=this.muc.filter(item=>item.warehouseName==values)[0].gmId;
      this.xdPin=this.muc.filter(item=>item.warehouseName==values)[0].type;
       console.log(this.formes)
    },
    //仓库选择
    onMuc(){
         this.$json({
                url: `/mhj/warehouseWarrant/getWarehouseBox`,
                method: 'get'
            }).then((res) => {
              this.muc=res.resp;
              console.log(this.muc)
              for( let i in res.resp){
                    this.factorylist.push(res.resp[i].warehouseName)
              }
                //  this.factorylist=res.resp;  
               
                  console.log(this.muc,'这是仓库')
            });
    },
    //部门确认
    getBum(values){
         console.log(values)
         this.formes.did=this.onbMen.filter(item=>item.name==values)[0].id;
         this.formes.dname=values;
         console.log(this.formes.did);
         this.showPopupBm=false
    },
    //部门选择
     onBmen(){
         this.$json({
                url: `/mhj/getAllDept`,
                method: 'get'
            }).then((res) => {
              this.onbMen=res.resp;
           
              for( let i in res.resp){
                    this.bumen.push(res.resp[i].name)
              }
                //  this.factorylist=res.resp;  
               
            
            });
    },
   
    
     
      //取消新增牛耳号
      cancelEaret(){
        this.show= false
      },
    
    //二维码添加牛耳号
      addEarts(){
        //  this.$json({
        //         url: `/mhj/goodsAllocateBill/getDetailByLabel?label=${1}&billType=0`,
        //         method: 'get',
        //     }).then(res => {
              
        //         console.log(res,'二维码参数接口')
        //     })
         this.show=true
         //搜索类型 0新增整箱 / 1新增散件
           let params = `type=${this.xdPin}&selectType=1`;
            
            let labels = [];
            for(let item of this.listArr){
                labels.push(item.labelCode);
            }
            params += `&labels=${labels}${this.context != '' ? `&context=${this.context}` : ''}`;
            this.$json({
                url: `/mhj/warehouseWarrant/getSelectBoxList?${params}`,
                method: 'get',
            }).then(res => {
                this.tableData1 = res.resp;
                console.log(res,'新增牛耳号')
            })
      },
      //进入牛耳号详情
      eartDetails(item){
          this.list= item;
          this.onVif=false;
          this.typest=2;
          this.navtop=false;
          this.navtop=true;
      },
      //删除牛耳号
      onEart(item,index){
         this.listArr.splice(index,1)
         this.formes.detailList
      },
      //提交表单
      onSubmit(values){
      
      },
         ssst(types){
       
        if (this.formes.storageTime==""||this.formes.warehouseName=="") {
          Toast.fail('请确保数据的完整性');
          return
        }
          this.formes.detailList=this.listArr;
          this.formes.detailListVos=null;
          this.formes.status=types
          console.log(this.formes,'总提交')
            this.$json({
                url: `/mhj/warehouseWarrant/addOrUpdateBill`,
                method: 'post',
                data:this.formes
            }).then((res) => {
                Toast.success('提交成功');
                setTimeout(()=>{
                          this.$router.push('/fgWarehousing')
                },1000)
            
            });
      },
      //时间控件
      editTime(){
           this.timeC=true;
      },
    
      addTime(){
         this.timeC=false;
         this.formes.storageTime=`${this.time.getFullYear()}-${(this.time.getMonth() + 1).toString().padStart(2, "0")}-${(this.time.getDate()).toString().padStart(2, "0")} `+
     `${(this.time.getHours()).toString().padStart(2, "0")}:${(this.time.getMinutes()).toString().padStart(2, "0")}:${(this.time.getSeconds()).toString().padStart(2, "0")}`;
      },
      //查询
    //   onSearch(){
    //     this.$json({
    //         url: `/mhj/warehouseWarrant/getBillDetail?tradeNo=${this.formes.tradeNo}`,
    //         method: 'get',
    //     }).then((res) => {
    //         this.formes=res.resp
    //           this.formes.warehouseName= this.$route.query.warehouseName;
    //         this.formes.dname= this.$route.query.dname;
    //           this.listArr= this.formes.detailListVos;
    //           console.log(this.formes,'表单数组')
    //         //   this.zhuangxcp=this.list[0].bpCode+this.list[0].bpName;  
    //     });
    //   }
  },
 
  created(){
      
  },

  mounted(){
      this.onBmen();
    this.onMuc();
    // this.formes.tradeNo=this.$route.query.tradeNo;
  
 

    //   this.onSearch();
  }
}
</script>
<style lang="less" scoped>
.tijn{display: flex;justify-content: space-around;
  
    margin: 12% 0 6% 0;
}
.navtops{position: absolute;top: 0;}
.pasture{
  width: 100%;
  position: absolute;bottom: 0;
}
.anniu{
    width: 40%;
    background: #1989FA;color:#FFFFFF;
    height:100%;text-align: center;
    line-height: 6vh;
    font-size: 15px;
    border-radius:20px ;
  }
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
      padding-top: 20%;
    

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