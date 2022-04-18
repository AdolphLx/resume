// 路径 contriller/signature.js

const { Router } = require('express');
const axios = require('axios');
const config = require('../config');
const urlUtil = require("url");
const querystring = require("querystring");

class Signature {
    async init () {
        const router = Router();
        router.get('/', this.get)
        return router;
    }
    get = async (req, res) => {
        //获取返回的url对象的query属性值 
        var arg = urlUtil.parse(req.url).query;
        console.log('arg:' + arg);
        //将arg参数字符串反序列化为一个对象
        var params = querystring.parse(arg);
        let access_token = '';
        {
            const { data } = await axios.get(`${config.localPath}/access_token`);
            if (data.access_token) {
                access_token = data.access_token;
            } else {
                res.json(data);
                return;
            }
            console.log('access_token:' + access_token);
        }
        {
            const { data } = await axios.get(`${config.localPath}/jsapi_ticket?access_token=${access_token}`);
            let ticket = '';
            if (data.ticket) {
                ticket = data.ticket;
            } else {
                res.json(data);
                return
            }
            console.log('ticket:' + ticket);
            console.log('url:' + params.url)
            const signature = `jsapi_ticket=${ticket}&noncestr=${config.nonceStr}&timestamp=${config.timestamp}&url=${params.url}`;
            console.log('signature:' + signature);
            res.json({ signature });

        }


    }
}

module.exports = async function () {
    return await new Signature().init();
}
