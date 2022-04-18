// 路径 contriller/wx_config.js

const { Router } = require('express');
const axios = require('axios');
const sha1 = require('node-sha1');
const config = require('../config');

class Wx_config {
    async init () {
        const router = Router();
        router.use('/', this.post);
        return router;
    }
    post = async (req, res) => {
        //console.log('req.body'+JSON.stringify(req.body))
        //console.log('req.body.url:'+req.body.url);
        const { data } = await axios(`${config.localPath}/signature?url=${req.body.url}`);
        let signature = '';

        if (data.signature) {
            signature = data.signature;
        } else {
            res.json(data);
            return;
        }

        //把参数返回前端
        res.json({
            appId: config.appid,
            timestamp: config.timestamp,
            nonceStr: config.nonceStr,
            signature: sha1(signature),
        })
    }
}

module.exports = async function () {
    return await new Wx_config().init();
}
