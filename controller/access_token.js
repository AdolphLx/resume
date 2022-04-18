// 路径 contriller/access_token.js

const { Router } = require("express");
const axios = require('axios');
const config = require('../config');
class Axios {
    async init () {
        const router = Router();
        router.get('/', this.get);
        return router;
    }
    get = async (req, res) => {
        let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appid}&secret=${config.secret}`;
        const { data } = await axios.get(url);
        res.json(data);
    }
}

module.exports = async function () {
    return await new Axios().init();
}
