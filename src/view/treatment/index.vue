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
                <div v-else class="listDiv" v-for="(item, index) of list" :key="index">
                    <van-swipe-cell>
                        <van-cell-group @click="getInfo(item)">
                            <van-field label="耳标编号" :value="item.earTag" readonly />
                            <van-field label="牛耳号" :value="item.earTradeNo" readonly />
                            <van-field label="关联时间" :value="item.relevanceTime" readonly />
                            <van-field label="关联人" :value="item.relevanceUserName" readonly />
                        </van-cell-group>
                        <template #right>
                            <div style="height: 50%;">
                                <van-button square type="primary" icon="edit" text="" @click="update(item)" style="height: 100%;" />
                            </div>
                            <div style="height: 50%;">
                                <van-button square type="danger" icon="close" text="" @click="earTagUnbind(item)" style="height: 100%;" />
                            </div>
                        </template>
                    </van-swipe-cell>
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
    PullRefresh, 
    Toast, 
    List, 
    Field,
    SwipeCell,
    Dialog,
} from 'vant';
Vue
    .use(PullRefresh)
    .use(List)
    .use(Field)
    .use(SwipeCell)
    .use(Dialog)
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
                url: `/mhj/earTag/getList?size=4&current=${this.current}`,
                method: "get",
            }).then(res => {
                this.list.push.apply(this.list,res.resp.records);
                this.loading = false;
                setTimeout(()=>{
                    this.refreshing = false;
                    this.show = false;
                },200)
                if (this.list.length >= res.resp.total) {
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
            this.$router.push({path: '/earMarkersAdd'})
        },
        getInfo(row){
            this.$router.push({
                path: '/treatmentInfo',
                query: {
                    data: JSON.stringify(row),
                }
            })
        },
        update(row){
           this.$router.push({
                path: '/treatmentAdd',
                query: {
                    data: JSON.stringify(row),
                }
            }) 
        },
        onSearch(value){
            this.show = true;
            this.onRefresh();
        },
        earTagUnbind(row){
            Dialog.confirm({
                title: '解绑确认',
                message: '确认解绑该电子耳标吗？？？',
            }).then(() => {
                this.$json({
                    url: `/mhj/earTag/unbind`,
                    method: "post",
                    data: {
                        earTag: row.earTag,
                        earTradeNo: row.earTradeNo,
                        etId: row.etId,
                    }
                }).then(res => {
                    Toast.success('解绑成功！');
                    this.onRefresh();
                })
            }).catch(() => {});
        }
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