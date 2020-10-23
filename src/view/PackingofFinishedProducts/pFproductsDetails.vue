<template>
  <div >
     <van-form v-if="cjian" class="wrapper">
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
    v-model="sellStatus"
    disabled
    label="鲜品/冻品"
  />
  <van-field
    v-model="list.mainUnit"
    disabled
    label="主机量单位"
  />
  <van-field
    v-model="list.weight"
    disabled
    label="重量"
  />
  <van-field
    v-model="list.earTradeNo"
    disabled
    label="批号"
  />
  <van-field
    v-model="list.printTime"
    disabled
    label="生产日期"
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
        sellStatus:"",
      
        list:{
       
        }
    }
  },
  watch:{},
  computed:{},
  methods:{
        onSearch(){
        this.list=this.lists
        console.log(this.lists)
         this.cjian=true
          if (this.list.type==0) {
                  this.sellStatus="冻品"
                  }else{
                  this.sellStatus="鲜品"
            }
          this.$forceUpdate()
      }
  },
  created(){},
  mounted(){
        
      
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