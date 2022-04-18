// 路径config/index.js

module.exports = {
    localPath: 'https://express-ac92-1829167-1257711897.ap-shanghai.run.tcloudbase.com',  //换成自己的域名
    appid: 'wx07e9dfac1f9ac7c8',  //换成自己的开发者ID(AppID)
    secret: '250bxxxxxxxxxxxd363',  //换成自己的开发者密码(AppSecret)	

    timestamp: new Date().getTime().toString().slice(0, 10), //取时间戳的前十位
    grant_type: 'client_credential',
    nonceStr: 'Wm3WZYTPz0wzccnW',
    Token: 'accesstoken',
}


