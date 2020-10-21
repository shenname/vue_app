<template>
<div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-empty v-if="list.length <= 0" description="暂无数据" />
            <div v-else class="listDiv" v-for="(item, index) of list" :key="index">
                <van-cell-group>
                    <van-field label="耳标编号" :value="item.earTag" readonly />
                    <van-field label="牛耳号" :value="item.earTradeNo" readonly />
                    <van-field label="关联时间" :value="item.relevanceTime" readonly />
                    <van-field label="关联人" :value="item.relevanceUserName" readonly />
                </van-cell-group>
            </div>
        </van-list>
    </van-pull-refresh>
    <van-icon class="addDiv" name="add-o" size="4rem" @click="add" />
</div>
</template>
<script>
import Vue from 'vue';
import { 
    PullRefresh, 
    Toast, 
    List, 
    Field 
} from 'vant';
Vue
    .use(PullRefresh)
    .use(List)
    .use(Field);
export default {
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            refreshing: false,
            current: 0,
        };
    },
    methods: {
        onLoad() {
            this.current += 1;
            this.$json({
                url: `/mhj/earTag/getList?size=4&current=${this.current}`,
                method: "get",
            }).then(res => {
                this.list.push.apply(this.list,res.resp.records);
                this.loading = false;
                this.refreshing = false;
                if (this.list.length >= res.resp.total) {
                    this.finished = true;
                }
            })
        },
        onRefresh() {
            this.finished = false;
            this.loading = false;
            this.onLoad();
        },
        add(){
            this.$router.push({path: '/earMarkersInfo'})
        }
    },
}
</script>
<style lang="less" scoped>
.listDiv{
    width: 88vw;
    margin: 10px 6vw;
    border: 1px solid rgba(228, 228, 228, 1);
    border-radius: 5px;
}
.addDiv{
    position: fixed;
    bottom: 8rem;
    right: 4rem;
}
.listDiv .van-cell{
    padding: 5px 16px !important;
    border: none !important;
}
</style>