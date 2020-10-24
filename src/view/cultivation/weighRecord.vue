<template>
<!-- 称重管理列表 -->
	<div class="record">
		<van-pull-refresh v-model="refreshing"   @refresh="onRefresh">
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
			 <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onSearch">
            <van-empty v-if="list.length <= 0" description="暂无数据" />
		<van-row>
		  <van-col class="listDiv"  v-for="(item, index) of list" :key="index" @click="getInfo(item.earTradeNo,item.cwlId)">
			<van-field :border="false" label-width='4rem' label="牛耳号:" :value="item.earTradeNo" readonly />
			<van-field :border="false" label-width='4rem' label="牛舍:" :value="item.cowHouse" readonly />
			<van-field :border="false" label-width='4rem' label="重量:" :value="item.weight" readonly />
			<van-field :border="false" label-width='4rem' label="称重时间:" :value="item.weighTime" readonly />
			<van-field :border="false" label-width='4rem' label="备注:" :value="item.remark" readonly />
			</van-col>
		 
		</van-row>
		</van-list>
		</van-pull-refresh>
<van-overlay :show="show" z-index="100">
 <div   class="jiazai">
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
	import { Overlay } from 'vant';
	import { Loading } from 'vant';
	export default {
	  // 数据
	  data() {
	    return {
				list:[],
				loading: false,
        finished: false,
				refreshing: false,
				current: 0,
				searchText:'',
				show:false,
	    };
	  },
	  methods: {
			getInfo(val,id){
         this.$router.push({path:'/weightInfo',query:{
					 tradeNo:val,
					 cwlId:id
      }});
			},
			search(){
					 this.show=true;
					 this.onRefresh();
			},
	    iconClick(){
				 this.$router.push('/cattleWeighing');
			},
			onSearch() {
				// this.current += 1;
            this.$json({
                url: `/mhj/getCowWeighLogList?${this.searchText != '' ? `&earTradeNo=${this.searchText}` : ''}`,
                method: "get",
            }).then(res => {
								// this.list.push.apply(this.list,res.resp);
								this.list=res.resp;
									this.loading = false;
										this.refreshing = false;
                setTimeout(()=>{
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
					  this.refreshing = false;
			      this.finished = false;
            this.loading = false;
            this.onSearch();
      }, 500);
        },
	  },
	  mounted(){
	 
	  }
	}
</script>
<style>
</style>
<style scoped="scoped">
	.addList .van-icon{
		position: fixed;
		bottom: 6rem;
		right: 2rem;
	}
	.listDiv{
    width: 94vw;
    margin: 6px 3vw;
    border: 1px solid rgba(228, 228, 228, 1);
    border-radius: 5px;
}
	.jiazai{
		display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
	}
</style>
