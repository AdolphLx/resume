// 路径 contriller/jsapi_ticket.js

const { Router } = require('express');
const axios = require('axios');
const urlUtil = require("url");
const querystring = require("querystring");

class Jsapi_ticket {
    async init () {
        const router = Router();
        router.use('/', this.get);
        return router;
    }
    get = async (req, res) => {
        //获取返回的url对象的query属性值 
        var arg = urlUtil.parse(req.url).query;

        //将arg参数字符串反序列化为一个对象
        var params = querystring.parse(arg);
        const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${params.access_token}&type=jsapi`;
        const { data } = await axios.get(url);
        res.json(data);
    }
}

module.exports = async function () {

    return await new Jsapi_ticket().init();
}
