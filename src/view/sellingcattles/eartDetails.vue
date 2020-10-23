<template>
  <div class="wrapper">
     <van-form v-if="cjian">
  <van-field
    v-model="list.earTradeNo"
    disabled
    label="牛耳号"
  />
  <van-field
    v-model="list.cowHouse"
    disabled
    label="牛舍名"
  />
  <van-field
    v-model="list.sex"
    disabled
    label="性别"
  />
  <van-field
    v-model="list.birthTime"
    disabled
    label="出生日期"
  />
  <van-field
    v-model="list.birthWeight"
    disabled
    label="出生重"
  />
  <van-field
    v-model="list.callInTime"
    disabled
    label="入场日期"
  />
  <van-field
    v-model="list.callInWeight"
    disabled
    label="入场重"
  />
  <van-field
    v-model="list.sellWeight"
    disabled
    label="出场重"
  />
  <van-field
    v-model="list.feedingDays"
    disabled
    label="饲养天数"
  />
  <van-field
    v-model="list.dailyGainWeight"
    disabled
    label="日增重"
  />
  <van-field
    v-model="list.sellAge"
    disabled
    label="出售月龄"
  />
  <van-field
    v-model="sellStatus"
    disabled
    label="出售状态"
  />
  <van-field
    v-model="list.illness"
    disabled
    label="疾病名称"
  />
  <van-field
    v-model="list.systemIllness"
    disabled
    label="系统疾病"
  />
  
</van-form>
  </div>
</template>

<script>
export default {
  components:{},
  props:['lists'],
  data(){
    return {
        cjian:false,
        tradeNo:"",
        sellStatus:"",
        formes:{},
        list:{
       
        }
    }
  },
  watch:{},
  computed:{},
  methods:{
        onSearch(){
          console.log(this.lists,'牛耳号明细')
         this.list=this.lists;
         this.cjian=true
          if (this.list.sellStatus==0) {
                  this.sellStatus="正常出售"
                  }else{
                  this.sellStatus="非正常出售"
            }
          this.$forceUpdate()
      }
  },
  created(){},
  mounted(){
          this.tradeNo=this.$route.query.tradeNo;
      
      this.onSearch()
  }
}
</script>
<style lang="less" scoped>
.wrapper{        border: 1px #F0F0F0 solid; 
width: 95%;
margin: 0 auto;
border-radius:10px ;
}
</style>