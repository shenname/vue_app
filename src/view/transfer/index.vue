<template>
<div>
    <div class="searchContext">
        <van-search v-model="searchContext" show-action background="#FFF" placeholder="请输入搜索关键词" @search="onSearch">
            <template slot="action">
                <div style="position: relative;top: 7px;">
                    <van-icon :name="require('../../assets/img/scan.png')" size="22"  />
                </div>
            </template>
            </van-search>
    </div>
    <div class="bodyDiv">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-empty v-if="list.length <= 0" description="暂无数据" />
                <div v-else class="listDiv" v-for="(item, index) of list" :key="index" @click="getItem(item)">
                    <van-cell-group>
                        <van-field label="牛耳号" :value="item.earTradeNo" readonly />
                        <van-field label="原牛舍" :value="item.oldCowHouse" readonly />
                        <van-field label="转入舍" :value="item.cowHouse" readonly />
                        <van-field label="转入时间" :value="item.mvHouseTime" readonly />
                        <van-field label="备注" :value="item.remark" readonly />
                    </van-cell-group>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
    <van-icon class="addDiv" name="add-o" size="4rem" @click="add" />
    <van-overlay :show="show" z-index="100">
        <div class="wrapper">
            <van-loading type="spinner" color="#FFF" size="50px" />
        </div>
    </van-overlay>
</div>
</template>
<script>
import Vue from 'vue';
import {
    Search,
    PullRefresh, 
    List, 
    Field,
    Overlay,
    Loading,
} from 'vant';
Vue
    .use(Loading)
    .use(Search)
    .use(PullRefresh)
    .use(List)
    .use(Field)
    .use(Overlay)
export default {
    data() {
        return {
            show: false,
            searchContext: "",
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
                url: `/mhj/getMvCowHouseList?size=4&current=${this.current}${this.searchContext != "" ? `&searchContext=${this.searchContext}` : ""}`,
                method: "get",
            }).then(res => {
                this.list.push.apply(this.list,res.resp);
                this.loading = false;
                setTimeout(()=>{
                    this.refreshing = false;
                    this.show = false;
                },500)
                if (this.list.length >= res.totalCount) {
                    this.finished = true;
                }
            })
        },
        onRefresh() {
            this.current = 0;
            this.list = [];
            this.finished = false;
            this.loading = false;
            this.onLoad();
        },
        add(){
            this.$router.push({
                path: '/transferInfo',
                query: {
                    type: "add"
                }
            })
        },
        getItem(row){
            this.$router.push({
                path: '/transferInfo',
                query: {
                    type: "info",
                    data: row,
                }
            })
        },
        onSearch(value){
            this.show = true;
            this.onRefresh();
        },
    },
}
</script>
<style lang="less" scoped>
.listDiv{
    width: 94vw;
    margin: 10px 3vw;
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
.searchContext{
    position: fixed;
    top: 46px;
    right: 0;
    left: 0;
    z-index: 99;
}
.bodyDiv{
    padding-top: 54px;
    height: calc(100vh - 150px);
}
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>