<template>
<div class="listDiv">
    <div>
        <van-swipe-cell>
            <van-field v-model="form.earTag" center name="earTag" label="耳标编号" placeholder="请输入或扫码" readonly />
            <van-field label="牛耳号" name="earTradeNo" v-model="form.earTradeNo" placeholder="请输入牛耳号" :rules="[{ required: true, message: '' }]" readonly />
            <van-field label="关联时间" name="relevanceTime" v-model="form.relevanceTime" placeholder="请输入关联时间" :rules="[{ required: true, message: '' }]" readonly />
            <van-field label="关联人" name="relevanceUserName" v-model="form.relevanceUserName" placeholder="请输入关联人" :rules="[{ required: true, message: '' }]" readonly />
        </van-swipe-cell>
    </div>
        <div class="pubClass">
            <li>牛只信息</li>
        </div>
        <div>
            <van-cell-group>
                <van-field label="牛舍名" :value="info.cowHouse || '根据牛耳号获取'" readonly />
                <van-field label="群别" :value="info.series || '根据牛耳号获取'" readonly />
                <van-field label="品种" :value="info.variety || '根据牛耳号获取'" readonly />
                <van-field label="商品名" :value="info.cowHouse || '根据牛耳号获取'" readonly />
                <van-field label="月龄" :value="info.callInAge || '根据牛耳号获取'" readonly />
                <van-field label="出生日期" :value="info.birthTime || '根据牛耳号获取'" readonly />
                <van-field label="出生重" :value="info.birthWeight || '根据牛耳号获取'" readonly />
                <van-field label="体重" :value="info.weight || '根据牛耳号获取'" readonly />
            </van-cell-group>
        </div>
</div>
</template>
<script>
import Vue from 'vue';
import { 
    Toast, 
    Field,
    Form,
    Dialog,
} from 'vant';
Vue.use(Field)
    .use(Form)
    .use(Dialog)
export default {
    data() {
        return {
            form: {
                earTag: '',
                earTradeNo: '',
                relevanceTime: "",
                relevanceUserName: "",
            },
            info: {},
        };
    },
    mounted(){
        this._info();
    },
    methods: {
        _info(){
            let data = JSON.parse(this.$route.query.data);
            this.form = {
                earTag: data.earTag,
                earTradeNo: data.earTradeNo,
                relevanceTime: data.relevanceTime,
                relevanceUserName: JSON.parse(localStorage.getItem("userInfo")).userName
            }
            this.getInfo(data.earTradeNo);
        },
        getInfo(earTradeNo){
            this.$json({
                url: `/mhj/dispatchCowBills/getCowDetail?earTradeNo=${earTradeNo}`,
                method: "get",
            }).then(res => {
                this.info = res.resp;
            })
        }
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