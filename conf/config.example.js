/**
 * Created by TomCao on 2015/4/16.
 */
"use strict";
var path = require('./path');
var locals = require('./locals');
var errorno = require('./errorno');

var dev_mode = true;

//设置文件
var config = {
    //项目相关
    app:{
        dev_mode: dev_mode,
        path: path
    },
    //服务器基本配置
    web: {
        address: '0.0.0.0',
        port: '3000',
        locals: locals
    },
    //错误代码
    errorno: errorno
}

module.exports = config;