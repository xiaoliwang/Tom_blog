/**
 * Created by TomCao on 2015/4/23.
 */
var mkblog = require('koa-router')();

require('./edit')(mkblog);

module.exports = mkblog;
