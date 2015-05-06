/**
 * Created by TomCao on 2015/4/16.
 */
"use strict";

var config = require('../conf/config');

var logger = require('koa-logger'),
    render = require('koa-ejs'),
    serve = require('koa-static'),
    parse = require('co-body');

var errorHandle = require('./errorhandle');

module.exports = function(app){

    //设置
    app.use(function *(next){
        var start = new Date;

        yield next;

        if(!config['app'].dev_mode){
            //开发模式不配置缓存
            this.set('Cache-Control','max-age=5184000');
        }
        this.set('X-Powered-By',"TomCao's blog");
        var ms = new Date - start;
        this.set('X-Response-Time',ms+'ms');
    });

    //信任代理ip地址
    app.proxy = true;

    //设置cookie密钥
    //app.keys

    //设置ejs引擎
    render(app,{
        root: config['app']['path'].view_dir,
        layout: false,
        viewExt: 'ejs',
        cache: !config['app'].dev_mode, //开发模式关掉缓存
        debug: config['app'].dev_mode,
        locals: config['web'].locals
    });


    //开发环境设置
    if(config['app'].dev_mode){
        //开发模式时，显示日志
        app.use(logger());
        //开发模式时，静态资源访问。（生产环境使用nginx）
        app.use(serve(config['app']['path'].res_dir));
    }

    //错误处理
    errorHandle(app);

};