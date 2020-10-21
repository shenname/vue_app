<template>
  <div class="disease">
    	<van-row>
		  <van-col span="20" >
			<van-field :border="false" label="牛耳号:" label-width='4rem' value="210100170565" readonly />
			<van-field :border="false" label="健康情况:" label-width='4rem' value="生病" readonly />
			<van-field :border="false" label="发病日期:" label-width='4rem' value="2020-10-08" readonly />
			<van-field :border="false" label="系统:" label-width='4rem' value="呼吸系统" readonly />
			<van-field :border="false" label="症状:" label-width='4rem' value="肺炎" readonly />
			</van-col>
		  <van-col span="1" style="border:none" class="vanCOl">
				<van-icon name="edit" size="2rem" />
          <van-icon name="close" size="2rem" @click="deleteList"/>
        </van-col>
		</van-row>
		
    <div class="addList">
			<van-icon name="add-o" size="3rem" @click='iconClick'/>
		</div>
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
			deleteList(){
         
			},
    },  
}
</script>
<style lang="less" scoped>
.addList .van-icon{
		position: fixed;
		bottom: 6rem;
		right: 2rem;
	}
	.disease .van-col{
		border: 1px solid #e4e4e4;
		margin-top: 0.9375rem;
		margin-left: 0.625rem;
	}
	.disease .van-row{
		display: flex;
    align-items: stretch;
	}
	.vanCOl{
		 display: flex;
		 flex-wrap: wrap;
		 align-content: space-around;
	}
</style>