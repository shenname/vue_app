<template>
<!--  病情管理列表 -->
  <div class="disease">
		
					<van-row>
         <van-search
    v-model="searchText"
    show-action
    placeholder="请输入搜索关键词"
    @search="search"
  >
 <template slot= 'action'>
    <div @click="onSearch" style="font-size:25px;"><van-icon name="scan" style="padding-top:20%;"/>	</div>
  </template>
</van-search>
				</van-row>
					<van-pull-refresh v-model="refreshing"   @refresh="onRefresh">
			 <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onSearch">
            <van-empty v-if="list.length <= 0" description="暂无数据" />
						
    	<van-row  span="24" class="listDiv" v-for="(item, index) of list" :key="index" >
				<van-swipe-cell>
		  <van-cell-group  @click="getInfo(item.earTradeNo)" style="width:100%">
			<van-field :border="false" label="牛耳号:" label-width='4rem' :value="item.earTradeNo" readonly />
			<van-field :border="false" label="健康情况:" label-width='4rem' :value="item.recovery==0 ? '生病' : item.recovery==1 ? '治疗中' :'康复'" readonly />
			<van-field :border="false" label="发病日期:" label-width='4rem' :value="item.oncomeTime" readonly />
			<van-field :border="false" label="系统:" label-width='4rem' :value="item.organ" readonly />
			<van-field :border="false" label="症状:" label-width='4rem' :value="item.symptom" readonly />
			</van-cell-group>
			<template #right>
                            <div style="height: 50%;">
                                <van-button square type="primary" icon="edit" text="" @click="updateList(item.earTradeNo)" style="height: 100%;" />
                            </div>
                            <div style="height: 50%;">
                                <van-button square type="danger" icon="close" text="" @click="deleteList(item.diseaseId)" style="height: 100%;" />
                            </div>
                        </template>
														</van-swipe-cell>
		</van-row>

		 	</van-list>
		</van-pull-refresh>
		<van-overlay :show="show"  z-index="100">
 <div class="jiazai" >
	 <van-loading type="circular" />
 </div>
 </van-overlay>
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
	import { SwipeCell } from 'vant';
export default {
    data(){
      return{
          list:[],
				loading: false,
        finished: false,
				refreshing: false,
				current: 0,
				searchText:'',
				show:false,
      }
    },
    methods: {
			getInfo(val){
          this.$router.push({path:'/diseaseInfo',query:{
           tradeNo:val,
      }});
			},
			updateList(val){
          this.$router.push({path:'/editDisease',query:{
           tradeNo:val,
      }});
			},
			search(value){
					 this.show=true;
					 this.onRefresh();
			},
			onSearch() {
				this.current += 1;
            this.$json({
                url: `/mhj/getCowDiseaseLogList?size=4&current=${this.current}${this.searchText != '' ? `&searchContext=${this.searchText}` : ''}`,
                method: "get",
            }).then(res => {
							let shuzu=[];
						   for(let i in res.resp){
                    if (res.resp[i].recovery==0) {
											 shuzu.push(res.resp[i])
										}
							 }
								this.list.push.apply(this.list,shuzu);
								// this.list=res.resp;
								this.loading = false;
								setTimeout(()=>{
									this.refreshing = false;
									this.show=false;
								},500)
                if (this.list.length >= shuzu.length) {
                    this.finished = true;
                }
            })
				},
				onRefresh() {
				   this.current = 0;
            this.list = [];
				setTimeout(() => {
			      this.finished = false;
            this.loading = false;
            // this.onSearch();
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
	.listDiv{
    width: 94vw;
    margin: 10px 3vw;
    border: 1px solid rgba(228, 228, 228, 1);
    border-radius: 5px;
}
.listDiv .van-cell{
    padding: 5px 16px !important;
    border: none !important;
}
	.jiazai{
		display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
	}
</style>