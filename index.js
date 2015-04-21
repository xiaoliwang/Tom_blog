/**
 * Created by TomCao on 2015/4/16.
 */

var koa = require('koa');

var middlewares = require('./lib/middlewares');
    //controller = require('./controller');

var app = module.exports = koa();

middlewares(app);
//controller(app);