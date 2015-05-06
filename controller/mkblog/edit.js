/**
 * Created by TomCao on 2015/4/23.
 */
"use strict";

module.exports = function(mkblog){
    mkblog.get('/edit',function *(next){
        yield this.render('mkblog/edit',{
            layout: 'mkblog/layout'
        });
    });

    mkblog.post('/edit',function *(next){
       this.body = 'postEdit';
    });
};