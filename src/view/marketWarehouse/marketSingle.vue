<template>
<!--  销售出库单 -->
  <div>
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
		  <van-cell-group  @click="getInfo(item.tradeNo)" style="width:100%">
			<van-field :border="false" label="单据编号:" label-width='4rem' :value="item.tradeNo" readonly />
			<van-field :border="false" label="出库日期:" label-width='4rem' :value="item.soTime" readonly />
			<van-field :border="false" label="仓库:" label-width='4rem' :value="item.warehouseNameList" readonly />
			<van-field :border="false" label="单据状态:" label-width='4rem' :value="item.status==0 ? '未提交' : item.status==1 ? '审核中' : item.status==2 ? '已审核' :'退回'" readonly />
			</van-cell-group>
			<template #right>
                            <div style="height: 50%;">
                                <van-button square type="primary" icon="edit" text="" @click="updateList(item.tradeNo)" style="height: 100%;" />
                            </div>
                            <div style="height: 50%;">
                                <van-button square type="danger" icon="close" text="" @click="deleteList(item.tradeNo)" style="height: 100%;" />
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
    methods:{
       getInfo(val){
          this.$router.push({path:'/marketSingleInfo',query:{
           tradeNo:val,
      }});
			},
			updateList(val){
          this.$router.push({path:'/updateMarketSingle',query:{
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
                url: `/mhj/getSalesOutgoingBillsList?size=4&current=${this.current}${this.searchText != '' ? `&searchContext=${this.searchText}` : ''}`,
                method: "get",
            }).then(res => {
								// this.list.push.apply(this.list,res.resp);
								this.list=res.resp;
								this.loading = false;
								setTimeout(()=>{
									this.refreshing = false;
									this.show=false;
								},500)
                if (this.list.length >= res.totalCount) {
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
				 this.$router.push('/addMarketSingle');
			},
			deleteList(val){
         Dialog.confirm({
  title: '删除确认',
  message: '确定删除吗？？？',
})
  .then(() => {
    let params={};
    params={
        tradeNo:val,
        logicDelete:1
    }
    this.$json({
                url: `/mhj/authSalesOutgoingBills`,
                method: `post`,
                data: params 
            }).then(res => {
							Toast({
				   message: '单据删除成功',
				   icon: 'success',
         });
             this.current=0;
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