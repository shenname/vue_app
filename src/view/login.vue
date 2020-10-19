<template>
    <div>
        <h3>登录</h3>
        <div>
            <van-form @submit="onSubmit">
                <van-field
                    v-model="username"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    autocomplete="off"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    autocomplete="off"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <div style="margin: 16px;">
                    <van-button size="small" round block type="info" native-type="submit">
                    提交
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Form, Notify } from 'vant';
Vue.use(Form);
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit(values) {
      this.$json({
        url: `/mhj/login`,
        method: "post",
        data: {
          userName: this.username,
          password: this.password,
          type: 2,
          loginTime: (new Date().getTime() / 1000).toFixed(0),
        }
      }).then(res => {
        localStorage.setItem('token', res.resp.token);
        localStorage.setItem('username', this.username);
        localStorage.setItem('userInfo', JSON.stringify(res.resp));
        Notify({ type: 'success', message: '登录成功' });
        this.$router.push('/');
      })
    },
  },
};
</script>

<style lang="less" scoped>
    h3{
        width: 100%;
        padding: 10px 0;
        text-align: center;
        border-bottom: 1px solid #ccc;
    }
</style>