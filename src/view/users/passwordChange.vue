<template>
  <div class="wrapper">
      <van-form @submit="onSubmit">
          <van-field v-model="value" label="原密码" name='aaa' disabled />
          <van-field v-model="valueChange" label="新密码"  name="222" placeholder="请输入新密码" required :rules="[{ pattern, message: '' }]"/>
          <van-field v-model="valueChanges" label="确认新密码" placeholder="请输再次入新密码" name="222" required :rules="[{ pattern, message: '' }]"/>
         <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
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
      onSubmit(values){
          
          if (this.valueChange!==this.valueChanges) {
              Toast.fail('两次密码不相同');
              return
          } 
        //   let params={
        //       companyId:this.users.companyName,
        //       userAccount:this.users.userAccount
        //   }
            // this.$json({
            //             url: '/mhj/addOrModifyUser',
            //             data: params
            //         }).then(res => {
            //                 Toast({ type: 'success', message: '修改成功' });
                      
            //         })
            console.log(values)
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