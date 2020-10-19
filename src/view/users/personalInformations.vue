<template>
  <div class="wrapper">
     <van-cell-group>
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
          <van-cell title="手机号" :value="names" is-link to="#"/>
          <van-cell title="单位名称" :value="names" />
           <van-cell title="所属部门" :value="names" />
      </van-cell-group>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
       names:"张三",
        img:'https://img.yzcdn.cn/vant/cat.jpeg'
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
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