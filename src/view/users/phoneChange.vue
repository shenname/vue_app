<template>
  <div class="wrapper">
      <van-cell-group>
  <van-field v-model="value" label="原手机号" disabled />
   <van-field v-model="valueChange" label="新手机号" placeholder="请输入新手机号" required />
</van-cell-group>
<van-button round type="info" class="tij" @click="submit">提交</van-button>
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
    }
  },
  watch:{},
  computed:{},
  methods:{
      submit(){
          let params={
              companyId:this.users.companyName,
              userAccount:this.users.userAccount
          }
            this.$json({
                        url: '/mhj/addOrModifyUser',
                        data: params
                    }).then(res => {
                        this.$message({ type: 'success', message: '修改成功!'});
                      
                    })
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