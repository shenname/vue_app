<template>
  <div class="wrapper">
  <van-form >
         <van-cell class="parent">
           <template #title>
             <p style="height:100%;line-height:50px ;">
              头像
             </p>
          </template>
            <!-- 使用 title 插槽来自定义标题 -->
            <template #right-icon>
              <van-image :src="img" width="70" height="70" />
            </template>
         </van-cell>
          <van-cell title="姓名" :value="names" />
          <van-cell title="手机号" :value="mobilePhone" is-link to="phoneChange"/>
          <van-cell title="单位名称" :value="companyName" />
           <van-cell title="所属部门" :value="deptName"/>
  </van-form>
  </div>
</template>

<script>

export default {
  components:{},
  props:{},
  data(){
    return {
       names:"",
        img:'',
        deptName:"",
        mobilePhone:"",
        roleName:"",
        companyName:""
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){
       let users=JSON.parse(localStorage.getItem('userInfo')) 
      this.names=users.userName;
      this.img=users.logoUrl;
      this.deptName=users.deptName;
      this.mobilePhone=users.mobilePhone;
      this.companyName=users.companyName
  }
}
</script>
<style lang="less" scoped>

.parent{
  display: flex;
  justify:center;
  align-items:center;
  display:-webkit-flex
}
.wrapper{
  
}
</style>