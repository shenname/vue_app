<template>
 <!--出售牛只-->
  <div class="wrappers">
   
    <div class="addCattle"><van-icon name="add-o" @click="onAddCattle(1)"/></div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onsarch"
>
 <div class="topsearch">
      <van-search
        v-model="aasts"
        show-action
        placeholder="请输入搜索关键词"
        @search="aastst"
      >
          <template slot= 'action'>
            <div @click="aastst" style="font-size:25px;"><van-icon name="scan" style="padding-top:20%;"/></div>
          </template>
      </van-search>

      <van-overlay :show="zhezhaoc" @click="zhezhaoc = false">
        <div class="zhez" @click.stop>
          <div class="block" >
              <van-loading class="zhez"/>
        </div>
      
        </div>
      </van-overlay>
    </div>
    <div style="padding-top:20%">
        <van-swipe-cell right-width	="50"	v-for="(item,index) in list" :key="index">
          <div  @click="formesDetails(item)">
            
            <van-form class="forms">
          <van-field

            colon 
            disabled
            label-width="22%"
            v-model="item.tradeNo"
            name="2"
            label="单据编号"
          />
          <van-field
            colon
            disabled
          label-width="22%"
            v-model="item.sellTime"
            name="1"
            label="出售日期" 
          />
          <van-field
            colon
            disabled
          label-width="22%"
            v-model="item.sellFactoryName"
            name="1"
            label="出售场名" 
          />
          <van-field
            colon
            disabled
          label-width="20%"
            v-model="item.sellType"
            name="1"
            label="出售方" 
          />
          <van-field
          label-width="22%"
            colon
            disabled
            :value="item.status==0?'未提交':item.status==1?'审核中':item.status==2?'已审核':'已退回'"
            name="1"
            label="单据状态" 
          />
          
        </van-form>
        </div>
        <template slot="right" v-solt="{index,item}">
            <van-row class="bianj">
              <van-col span="24" class="xuanZ">
                <van-icon name="edit" @click="onAddCattle(2,item)" />
                <!-- <p class="xigTitile">修改</p> -->
              </van-col>
              <van-col span="24" class="xuanZ">
                <van-icon name="close" @click="operation(index,item,2)"/>
                <!-- <p class="xigTitile">删除</p> -->
              </van-col>
            </van-row>
          </template>
        </van-swipe-cell>
    </div>
</van-list>
  </van-pull-refresh>
  </div>
</template>

<script>
import { Overlay } from 'vant';

Vue.use(Overlay);
import { SwipeCell } from 'vant';

Vue.use(SwipeCell);
import { Dialog } from 'vant';
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
  components:{},
  props:{},
  data(){
    return {
      zhezhaoc:false,
      aasts:"",
        page: {
                size: 4,
                current: 0,
                total: 0
            },
      reluform:{
         username:"",
        password:"",
      },
      
         list: [],
           refreshing: false,
      loading: false,
      totalCount: 0,
      finished: false,
    }
  },
  watch:{},
  computed:{},
  methods:{
    aastst(){
      this.zhezhaoc=true;
      console.log(11111111111111111111111111111111)
    },
    //牛只详情
    formesDetails(item){
         this.$router.push({path:'/sellingDDetails',query:{
           tradeNo:item.tradeNo,
      }});
     
    },
    //新增牛只
    onAddCattle(type,item){
     
      if (type==1) {
         this.$router.push('/sellingCattleAdd')
      } else  if(type==2) {
           if (item.status!==0) {
        Toast.fail("该数据已不能编辑")
        return
      }
         this.$router.push({path:'/sellingCattleEdit',query:{
           tradeNo:item.tradeNo,
      }});
      }
     
    },
    //加载牛只
    onsarch(type){
        this.page.current += 1;
        this.loading = false;
        let params =
                `current=${this.page.current}&size=${this.page.size}` 
            this.$json({
                url: `/mhj/cowSellBills/getBillList?${params}`,
                method: 'get'
            }).then((res) => {
               setTimeout(() => {
                 if (type==1) {
                      Toast('已刷新');
                 }
             
              this.refreshing=false
              },500);
              for(let item of res.resp.records){
                this.list.push(item);
              }
                this.totalCount=res.resp.total;
                if(this.list.length >= res.resp.total){
                  this.finished = true;
                }
            });
    },
    //删除牛只
    operation(aast,ssta){
    
        if (this.list[aast].status==2||this.list[aast].status==3) {
          Toast.fail('此数据已经审核不能删除');
          return;
        }
        Dialog.confirm({
          title: '确认删除此数据',
          message: '此数据已经删除无法找回是否删除？',
        })
          .then(() => {
           
                this.$json({
                    url: `/mhj/cowSellBills/delBill?tradeNo=${this.list[aast].tradeNo}`,
                    method: 'delete',
                }).then((res) => {
                  
                    Toast.success('已成功删除');
                  this.onRefresh()
                });
             
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
       
      
     
     
    },
      onSubmit(values){
      },
    
    //下拉加载
    onRefresh() {
  
      // 清空列表数据
       this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onsarch(1);
    
    },
  
  },
  created(){},
  mounted(){
    // this.onsarch()
  }
}
</script>
<style lang="less" >
.topsearch{
  position: fixed;
  top: 20;
  z-index: 5;
  width: 100%;
}
  .block {
    width: 120px;
    height: 120px;
 
  }
.addCattle{
  font-size: 35px;
  position: absolute;
  z-index: 3;bottom: 8%;right: 4%;
  border-radius:10px ;
  // background: rgba(150, 150, 150, 0.3);
}
.xigTitile{
  font-size: 15px;
}
.xuanZ{
  padding: 30%;
}
.bianj{
  font-size: 25px;
  display: flex;
  
  justify-content: space-around;
   flex-direction:column;
}
.forms .van-field--disabled .van-field__label {
    color: #646566;
}
.forms{ 
 
    width: 96%;
    margin: 3% auto;
   
    font-size: 15px;
    border: 1px #DEE1E6 solid;
    border-radius:5px;
    
    .van-cell{
        padding: 5px 8px;
        
    }
}
.wrappers{
  background: #F8F8F8;
}
 .zhez {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>