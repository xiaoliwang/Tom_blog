/**
 * Created by TomCao on 2015/4/22.
 */
"use strict";
var path = require('path');

//设置常用的路径

const root_dir = exports.root_dir = path.join(__dirname,'..')+'/';  //root路径
const public_dir = exports.public_dir = root_dir + 'public/';       //public路径
exports.view_dir = root_dir + 'view/';  //view路径
exports.temp_dir = root_dir + 'temp/';  //temp路径

const res_dir = exports.res_dir = public_dir + 'res/' //resource文件
exports.bower_dir = res_dir + 'bower-libs/'; //bower的主文件
exports.build_dir = public_dir+'build/';    //build文件
