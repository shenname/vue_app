<template>
    <div class="homeBox">
			<van-collapse v-model="activeNames">
			  <van-collapse-item title="养殖" name="1">
					<van-row>
					  <router-link to='/weighRecord'><van-col span="8"><van-icon name="todo-list" />称重记录</van-col></router-link>
						<router-link to='/transfer'><van-col span="8"><van-icon name="balance-list"/>转舍记录</van-col></router-link>
						<router-link to='sellingCattle'><van-col span="8"><van-icon name="shop-collect" />出售牛只</van-col></router-link>
						<router-link to=''><van-col span="8"><van-icon name="gift-card" />新增病情</van-col></router-link>
						<router-link to=''><van-col span="8"><van-icon name="invition" />治疗用药</van-col></router-link>
						<router-link to='/earMarkers'><van-col span="8"><van-icon name="graphic" />电子耳标管理</van-col></router-link>
					</van-row>
				</van-collapse-item>
			  <van-collapse-item title="屠宰" name="2" style="margin-top: 1rem;">
					<van-row>
						<router-link to=''><van-col span="8">产成品装箱</van-col></router-link>
						<router-link to=''><van-col span="8">产成品入库</van-col></router-link>
						<router-link to=''><van-col span="8">货位调拨</van-col></router-link>
						<router-link to=''><van-col span="8">销售出库</van-col></router-link>
					</van-row>
				</van-collapse-item>
			</van-collapse>
    </div>
</template>

<script>
import { Col, Row } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Collapse, CollapseItem } from 'vant';
export default {
  // 数据
  data() {
    return {
			activeNames: ['1','2'],
    };
  },
  methods: {
    hideCont(){
			
		}
  },
  mounted(){
 
  }
}
</script>
<style>
	.van-collapse-item__content{
		padding: 0;
	}
	.van-cell__title span{
		font-weight: bold;
	}
</style>
<style scoped>
	.homeBox{
		background-color: #f8f8f8;
	}
	.van-icon{
		width: 100%;
	}
.van-col{
	text-align: center;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: center;
	height: 8rem;
	border: 1px solid #f2f2f2;
	
}
</style>