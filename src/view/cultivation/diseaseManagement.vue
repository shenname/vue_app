<template>
  <div class="disease">
    	<van-row>
		  <van-col span="18" >
			<van-field label="牛耳号:" label-width='4rem' value="GN0301190001" readonly />
			<van-field label="牛舍:" label-width='4rem' value="S308" readonly />
			<van-field label="重量:" label-width='4rem' value="1680.69KG" readonly />
			<van-field label="称重时间:" label-width='4rem' value="2020-10-15 11:59:38" readonly />
			<van-field label="备注:" label-width='4rem' value="批量称重" readonly />
			</van-col>
		  <van-col span="4" style="border:none">
          
        </van-col>
		</van-row>
    <van-icon name="add-o" size="4rem" @click='iconClick'/>
  </div>
</template>
<script>
export default {
    data(){
      return{
          
      }
    },
    methods: {
      iconClick(){
				 this.$router.push('/addDisease');
			},
    },  
}
</script>
<style lang="less" scoped>
.disease .van-icon{
		position: fixed;
		bottom: 8rem;
		right: 4rem;
	}
	.disease .van-col{
		border: 1px solid #e4e4e4;
		margin-top: 0.9375rem;
		margin-left: 0.625rem;
	}
	.disease .van-cell{
		position: static;
	}
</style>