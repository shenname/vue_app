<template>
  <div class="wrapper">
     <van-form v-if="cjian">
  <van-field
    v-model="trken"
    disabled
    label="装箱单号"
  />
  <van-field
    v-model="list.labelCode"
    disabled
    label="标签编码"
  />
  <van-field
    v-model="list.bpCode"
    disabled
    label="产品编码"
  />
  <van-field
    v-model="list.bpName"
    disabled
    label="产品名称"
  />
  <van-field
    v-model="list.specification"
    disabled
    label="规格型号"
  />
  <van-field
    v-model="list.level"
    disabled
    label="级别"
  />
  <van-field
    v-model="sellStatus"
    disabled
    label="鲜品/冻品"
  />
  <van-field
    v-model="list.mainUnit"
    disabled
    label="主计量单位"
  />
  <van-field
    v-model="list.weight"
    disabled
    label="重量"
  />
  <van-field
    v-model="list.skuName"
    disabled
    label="库存单位"
  />
  <van-field
    v-model="list.earTradeNo"
    disabled
    label="批号"
  />
  <van-field
    v-model="list.producedTime"
    disabled
    label="生产日期"
  />
  <van-field
    v-model="list.expirationDate"
    disabled
    label="保质期"
  />
  <van-field
    v-model="list.loseTime"
    disabled
    label="失效日期"
  />
   <van-field
    v-model="list.bftType"
    disabled
    label="产品分类"
  />
  
</van-form>
  </div>
</template>

<script>
export default {
  components:{},
  props:['lists','trken'],
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
          if (this.list.type==0) {
                  this.sellStatus="鲜品"
                  }else{
                  this.sellStatus="冻品"
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