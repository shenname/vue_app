<template>
  <div class="wrapper">
    <div class="nav">
      <img src="../assets/img/u5.png" alt="" width="90%" style="display: block;margin: 0 auto;">
    </div>
    <h1>产品追溯码查询系统</h1>
    <div class="bodyDiv">
      <div style="border-bottom: 1px dashed #000;overflow: inherit;">
        <p class="navs">养殖场信息</p>
        <ul style="padding: 0 15px;margin-bottom:10px;">
          <li>养殖场名称：<span style="">123</span></li>
          <li>养殖场负责人：<span>123</span></li>
          <li>养殖场地址：<span>123</span></li>
          <li>所属公司：<span>123</span></li>
        </ul>
      </div>
      <div style="border-bottom: 1px dashed #000;overflow: inherit;">
        <p class="navs">活牛信息</p>
        <ul style="padding: 0 15px;margin-bottom:10px;">
          <li>牛耳号：<span style="">123</span></li>
          <li>群别：<span style="">123</span></li>
          <li>品种：<span style="">123</span></li>
          <li>出生日期：<span style="">123</span></li>
          <li>出生地：<span style="">123</span></li>
          <li>出生重：<span style="">123</span></li>
          <li>胎次：<span style="">123</span></li>
          <li>饲料：<span style="">123</span></li>
          <li>屠宰日期：<span style="">123</span></li>
          <li>屠宰毛重：<span style="">123</span></li>
          <li>酮体净重：<span style="">123</span></li>
        </ul>
      </div>
      <div style="overflow: inherit;">
        <p class="navs">产品信息</p>
        <ul style="padding: 0 15px;margin-bottom:10px;">
          <li>产品名称：<span style="">123</span></li>
          <li>生产日期：<span style="">123</span></li>
          <li>生产标准：<span style="">123</span></li>
          <li>生产商：<span style="">123</span></li>
          <li>厂址：<span style="">123</span></li>
          <li>官方检查员：<span style="">123</span></li>
          <li>检测日期：<span style="">123</span></li>
          <li>出厂检验项目：<span style="">123</span></li>
          <li>挥发性盐基氮：<span style="">123</span></li>
          <li>水分：<span style="">123</span></li>
          <li>感官：<span style="">123</span></li>
          <li>盐酸克伦特罗(瘦肉精)：<span style="">123</span></li>
          <li>莱克多巴胺(瘦肉精)：<span style="">123</span></li>
          <li>沙丁胺醇(瘦肉精)：<span style="">123</span></li>
          <li>氯丙那林(瘦肉精)：<span style="">123</span></li>
        </ul>
      </div>
    </div>
    <h1 style="margin-top:15px;">辽宁牧合家牛业科技有限公司</h1>
    <h1>400-090-0709</h1>
  </div>
</template>

<script>
export default {

  components:{},
  props:{},
  data(){
    return {
      loadings:false
    }
  },
  watch:{},
  computed:{},
  methods:{
    getRetrospect(){
      let params = this.$route.query;
      console.log(params)
      this.$json({
        url: `/mhj/getRetrospect?earTradeNo=${params.earTradeNo}&bpId=${params.bpId}`,
        method: "get",
      }).then(res => {
        console.log(res)
      })
    },
  },
  created(){},
  mounted(){
    this.getRetrospect();
  }
}
</script>
<style lang="less" scoped>
.wrapper{
  background-color: rgba(44, 168, 220, 1);
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
}
.nav{
  width: 50vw;
  height: 100px;
  background-color: #fff;
  border-radius: 50%;
  margin: 3vh auto;
  overflow: hidden;
  border: 5px solid;
  border-color: rgba(171, 222, 246, 1);
  padding: 15px 5%;
}
h1{
  color: #fff;
  font-size: 20px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 3vh;
}
.bodyDiv{
  width: calc(100vw - 20px) !important;
  background: #fff;
  margin: 0 10px;
  border-radius: 3vw;
  overflow: hidden;
}
.navs{
  border-width: 0px;
  width: 195px;
  height: 30px;
  display: flex;
  font-size: 16px;
  color: #FFFFFF;
  border: 3px solid;
  background-color: rgba(44, 168, 220, 1);
  border-color: rgba(171, 222, 246, 1);
  text-align: center;
  border-radius: 10px;
  margin: 15px auto;
  display: block;
  line-height: 30px;
}
li{
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #2CA8DC;
  >span{
    color: #999;
  }
}
</style>