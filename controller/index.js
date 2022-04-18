// 路径 contriller/index.js

const { Router } = require('express');
const access_tokenController = require('./access_token.js');
const jsapi_ticketController = require('./jsapi_ticket.js');
const signatureController = require('./signature.js');
const wx_configController = require('./wx_config.js');

module.exports = async function () {
    const router = Router();
    router.use('/access_token', await access_tokenController());
    router.use('/jsapi_ticket', await jsapi_ticketController());
    router.use('/signature', await signatureController());
    router.use('/wx_config', await wx_configController());
    return router;
}
