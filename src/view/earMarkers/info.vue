<template>
<div class="listDiv">
    <van-form @submit="onSubmit">
        <div style="border: 1px solid #ccc;">
            <van-swipe-cell>
                <van-field
                    v-model="form.earTag"
                    center
                    name="earTag"
                    label="耳标编号"
                    placeholder="请输入或扫码"
                    :rules="[{ required: true, message: '' }]"
                    @blur="getEaName"
                >
                    <template #button>
                        <van-icon :name="require('../../assets/img/scan.png')" size="20" style="margin-top: 7px;" />
                    </template>
                </van-field>
                <van-field label="牛耳号" name="earTradeNo" @blur="checkIsuseea" v-model="form.earTradeNo" placeholder="请输入牛耳号" :rules="[{ required: true, message: '' }]" />
                <!-- <van-field label="关联时间" name="relevanceTime" v-model="form.relevanceTime" placeholder="请输入关联时间" :rules="[{ required: true, message: '' }]" readonly /> -->
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
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">关&nbsp;&nbsp;&nbsp;联</van-button>
        </div>
    </van-form>
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
                earTag: 'dz20201016001',
                earTradeNo: '',
                relevanceTime: "",
                relevanceUserName: "",
            },
            info: {},
        };
    },
    mounted(){
        this.form.relevanceUserName = JSON.parse(localStorage.getItem("userInfo")).userName;
    },
    methods: {
        onSubmit(values) {
            this.$json({
                url: `/mhj/earTag/bind`,
                method: "post",
                data: {
                    earTag: this.form.earTag,
                    earTradeNo: this.form.earTradeNo,
                }
            }).then(res => {
                Toast.success("添加成功!");
            }).catch(err => {
                Toast.fail(err);
            })
        },
        // 检查是否已绑定
        getEaName(event){
            if(this.form.earTag != null && this.form.earTag != ""){
                this.$json({
                    url: `/mhj/earTag/checkEarTag?earTag=${this.form.earTag}`,
                    method: "get",
                }).catch(err => {
                    this.form.earTag = "";
                })
            }
        },
        // 检查是否已绑定
        checkIsuseea(){
            if(this.form.earTradeNo != null && this.form.earTradeNo != ""){
                this.$json({
                    url: `/mhj/earTag/checkEarTradeNo?earTradeNo=${this.form.earTradeNo}`,
                    method: "get",
                }).then(res => {
                    this.getInfo(this.form.earTradeNo)
                }).catch(err => {
                    this.form.earTradeNo = "";
                })
            }
        },
        // 获取详情
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