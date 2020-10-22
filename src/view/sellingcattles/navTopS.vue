<template>
  <div class="wrapper">
   
	  	<van-nav-bar
		  v-if="$route.meta.title != '首页'"
		  :title="$route.meta.title"
		  left-text="返回"
		  right-text=""
		  left-arrow
		  @click-left="onClickLeft"
		  />
		<p class="header" v-else>{{$route.meta.title}}</p>
	  
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';

Vue.use(NavBar);
export default {
  components:{},
  props:{
    types:Number
  },
  data(){
    return {
       
    }
  },
  watch:{},
  computed:{},
  methods:{
     onClickLeft(){
          console.log(this.types)
            if(this.types==1){
               this.$router.go(-1)
            }else if (this.types==2) {
          this.$parent.guanb();
            }
        }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="less" scoped>
.header{
		height: 45px;
		line-height: 45px;
		color: #323233;
		font-weight: 500;
		font-size: 16px;
		text-align: center;
		background-color: #fff;
		-webkit-user-select: none;
		user-select: none;
		border-bottom: 1px solid #ebedf0;
	}
.wrapper{
  width: 100%;
 
 
}
 .van-nav-bar{width: 100%;}
</style>