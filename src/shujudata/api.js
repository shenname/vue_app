import Axios from 'axios'; //引入axios
import qs from 'qs';	//引入axios数据处理
Axios.defaults.timeout = 10000;                        //响应时间
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
// axios.defaults.baseURL = 'http://spsj.xn62x.cn';   //配置接口地址
// axios.defaults.baseURL = 'http://192.168.1.100';   //配置接口地址
// 添加一个响应拦截器
Axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  // 判断是否登录
  	// let cur_id = "cur_id",
  	// 	  sign = "sign";
   //  if (!cur_id||!sign) {
   //    localStorage.clear();
   //    window.location.href = "index.html";
   //  };
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
     _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});

// 添加返回信息验证
Axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
// 网络地址
let base = 'http://101.201.28.118:8080';
// 接口地址
Axios.getNewInfo = `${base}/sexp/stock/getNewInfo`

export default Axios;

