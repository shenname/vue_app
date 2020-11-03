<template>
<div class="listDiv">
    <van-form @submit="onSubmit">
        <div class="pubClass">
            <li>单据信息</li>
        </div>
        <div style="border: 1px solid #ccc;margin-bottom:20px;">
            <van-swipe-cell>
                <van-field
                    v-model="form.tradeNo"
                    center
                    name="tradeNo"
                    label="单据编号"
                    placeholder="请输入或扫码"
                    :rules="[{ required: true, message: '' }]"
                />
                <van-field
                    readonly
                    clickable
                    name="warehouseName"
                    :value="form.warehouseName"
                    label="仓库"
                    placeholder="请选择仓库"
                    :rules="[{ required: true, message: '' }]"
                    @click="showPicker = true"
                />
                <van-field label="单据状态" name="status" v-model="form.status" placeholder="根据扫描产品获取" readonly/>
                <van-field label="备注" name="remark" v-model="form.remark" placeholder="请输入备注" />
                
            </van-swipe-cell>
        </div>
        <div class="pubClass">
            <li>产品信息</li>
            <van-icon :name="require('../../assets/img/scan.png')" size="30" style="margin-top: 7px;float:right;" @click="getItemCode" />
        </div>
        <div style="border: 1px solid #ccc;margin-bottom:20px;">
            <van-cell-group>
                <van-field label="" value="123" readonly v-for="(item, index) of dataInfo" :key="index">
                    <template slot="input">
                        <input :value="`${item.tradeNo} ${item.bpName} ${item.RoadwayTion} ${item.goodsAlloca}`" style="border: none;height: 30px;font-size: 16px;width: 100%;" />
                    </template>
                    <template slot="extra">
                        <van-icon  size="30px" name="cross" @click="aaa" color="#f00" />
                    </template>
                </van-field>
            </van-cell-group>
        </div>
        <!-- <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">保&nbsp;&nbsp;&nbsp;存</van-button>
            <van-button round block type="info" native-type="submit">关&nbsp;&nbsp;&nbsp;联</van-button>
        </div> -->
    </van-form>

    <!-- 弹框 -->
    <van-dialog v-model="show" title="分配货位" show-cancel-button @confirm="diaSubmit">
        <p style="text-align: center;color:#999;font-size: 14px;padding: 20px 0;">请选择【{{info.bpName}}】巷道及货位</p>
        <div class="select">
            <select name="RoadwayTion" @change="getGoodsAllocationList" v-model="RoadwayTion" :rules="[{ required: true, message: '' }]" placeholder="请选择巷道">
                <option :value ="0">请选择</option>
                <option v-for="(item, index) of RoadwayList" :key="index" :value ="item.roadway">
                    {{item.roadway}}
                    &nbsp;&nbsp;
                    现有{{item.roadwayWeight}}Kg产品
                </option>
            </select>
        </div>
        <div class="select">
            <select name="goodsAlloca" v-model="goodsAlloca" :rules="[{ required: true, message: '' }]" placeholder="请选择货位">
                <option :value ="0">请选择</option>
                <option v-for="(item, index) of AllocationList" :key="index" :value ="item.gmId">
                    {{item.goodsAllocation}}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>现有{{item.goodsAllocationWeight}}Kg产品</span>
                </option>
            </select>
        </div>
    </van-dialog>
    <!-- 仓库 -->
    <van-popup v-model="showPicker" position="bottom">
        <van-picker
            show-toolbar
            :title="'仓库'"
            value-key="warehouseName"
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
        />
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
    Picker,
} from 'vant';
Vue.use(Field)
    .use(Form)
    .use(Dialog)
    .use(Picker)
export default {
    data() {
        return {
            showPicker: false,
            columns: [],
            form: {
                tradeNo: '',
                warehouseId: '',
                warehouseName: '',
                status: "",
                remark: "",
                userName: "",
            },
            RoadwayTion: "0",
            goodsAlloca: "0",
            info: {},
            RoadwayList: [],
            AllocationList: [],
            show: false,
            dataInfo: [],
        };
    },
    mounted(){
        this.form.userName = JSON.parse(localStorage.getItem("userInfo")).userName;
        this.getWarehouseBox();
    },
    methods: {
        getWarehouseBox(){
            this.$json({
                url: `/mhj/getWarehouseBox`,
                method: "get",
            }).then(res => {
                this.columns = res.resp;
            }).catch(err => {
                Toast.fail(err);
            })
        },
        onConfirm(value){
            this.form.warehouseName = value.warehouseName
            this.form.warehouseId = value.warehouseId
            this.showPicker = false;
        },
        getItemCode(){
            if(this.form.warehouseId == ""){
                Toast.fail("请选择仓库!");
                return;
            }
            console.log("调起扫码，获取详情！默认: 201029001ZX");
            this.$json({
                url: `/mhj/goodsAllocateBill/getDetailByLabel?billType=2&label=201029001ZX`,
                method: "get",
            }).then(res => {
                console.log(res.resp)
                this.form.tradeNo = res.resp.tradeNo;
                this.info = res.resp;
                this.getRoadwayList();
            })
        },
        getRoadwayList(){
            if(this.RoadwayList.length > 0){
                this.show = true;
                return
            };
            this.$json({
                url: `/mhj/goodsAllocateBill/getRoadwayList?warehouseId=${this.form.warehouseId}&bpId=${this.info.bpId}`,
                method: "get",
            }).then(res => {
                this.RoadwayList = res.resp
                this.show = true;
            }).catch(err => {
                Toast.fail(err);
            })
        },
        getGoodsAllocationList(val){
            this.$json({
                url: `/mhj/goodsAllocateBill/getGoodsAllocationList?warehouseId=${this.form.warehouseId}&bpId=${this.info.bpId}&roadway=${val.path[0].value}`,
                method: "get",
            }).then(res => {
                this.AllocationList = res.resp;
            }).catch(err => {
                Toast.fail(err);
            })
        },
        diaSubmit(){
            if(this.RoadwayTion == '0'){
                this.show = true;
                return;
            }
            if(this.goodsAlloca == '0'){
                this.show = true;
                return;
            }
            this.info.RoadwayTion = this.RoadwayTion;
            this.info.goodsAlloca = this.goodsAlloca;
            this.dataInfo.push(this.info);
            console.log(this.info, this.dataInfo)
        },
        aaa(){
            console.log(111111)
        },
        
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
                this.$router.push({path: '/earMarkers'})
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
.select {
    display: inline-block;
    width: 90%;
    margin: 5px 5%;
    position: relative;
    vertical-align: middle;
    padding: 0;
    overflow: hidden;
    background-color: #fff;
    color: #999;
    border: 1px solid #aaa;
    text-shadow: none;
    border-radius: 4px;	
    transition: box-shadow 0.25s ease;
    z-index: 2;
}

.select:hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.select:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border: 7px solid transparent;
    border-top-color: #ccc;
    top: 14px;
    right: 10px;
    cursor: pointer;
    z-index: -2;
}
.select select {
    cursor: pointer;
    padding: 10px;
    width: 100%;
    border: none;
    background: transparent;
    background-image: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}

.select select:focus {
    outline: none;
}
</style>