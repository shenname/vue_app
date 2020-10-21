<template>
<div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="listDiv" v-for="(item, index) of list" :key="index">
                <van-cell-group>
                    <van-field label="牛耳号" value="GN0301190001、GN0301190001" readonly />
                    <van-field label="原牛舍" value="S308南" readonly />
                    <van-field label="转入舍" value="S309北" readonly />
                    <van-field label="转入时间" value="2020-10-10" readonly />
                    <van-field label="备注" value="牛舍分配" readonly />
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
                url: `/mhj/getMvCowHouseList?size=4&current=${this.current}`,
                method: "get",
            }).then(res => {
                let list = [1,2,3],arr = [4,5,6];
                list.push.apply(list,arr);
                console.log(list)
            })

            setTimeout(() => {
                if (this.refreshing) {
                    this.list = [];
                    this.refreshing = false;
                }

                for (let i = 0; i < 10; i++) {
                this.list.push(this.list.length + 1);
                }
                this.loading = false;

                if (this.list.length >= 40) {
                    this.finished = true;
                }
            }, 1000);
        },
        onRefresh() {
            this.finished = false;
            this.loading = false;
            this.onLoad();
        },
        add(){
            this.$router.push({path: '/transferInfo'})
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