<template>
  <div class="wrappers">
    <div v-if="onVif">
        <div class="times" v-if="timeC">
            <van-datetime-picker
            class="shij"
                v-model="time"
                type="datehour"
                title="选择年月日小时"
                @confirm="addTime"
                @cancel="outTime"
                
            />
        </div>
        <div class="documentInformation">
        <van-form @submit="onSubmit">
            <div class="formes_top">
            <van-field label="单据编号" label-width="22%"	 required colon v-model="formes.tradeNo" disabled placeholder=""/>
            <van-field label="出售日期"  required label-width="22%" @focus="editTime" colon v-model="formes.sellTime"/>
        
            <van-field label="出售牧场" required label-width="22%" colon v-model="formes.sellFactoryName" />
            <van-field label="出售方" required label-width="22%" colon v-model="formes.sellType"/>
            <van-field label="备注" required label-width="22%" colon v-model="formes.remark"/>
            </div>
            <van-row style="margin: 2% auto;width: 96%;">
                <van-col span="12"><p style="  line-height: 30px;">牛只信息</p></van-col>
                <van-col span="12" style="font-size:30px ;text-align: right;"><van-icon name="scan" @click="addEarts"/></van-col>
            </van-row>
            <select name="" id="">
                <option value="">111111</option>
                <option value="">2222</option>
            </select>
            <!--牛只信息-->
            <ul>
                <li v-for="(item,index) in formes.details" :key="index" class="eartCss">
                    <div @click="eartDetails(item)">
                    <span>{{item.earTradeNo}}</span>
                    &nbsp;<span>{{item.health}}</span>
                    &nbsp;<span>{{item.illness}}</span>
                    &nbsp;<span>{{item.sellWeight}}KG</span>
                    </div>
                    <div style="font-size:30px;line-height: 40px;padding-top:2%">
                <span  ><van-icon name="close" @click="onEart(item,index)"/></span>
                </div>
                </li>
            </ul>
            <div style="margin: 16px;" class="tijn">
                <van-button round block type="info" native-type="submit" >
                    保存
                </van-button>
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        
        </van-form>
    
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
                          name="health"
                        :value="value"
                        
                        placeholder="点击选择健康状态"
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
</template>

<script>
import eartDetails from './eartDetails'
import Vue from 'vue';
import { Overlay } from 'vant';

Vue.use(Overlay);
export default {
  components:{
      eartDetails
  },
  props:{},
  data(){
    return {
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
        
        

    }
  },
  watch:{},
  computed:{},
  methods:{
      onSubmits(valuest){
           console.log(valuest)
            this.$json({
                url: `/mhj/cowSellBills/getCowDetail?earTradeNo=GN0WL200001`,
                method: 'get'
            }).then((res) => {
                 this.list=res.resp;
                 this.list.health=valuest.health;
                 this.list.sellWeight=valuest.sellWeight;
                 this.list.systemIllness=valuest.systemIllness
                 this.list.illness=valuest.illness

                
                 this.formes.details.push(this.list)
                 console.log(this.formes)
                
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
      if (value=="非正常") {
          this.jbmc=true;
      }
      else{
           this.jbmc=false;
      }
      this.showPicker = false;
    },
    //二维码添加牛耳号
      addEarts(){
         this.show=true
      },
      //进入牛耳号详情
      eartDetails(item){
        //   let aast= this.formes.details.filter(ite=>ite.tradeNo==item.tradeNo)[0]
        //   console.log(aast)
          this.onVif=false;
      },
      //删除牛耳号
      onEart(item,index){
         console.log(item)
         this.formes.details.splice(index,1)
      },
      onSubmit(values){
       console.log(values)
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
    //   onSearch(){
    //     this.$json({
    //         url: `/mhj/cowSellBills/getBillDetail?tradeNo=${this.formes.tradeNo}`,
    //         method: 'get',
    //     }).then((res) => {
    //         this.formes=res.resp
          
    //     });
    //   }
  },
 
  created(){
      
  },

  mounted(){
  
    //   this.onSearch();
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
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        border: 1px #F0F0F0 solid; 
        width: 96%;
        line-height: 40px;
        padding: 0 2%;
}
.tijn{display: flex;justify-content: space-around;
    
}
.formes_top{
  border: 1px #F0F0F0 solid;
}
.documentInformation{
  
    margin: 0 auto;
  
    width: 96%;
    border-radius:5px ;
}
.times{height: 55vh;width: 100%;background:rgba(0, 0, 0,0.8);position: absolute;top: 0; z-index: 2;}
.shij{width: 100%;
    position: absolute;
    bottom: 0;
    height: 50%;
}
.wrappers{
    position: relative;
      padding-top: 5%;
}
 .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 95%;
    height: 45%;
    background-color: #fff;
  }
</style>