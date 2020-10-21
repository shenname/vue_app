<template>
 <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
  <div class="wrapper">
     
       <van-skeleton title avatar :row="3" v-if="ssta==true?false:true" style="background:#ffffff;height:100%" animate avatar-size="50"/>
       <div class="aast" v-if="ssta">
      <van-row type="flex" justify="space-around" style="background:#ffffff;padding: 3% 5%;"> 
          <van-col span="18" type="flex" justify="space-around">
              <van-row gutter="20" >
                  <van-col span="8"> <van-image width="70" height="70" :src="img" /></van-col>
                  
                  <van-col span="6">  <p style="line-height: 30px;">{{names}}</p></van-col>
                
              </van-row>
          </van-col>
          <van-col span="6" style=""><van-icon name="exchange" style="float:right;line-height: 50px;font-size: 150%;" @click="outUser"/></van-col>
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
      
  </div>
   </van-pull-refresh>
</template>

<script>
import Vue from 'vue';
import { PullRefresh } from 'vant';

Vue.use(PullRefresh);
import { Dialog } from 'vant';

import { Toast } from 'vant';

Vue.use(Toast);

export default {
  components:{},
  props:{},
  data(){
    return {
        ssta:true,
       count: 0,
      isLoading: false,
        names:"",
        img:''

    }
  },
  watch:{},
  computed:{},
  methods:{
       onRefresh() {
           this.ssta=false
      setTimeout(() => {
        this.ssta=true;
        Toast('刷新成功');
        this.isLoading = false;
        
      }, 1000);
    },
      outUser(){
       Dialog.confirm({
        title: '退出登录提示',
        message: '您确定要退出登录',
        })
        .then(() => {
            this.$json({
                        url: `/mhj//loginOut`,
                        method: "post",
                }).then(res=>{
                    this.names='未登录';
                    Toast({ type: 'success', message: '退出成功' });
                this.$router.push('/login')
                
                
                })
        })
        .catch(() => {
            // on cancel
        });
       
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
  
  height: 100vh;
  background: #F8F8F8;
}
</style>