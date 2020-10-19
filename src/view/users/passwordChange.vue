<template>
  <div class="wrapper">
      <van-form @submit="onSubmit">
 
  <van-field v-model="value" label="原密码" disabled />
   <van-field v-model="valueChange" label="新密码"  name="pattern" placeholder="请输入新密码" required :rules="[{ pattern, message: '' }]"/>
     <van-field v-model="valueChanges" label="确认新密码" placeholder="请输再次入新密码" name="pattern" required :rules="[{ pattern, message: '' }]"/>
<van-button round type="info" class="tij" @click="submit">提交</van-button></van-form>
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
        users:{},
        valueChange:"",
          valueChanges:"",
          pattern:/\w{8,16}/,
        value:"",
    }
  },
  watch:{},
  computed:{},
  methods:{
      submit(){
          
        //   if (this.valueChange!==this.valueChanges) {
        //       Toast.fail('两次密码不相同');
        //       return
        //   } 
        //   let params={
        //       companyId:this.users.companyName,
        //       userAccount:this.users.userAccount
        //   }
            // this.$json({
            //             url: '/mhj/addOrModifyUser',
            //             data: params
            //         }).then(res => {
            //             this.$message({ type: 'success', message: '修改成功!'});
                      
            //         })
            console.log('1111111111')
      }
  },
  created(){},
  mounted(){
        this.users=JSON.parse(localStorage.getItem('userInfo')) 
      this.value=this.users.mobilePhone;
  }
}
</script>
<style lang="less" scoped>
.wrapper{}
.tij{position: absolute;bottom: 20%;width: 60%;left: 20%;}
</style>