<template>
<div class="listDiv">
    <div class="pubClass">
        <li>单据信息</li>
    </div>
    <div>
        <van-swipe-cell>
            <van-field
                v-model="form.earTradeNo"
                center
                autocomplete="off"
                name="earTag"
                label="牛耳号"
                :rules="[{ required: true, message: '' }]"
                readonly
            />
            <van-field 
                autocomplete="off"
                label="治疗时间" 
                name="cureTime" 
                v-model="form.cureTime" 
                :rules="[{ required: true, message: '' }]"
                readonly
            />
            <van-field 
                autocomplete="off"
                label="治疗药物" 
                name="cureMedicine" 
                v-model="form.cureMedicine" 
                :rules="[{ required: true, message: '' }]" 
                readonly
            />
            <van-field label="治疗过程" name="cureCourse" v-model="form.cureCourse" :rules="[{ required: true, message: '' }]" autocomplete="off" readonly />
            <van-field label="治疗备注" name="cureRemark" v-model="form.cureRemark" autocomplete="off" readonly />
        </van-swipe-cell>
    </div>
    <div class="pubClass">
        <li>牛只信息</li>
    </div>
    <div>
        <van-cell-group>
            <van-field label="场名" :value="info.oldFName || ''" readonly />
            <van-field label="牛舍名" :value="info.cowHouse || ''" readonly />
            <van-field label="发病日期" :value="info.oncomeTime || ''" readonly />
            <van-field label="发病月龄" :value="info.oncomeMoonAge || ''" readonly />
            <van-field label="症状" :value="info.symptom || ''" readonly />
            <van-field label="所属系统" :value="info.organ || ''" readonly />
            <van-field label="症状备注" :value="info.symptomRemark || ''" readonly />
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
    DatetimePicker,
} from 'vant';
Vue.use(Field)
    .use(Form)
    .use(Dialog)
    .use(DatetimePicker)
export default {
    data() {
        return {
            form: {},
            info: {},
        };
    },
    mounted(){
        let data = JSON.parse(this.$route.query.data);
        this.form = data;
        this.getInfo(data.earTradeNo);
    },
    methods: {
        // 获取详情
        getInfo(earTradeNo){
            this.$json({
                url: `/mhj/getCowDiseaseLogDetailByEarTradeNo?earTradeNo=${earTradeNo}`,
                method: "get",
            }).then(res => {
                this.info = res.resp[0] || {};
                this.info.symptomRemark = this.info.symptomRemark == "" ? '无' : this.info.symptomRemark;
            }).catch(err => {})
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
.materNav{
    width: 100%;
    height: 44px;
    display: flex;
    list-style: none;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    padding: 0 4px;
    color: #000;
}
</style>