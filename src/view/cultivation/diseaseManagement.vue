<template>
  <div class="disease">
			<van-pull-refresh v-model="refreshing"   @refresh="onRefresh">
			 <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onSearch">
            <van-empty v-if="list.length <= 0" description="暂无数据" />
    	<van-row  span="24" v-for="(item, index) of list" :key="index">
		  <van-col span="20" >
			<van-field :border="false" label="牛耳号:" label-width='4rem' :value="item.earTradeNo" readonly />
			<van-field :border="false" label="健康情况:" label-width='4rem' :value="item.recovery==0 ? '生病' : item.recovery==1 ? '治疗中' :'康复'" readonly />
			<van-field :border="false" label="发病日期:" label-width='4rem' :value="item.oncomeTime" readonly />
			<van-field :border="false" label="系统:" label-width='4rem' :value="item.organ" readonly />
			<van-field :border="false" label="症状:" label-width='4rem' :value="item.symptom" readonly />
			</van-col>
		  <van-col span="1" style="border:none" class="vanCOl">
				<van-icon name="edit" size="2rem" @click="updateList(item.earTradeNo)"/>
          <van-icon name="close" size="2rem" @click="deleteList(item.diseaseId)"/>
        </van-col>
		</van-row>
		 	</van-list>
		</van-pull-refresh>
    <div class="addList">
			<van-icon name="add-o" size="3rem" @click='iconClick'/>
		</div>
  </div>
</template>
<script>
import { Col, Row } from 'vant';
	import { Cell, CellGroup } from 'vant';
	import { Field } from 'vant';
	import { PullRefresh } from 'vant';
	import { Toast } from 'vant';
	import { List } from 'vant';
	import { Dialog } from 'vant';
export default {
    data(){
      return{
          list:[],
				loading: false,
        finished: false,
				refreshing: false,
				current: 0,
      }
    },
    methods: {
			updateList(val){
          this.$router.push({path:'/editDisease',query:{
           tradeNo:val,
      }});
			},
			onSearch() {
				this.current += 1;
            this.$json({
                url: `/mhj/getCowDiseaseLogList?size=4&current=${this.current}`,
                method: "get",
            }).then(res => {
								this.list.push.apply(this.list,res.resp);
								// this.list=res.resp;
                this.loading = false;
								this.refreshing = false;
                if (this.list.length >= res.totalCount) {
                    this.finished = true;
                }
            })
				},
				onRefresh() {
				
				setTimeout(() => {
					  this.refreshing = false;
			      this.finished = false;
            this.loading = false;
            this.onSearch();
      }, 500);
        },
      iconClick(){
				 this.$router.push('/addDisease');
			},
			deleteList(val){
         Dialog.confirm({
  title: '删除确认',
  message: '确定删除吗？？？',
})
  .then(() => {
    this.$json({
                url: `/mhj/deleteCowDiseaseLog?diseaseId=${val}`,
                method: `post`,
            }).then(res => {
							Toast({
				   message: '单据删除成功',
				   icon: 'success',
				 });
             this.onSearch();
            })
  })
  .catch(() => {
    console.log('取消本次删除')
  });
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