<template>
<div class="listDiv">
    <div class="pubClass">
        <li>牛只信息</li>
    </div>
    <div>
        <van-swipe-cell>
            <van-field v-for="(item, index) of eaList" :key="index" label="牛耳号" name="earTradeNoList[]" v-model="eaList[index].earTradeNo" placeholder="请输入原牛舍" readonly />
        </van-swipe-cell>
    </div>
    <div class="pubClass">
        <li>牛舍信息</li>
    </div>
    <div>
        <van-swipe-cell>
            <van-field label="原牛舍" name="oldCowHouse" v-model="form.oldCowHouse" placeholder="请输入原牛舍" :rules="[{ required: true, message: '' }]" readonly />
            <van-field
                v-model="form.cowHouse"
                center
                readonly
                name="cowHouse"
                label="转入舍"
                placeholder="请输入或扫码"
                :rules="[{ required: true, message: '' }]"
            >
                <template #button>
                    <van-icon :name="require('../../assets/img/scan.png')" size="20" style="margin-top: 7px;" />
                </template>
            </van-field>
            <van-field label="备注" name="remark" v-model="form.remark" placeholder="请输入备注" readonly />
        </van-swipe-cell>
    </div>
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
    Form,
    Dialog,
    Notify
} from 'vant';
Vue
    .use(PullRefresh)
    .use(List)
    .use(Field)
    .use(SwipeCell)
    .use(Form)
    .use(Dialog)
    .use(Notify)
export default {
    data() {
        return {
            value: 'dz20201016001',
            show: false,
            eaList: [],
            form: {
                oldCowHouse: '',
                oldCowHouseId: '',
                cowHouse: '',
                cowHouseId: '',
                remark: '',
            }
        };
    },
    mounted(){
        this.getInfo();
    },
    methods: {
        getInfo(){
            let data = JSON.parse(this.$route.query.data);
            this.form = {
                oldCowHouse: data.oldCowHouse,
                oldCowHouseId: data.oldCowHouseId,
                cowHouse: data.cowHouse,
                cowHouseId: data.cowHouseId,
                remark: data.remark,
            }
            let eaList = data.earTradeNo.split(",");
            let list = [];
            for(let item of eaList){
                list.push({
                    earTradeNo: item,
                    oldCowHouse: data.oldCowHouse,
                    oldcowHouseId: data.oldCowHouseId,
                })
            }
            this.eaList = list;
        },
    },
}
</script>
<style lang="less" scoped>
.listDiv{
    width: 88vw;
    margin: 10px 6vw;
    .pubClass{
        height: 40px;
        padding: 5px 0px;
        line-height: 40px;
        >li{
            float: left;
            list-style: none;
        }
        >div{
            float: right;
        }
    }
}
.delete-button {
    height: 100%;
}
</style>