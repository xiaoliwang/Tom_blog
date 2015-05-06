/**
 * Created by TomCao on 2015/4/21.
 */
"use strict";

const errorno = require('../conf/config')['errorno'];

function *errorHandle(){
    var errorInfo = errorno[this.status];
    switch (this.accepts('html','json')){
        case 'html':
            this.type = 'html';
            yield this.render('error/error',{
                message: errorInfo
            });
            break;
        case 'json':
            this.body = {
                message: errorInfo
            };
            break;
        default:
            this.type = 'text';
            this.body = errorInfo;
    }
}

module.exports = function(app){
    //错误处理
    app.use(function *(next){
        try{
            yield next;
        }catch(e){
            this.status = 500;
            yield errorHandle.apply(this);
        }
    });

    //404处理
    app.use(function *(next){
        yield next;
        if(404 !== this.status) return;
        this.status = 404;
        yield errorHandle.apply(this);
    });
}