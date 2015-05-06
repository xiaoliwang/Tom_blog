/**
 * Created by TomCao on 2015/4/23.
 */
"use strict";
var mount = require('koa-mount');

var mkblog = require('./mkblog');

module.exports = function(app){
    app.use(mount('/mkblog',mkblog.middleware()));
}