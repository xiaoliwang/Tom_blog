#!/sbin/iojs

var app = require('../index')

var config = require('../conf/config');

var server = app.listen(
    process.env.PORT || config['web'].port || 3000,
    config['web'].address || '::',
    function(){
        console.log(`Tom_Blog listen on \
        ${server.address().address}:${server.address().port}`);
    }
);