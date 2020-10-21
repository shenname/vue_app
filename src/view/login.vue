<template>
    <div class="bg">
      <div style="background: #72829770;height:100vh;">
        <div class="images">
          <div style="overflow:hidden;">
            <img src="../assets/login.png">
          </div>
        </div>
        <van-form @submit="onSubmit">
          <div class="body">
            <van-field
                v-model="username"
                clearable
                label-width="0"
                left-icon="contact"
                label=""
                placeholder="手机号/用户名/邮箱"
                autocomplete="off"
                :rules="[{ required: true, message: '' }]"
            />
          </div>
          <div class="body">
            <van-field
              v-model="password"
              clearable
              label-width="0"
              left-icon="lock"
              label=""
              :type="checked ? 'text' : 'password'"
              placeholder="密码"
              autocomplete="off"
              :rules="[{ required: true, message: '' }]"
            >
              <template #button>
                <van-icon v-if="!checked" name="closed-eye" @click="checked = true;" />
                <van-icon v-else name="eye-o" @click="checked = false;" />
              </template>
            </van-field>
          </div>
          <div class="bodybut">
            <van-button style="width:100%;" native-type="submit" round type="primary" color="rgba(245, 245, 245, 0.6)" size="normal">提交</van-button>
          </div>
        </van-form>
      </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Form, Notify, Icon } from 'vant';
Vue.use(Form).use(Icon);
export default {
  data() {
    return {
      checked: false,
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
.bg{
  height: 100vh;
  background-image: url('../assets/bg.png');
  background-size: 100% 100%;
}

.body{
  padding: 0 20vw;
  margin-bottom: 10px;
}
.bodybut{
  padding: 0 23vw;
  margin-top: 45px;
}
.images{
  width: 100%;
  padding: 12vh 0;
  >div{
    overflow: hidden;
    width: 112px;
    height: 112px;
    margin: 0 auto;
    border-radius: 50%;
    >img{
      display: inherit;
      margin: 0 auto;
    }
  }
}

</style>
<style lang="less">
.bg{
  .van-field__control::-webkit-input-placeholder{
    color:#fff !important;
  }
  .van-field__control:-moz-placeholder{
    color:#fff !important;
  }
  .van-field__control::-moz-placeholder{
    color:#fff !important;
  }
  .van-field__control:-ms-input-placeholder{
    color:#fff !important;
  }
  .van-field__control{
    font-size: 16px;
    color: #fff;
  }
  .van-cell{
    background: none !important;
    border-bottom: 1px solid #fff;
    color: #fff !important;
    padding: 5px 0px;
  }
  .van-icon,
  .van-cell__value--alone{
    color: #fff !important;
    font-size: 20px !important;
  }
}
</style>