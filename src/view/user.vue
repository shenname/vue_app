<template>
  <div class="wrapper">
      <van-row type="flex" justify="space-around" style="background:#ffffff;padding: 3% 5%;"> 
          <van-col span="18" type="flex" justify="space-around">
              <van-row gutter="5" >
                  <van-col span="8"> <van-image width="70" height="70" :src="img" /></van-col>
                  
                  <van-col span="6">  <p style="line-height: 30px;">{{names}}</p></van-col>
                  <van-col span="10"  style="line-height: 30px;"><van-icon name="replay" /></van-col>
              </van-row>
          </van-col>
          <van-col span="6" style=""><van-icon name="exchange" style="float:right;line-height: 50px;" @click="outUser"/></van-col>
      </van-row>
      <van-row style="margin-top:5%">
          <van-col span="24">
            <van-cell  is-link icon="manager-o"  size="large" to="personalInformations">
               
                <template #title>
                    <span class="custom-title">个人信息</span>
                  
                </template>
            </van-cell>
            <van-cell  is-link icon="edit"  size="large" to="passwordChange">
               
                <template #title>
                   
                    <span class="custom-title">修改当前密码</span>
                  
                </template>
            </van-cell>
            <van-cell  is-link icon="apps-o"  size="large">
               
                <template #title>
                    <span class="custom-title">当前版本</span>
                  
                </template>
            </van-cell>
          </van-col>
          <van-col span="12"></van-col>
      </van-row>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);

export default {
  components:{},
  props:{},
  data(){
    return {
        names:"",
        img:''

    }
  },
  watch:{},
  computed:{},
  methods:{
      outUser(){
        this.$json({
                 url: `/mhj//loginOut`,
                 method: "post",
        }).then(res=>{
            this.names='未登录';
            Toast({ type: 'success', message: '退出成功' });
          this.$router.push('/login')
        
          
        })
      }
  },
  created(){},
  mounted(){
      let users=JSON.parse(localStorage.getItem('userInfo')) 
      this.names=users.userName;
      this.img=users.logoUrl;
  }
}
</script>
<style lang="less" scoped>

.wrapper{
  background: #F8F8F8;
}
</style>