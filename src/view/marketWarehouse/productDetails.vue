<template>
<!--  产品详情信息 -->
  <div>
    <van-cell-group  style="padding-left:1rem">
    <van-field label="产品编码" v-model="list.bpCode" readonly />
    <van-field label="产品名称" v-model="list.bpName" readonly />
    <van-field label="装箱单号" v-model="list.zxTradeNo" readonly />
    <van-field label="标签编码" v-model="list.labelCode" readonly />
    <van-field label="冻品/鲜品" v-model="list.foodType" readonly />
    <van-field label="规格型号" v-model="list.specification" readonly />
    <van-field label="级别" v-model="list.level" readonly />
    <van-field label="主计量单位" v-model="list.muName" readonly />
    <van-field label="重量" v-model="list.weight" readonly />
    <van-field label="库存单位" v-model="list.skuType" readonly />
    <van-field label="批号" v-model="list.batchNo" readonly />
    <van-field label="生产日期" v-model="list.makeTime" readonly />
    <van-field label="产品分类" v-model="list.name" readonly />
    </van-cell-group>
  </div>
</template>
<script>
import { Field } from 'vant';
export default {
  props:['list'],
   data() {
     return {
       
     }
   },
   methods: {
     
   },  
}
</script>
<style lang="less" scoped>
.van-cell{
  position: static;
}
</style>