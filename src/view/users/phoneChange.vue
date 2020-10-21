<template>
  <div class="wrapper">
    <van-form @submit="onSubmit">  
      <van-field v-model="value" label="原手机号" disabled />
      <van-field v-model="valueChange" label="新手机号" placeholder="请输入新手机号"  name="mobilePhone" required :rules="[{ pattern, message: '' }]"/>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" class="tij">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        users:{},
        valueChange:"",
        value:"",
        pattern:/^1\d{10}/,
    }
  },
  watch:{},
  computed:{},
  methods:{
       onSubmit(values) {
    
      let parems={
        mobilePhone:values.mobilePhone
      }
        this.$json({
                        url: '/mhj/updateMobilePhone',
                        data: parems
                    }).then(res => {
                        this.$message({ type: 'success', message: '手机号修改成功!'});
                      
                    })
    },
  },
  created(){},
  mounted(){
        this.users=JSON.parse(localStorage.getItem('userInfo')) 
      this.value=this.users.mobilePhone;
  }
}
</script>
<style lang="less" scoped>
.wrapper{padding-top: 5%;}
.tij{position: absolute;bottom: 20%;width: 60%;left: 20%;}
</style>