import {instanceAuth, api} from './request';
import { Notify } from 'vant';
export const baseUrl = api.baseUrl;

export const jsonHttp = function ({
    url,
    method = "post",
    data = {} } = {}) {
    return new Promise(function (resolve, rejiect) {
        instanceAuth({ url, method, data }).then((result) => {
            if (result.data.code == 10000 || !result.data.code) {
                let resdata = result.data;
                resolve(resdata);
            } else {
                Notify({ message: result.data.msg, type: 'warning' });
                rejiect(result.data)
            }
        }, err => {
          rejiect(err)
        })
    })
};

