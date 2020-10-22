<template>
	<div class="record">
		<van-pull-refresh v-model="refreshing"   @refresh="onRefresh">
			 <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onSearch">
            <van-empty v-if="list.length <= 0" description="暂无数据" />
		<van-row>
		  <van-col  span="24" v-for="(item, index) of list" :key="index">
			<van-field :border="false" label-width='4rem' label="牛耳号:" :value="item.earTradeNo" readonly />
			<van-field :border="false" label-width='4rem' label="牛舍:" :value="item.cowHouse" readonly />
			<van-field :border="false" label-width='4rem' label="重量:" :value="item.weight" readonly />
			<van-field :border="false" label-width='4rem' label="称重时间:" :value="item.weighTime" readonly />
			<van-field :border="false" label-width='4rem' label="备注:" :value="item.remark" readonly />
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
	export default {
	  // 数据
	  data() {
	    return {
				list:[],
				loading: false,
        finished: false,
        refreshing: false,
        current: 0,
	    };
	  },
	  methods: {
	    iconClick(){
				 this.$router.push('/cattleWeighing');
			},
			onSearch() {
            this.current += 1;
            this.$json({
                url: `/mhj/getCowWeighLogList?size=4&current=${this.current}`,
                method: "get",
            }).then(res => {
                this.list.push.apply(this.list,res.resp);
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
	.record .van-col{
		border: 1px solid #e4e4e4;
		margin-top: 0.9375rem;
		margin-left: 0.625rem;
	}
</style>
