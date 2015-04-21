/**
 * Created by TomCao on 2015/4/16.
 */

var path = require('path');

var root_dir = __dirname + '/';
var public_dir = root_dir + 'public';
var temp_dir = root_dir + 'temp';

var config = {
    web: {
        address: '0.0.0.0',
        port: '3000'
    },
    app:{
        'dev_mode': true
    },
    sys: {
        root_dir: root_dir,
        public_dir: public_dir,
        temp_dir: temp_dir
    }
}

module.exports = config;