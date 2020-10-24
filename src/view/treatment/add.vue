<template>
<div class="listDiv">
    <van-form @submit="onSubmit">
        <div class="pubClass">
            <li>单据信息</li>
        </div>
        <div style="border: 1px solid #ccc;">
            <van-swipe-cell>
                <van-field
                    v-model="form.earTradeNo"
                    center
                    autocomplete="off"
                    name="earTag"
                    label="牛耳号"
                    placeholder="请输入或扫码"
                    :rules="[{ required: true, message: '' }]"
                    readonly
                />
                <van-field 
                    autocomplete="off"
                    label="治疗时间" 
                    name="cureTime" 
                    v-model="form.cureTime" 
                    @click="showPicker = true" 
                    placeholder="请选择治疗时间" 
                    :rules="[{ required: true, message: '' }]"
                    readonly
                    clickable
                />
                <van-field 
                    autocomplete="off"
                    label="治疗药物" 
                    name="cureMedicine" 
                    v-model="form.cureMedicine" 
                    placeholder="请输入治疗药物" 
                    :rules="[{ required: true, message: '' }]" 
                    @click="showMaterial = true"
                    readonly
                    clickable
                />
                <van-field label="治疗过程" name="cureCourse" v-model="form.cureCourse" placeholder="请输入治疗过程" :rules="[{ required: true, message: '' }]" autocomplete="off" />
                <van-field label="治疗备注" name="cureRemark" v-model="form.cureRemark" placeholder="请输入治疗备注" autocomplete="off" />
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
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">保&nbsp;&nbsp;&nbsp;存</van-button>
        </div>
    </van-form>
    <!-- 时间选择 -->
    <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
            type="date"
            title="选择年月日"
            v-model="currentDate"
            @confirm="onConfirm"
            @cancel="showPicker = false"
            :formatter="formatter"
        />
    </van-popup>
    <!-- 治疗药物 -->
    <van-popup v-model="showMaterial" position="bottom">
        <div style="height:308px;">
            <div class="van-picker__toolbar">
                <button type="button" class="van-picker__cancel" @click="showMaterial = false;">取消</button>
                <div class="van-ellipsis van-picker__title">治疗药物</div>
                <button type="button" class="van-picker__confirm" @click="handluse">确认</button>
            </div>
            <div class="van-picker__columns">
                <li class="materNav" v-for="(item, index) of MaterialBoxList" :key="index" @click="selectUse(index)">
                    <van-icon v-show="item.isTrue" name="success" color="#1989fa" style="position: absolute;left: 30vw;" />
                    {{item.materialName}}
                </li>
            </div>
        </div>
    </van-popup>
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
            currentDate: new Date(),
            showPicker: false,
            MaterialBoxList: [],
            showMaterial: false,
            form: {
                earTradeNo: '',
                cureTime: "",
                cureMedicine: "",
                cureCourse: "",
                cureRemark: "",
            },
            info: {},
        };
    },
    mounted(){
        let data = JSON.parse(this.$route.query.data);
        // this.form = {
        //     earTradeNo: data.earTradeNo,
        //     cureTime: data.cureTime,
        //     cureMedicine: data.cureMedicine,
        //     cureCourse: data.cureCourse,
        //     cureRemark: data.cureRemark,
        // }
        this.form = data;
        this.getMaterialBox();
        this.getInfo(data.earTradeNo);
    },
    methods: {
        formatter(type, val) {
            if (type === 'year') {
                return `${val}年`;
            } else if (type === 'month') {
                return `${val}月`;
            }else if (type === 'day') {
                return `${val}日`;
            }
            return val;
        },
        onConfirm(time) {
            let t = `${new Date(time).getFullYear()}-${new Date(time).getMonth() + 1}-${new Date(time).getDate()}`;
            this.form.cureTime = t;
            this.showPicker = false;
        },
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
        // 获取药物下拉
        getMaterialBox(){
            this.$json({
                url: `/mhj/getMaterialBox?mtId=17`,
                method: 'get',
            }).then(res => {
                res.resp.map((item,key) => {
                    item.isTrue = false;
                    return item;
                })
                this.MaterialBoxList = res.resp;
            })
        },
        selectUse(key){
            this.MaterialBoxList[key].isTrue = !this.MaterialBoxList[key].isTrue;
        },
        handluse(){
            let list = [],str = "";
            for(let item of this.MaterialBoxList){
                if(item.isTrue){
                    list.push(item)
                    str += `,${item.materialName}`;
                }
            }
            this.form.cureMedicine = str.substr(1);
            this.showMaterial = false;
            console.log(list[0].withdrawalTime, list[0].materialName, str.substr(1), str)
        },
        onSubmit(values) {
            this.$json({
                url: `/mhj/modifyCowDiseaseLog`,
                method: "post",
                data: this.form,
            }).then(res => {
                Toast.success("单据保存成功!");
                this.$router.push({path: '/treatment'})
            }).catch(err => {
                Toast.fail(err);
            })
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