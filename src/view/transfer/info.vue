<template>
<div class="listDiv">
    <van-form @submit="onSubmit">
        <div class="pubClass">
            <li>牛只信息</li>
            <div>
                <van-icon name="plus" size="20" @click="add" />&nbsp;&nbsp;
                <van-icon :name="require('../../assets/img/scan.png')" size="20" @click="show = true;" />
            </div>
        </div>
        <div style="border: 1px solid #ccc">
            
            <van-swipe-cell v-for="(item, index) of eaList" :key="index">
                <van-field 
                    label="牛耳号"
                    name="earTradeNoList[]"
                    v-model="eaList[index].earTradeNo" 
                    placeholder="请输入或扫码"
                    :rules="[{ required: true, message: '' }]"
                    @blur="getEarTradeNo(item.earTradeNo, index)"
                />
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" @click="deleteFun(index)" />
                </template>
            </van-swipe-cell>
        </div>
        <div class="pubClass">
            <li>牛舍信息</li>
        </div>
        <div style="border: 1px solid #ccc">
            <van-swipe-cell>
                <van-field label="原牛舍" name="oldCowHouse" v-model="form.oldCowHouse" placeholder="请输入原牛舍" :rules="[{ required: true, message: '' }]" readonly />
                <van-field
                    v-model="form.cowHouse"
                    center
                    name="cowHouse"
                    label="转入舍"
                    placeholder="请输入或扫码"
                    :rules="[{ required: true, message: '' }]"
                    @blur="getEaName"
                >
                    <template #button>
                        <van-icon :name="require('../../assets/img/scan.png')" size="20" style="margin-top: 7px;" />
                    </template>
                </van-field>
                <van-field label="备注" name="remark" v-model="form.remark" placeholder="请输入备注" />
            </van-swipe-cell>
        </div>
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
    </van-form>
    <van-dialog v-model="show" title="扫码" show-cancel-button @confirm="getCowByEarTag">
        <van-field label="耳标号" v-model="value" placeholder="请输入耳标号" />
    </van-dialog>
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
        if(this.$route.query.type == 'info'){

        }
        console.log(this.$route.query)
    },
    methods: {
        add(){
            this.eaList.push({
                earTradeNo: '',
                oldCowHouse: '',
                oldcowHouseId: '',
            })
        },
        deleteFun(key){
            this.eaList.splice(key,1);
        },
        // 根据牛耳号获取数据
        getEarTradeNo(earTradeNo,index){
            this.$json({
                url: `/mhj/dispatchCowBills/getCowDetail?earTradeNo=${earTradeNo}`,
                method: "get"
            }).then(res => {
                if(this.checkisUse(earTradeNo,index)){
                    Notify({ type: 'warning', message: '该牛耳号已存在!' });
                    return
                }
                if(this.checkCowHouse(res.resp.cowHouseId)){
                    Notify({ type: 'warning', message: '牛只必须为相同牛舍!' });
                    return
                }
                this.eaList[index] = {
                    earTradeNo: earTradeNo,
                    oldCowHouse: res.resp.cowHouse,
                    oldcowHouseId: res.resp.cowHouseId,
                }
                this.form.oldCowHouse = res.resp.cowHouse;
                this.form.oldCowHouseId = res.resp.cowHouseId;
            })
        },
        // 检查牛舍是否相同
        checkCowHouse(cowHouseId){
            let htype = false;
            for(let item of this.eaList){
                if(cowHouseId != item.oldcowHouseId && item.oldcowHouseId != "" && item.oldcowHouseId != null){
                    htype = true
                }
            }
            return htype;
        },
        checkisUse(earTradeNo,index=null){
            let htype = false;
            for(let key in this.eaList){
                if(index != key){
                    if(earTradeNo == this.eaList[key].earTradeNo && this.eaList[key].earTradeNo != "" && this.eaList[key].earTradeNo != null){
                        htype = true
                    }
                }
            }
            return htype;
        },
        // 获取牛标
        getCowByEarTag(){
            this.$json({
                url: `/mhj/getCowByEarTag?earTag=${this.value}`,
                method: "get"
            }).then(res => {
                if(res.resp == null){
                    Notify({ type: 'warning', message: '该编码未绑定!' });
                    return
                }
                if(this.checkisUse(res.resp.earTradeNo)){
                    Notify({ type: 'warning', message: '该编码已存在!' });
                    return
                }
                if(this.checkCowHouse(res.resp.cowHouseId)){
                    Notify({ type: 'warning', message: '牛只必须为相同牛舍!' });
                    return
                }
                this.eaList.push({
                    earTradeNo: res.resp.earTradeNo,
                    oldCowHouse: res.resp.cowHouse,
                    oldcowHouseId: res.resp.cowHouseId,
                })
            })
        },
        // 获取转入舍
        getEaName(event){
            if(this.form.cowHouse != null && this.form.cowHouse != "")
            this.$json({
                url: `/mhj/getByCowHouse?cowHouse=${this.form.cowHouse}`,
                method: "get"
            }).then(res => {
                if(res.resp != null){
                    this.form.cowHouse = res.resp.cowHouse || '';
                    this.form.cowHouseId = res.resp.cowHouseId || '';
                }
                
            })
        },
        // 提交
        onSubmit(values) {
            let list = "",params = JSON.parse(JSON.stringify(this.form));
            for(let item of this.eaList){
                list += `,${item.earTradeNo}`;
            }
            params.earTradeNo = list.substr(1);
            this.$json({
                url: `/mhj/addMvCowHouse`,
                method: "put",
                data: params
            }).then(res => {
                Toast.success('成功！');
                setTimeout(()=>{
                    this.$router.push({ path: '/transfer' })
                },300)
            })
        },
    },
}
</script>
<style lang="less" scoped>
.listDiv{
    width: 94vw;
    margin: 10px 3vw;
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