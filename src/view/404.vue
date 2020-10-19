<template>
  <div class="wrapper">
    <div class="type"  v-if="!loadings">
       <img src="../assets/networkFailure.png" alt="加载失败">
      <h2> <b> 网络连接失败 </b></h2>
      <p>请检查您的网络或重新加载</p>
      <van-button type="primary" size="normal" class="buttons" @click="returnF">重新加载</van-button>
     
    </div>
    <div v-if="loadings" class="load"><van-loading size="60px" vertical>加载中...</van-loading></div>
      

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
    returnF(){
      this.loadings=true
      setTimeout(()=>{
        let aast=localStorage.getItem('routers')
        this.$router.push(aast);
        // window.history.back();
      },1000)
     
    }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="less" scoped>
.load{margin: 20%;}
.type{
 
  text-align: center;
  padding: 30% 0 0 0;

  height: 200px;
  color: #999999;
}
.type h2{
  padding: 20px 0 0 0;
}
.type p{
    padding: 10px 0 0 0;
}
.buttons{background: white;border:1px #1ABC9C solid ;border-radius:50px ;width: 60%;color: #1ABC9C ;margin: 30px 0 0 0;}
.wrapper{}
</style>