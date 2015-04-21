/**
 * Created by TomCao on 2015/4/16.
 */
"use strict";

var config = require('../config');

var logger = require('koa-logger'),
    render = require('koa-ejs'),
    parse = require('co-body');

module.exports = function(app){

    //信任代理ip地址
    app.proxy = true;

    render(app,{
        root: config['sys'].view_dir,
        layout: 'layout',
        viewExt: 'html',
        cache: !config['app'].dev_mode, //开发模式关掉缓存
        debug: config['app'].dev_mode,
        locals: config['web'].locals
    });

    //开发模式时，显示日志
    if(config['app'].dev_mode){
        app.use(logger());
    }

    //错误处理
    app.use(function *errorHandle(next){
        try{
            yield next;
        } catch(e){
            this.status = 500;

            switch (this.accepts('html','json')){
                case 'html':
                    this.type = 'html';
                    this.body = '<p>Internal server error</p>';
                    break;
                case 'json':
                    this.body = {
                        message: 'Internal server error'
                    };
                    break;
                default:
                    this.type = 'text';
                    this.body = 'Internal server error';
            }

            if(config['app'].dev_mode){
                console.error(e.stack);
            }
        }
    });

    //404处理
    app.use(function *pageNotFound(next){
        yield next;

        if(404 !== this.status) return;

        this.status = 404;

        switch (this.accepts('html','json')){
            case 'html':
                this.type = 'html';
                yield this.render('test',{
                        message:'Page Not Found'}
                );
                break;
            case 'json':
                this.body = {
                    message: 'Page Not Found'
                };
                break;
            default:
                this.type = 'text';
                this.body = 'Page Not Found';
        }
    });

    //
    app.use(function *(next){
       yield next;
    });
};