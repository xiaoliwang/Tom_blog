/**
 * Created by TomCao on 2015/4/22.
 */
"use strict";
var gulp = require('gulp'),
    less = require('gulp-less'),
    clean = require('gulp-clean');


var conf = require('./conf/config.js');

var bower_dir = conf['app']['path'].bower_dir;

var js_path = [`${bower_dir}jquery/dist/jquery.min.js`,
               `${bower_dir}jquery/dist/jquery.min.map`,
               `${bower_dir}bootstrap/dist/js/bootstrap.min.js`,
            ];

var css_path = [`${bower_dir}bootstrap/dist/css/bootstrap.min.css`,
                `${bower_dir}bootstrap/dist/css/bootstrap-theme.min.css`,
            ];

var less_path = [`public/res/mk_blog/less/*.less`];

gulp.task('clean',function(){
    return gulp.src('public/build/base')
        .pipe(clean());
});

gulp.task('moveJs',function(){
    return gulp.src(js_path)
        .pipe(gulp.dest('public/build/base/js'));
});

gulp.task('moveCss',function(){
    return gulp.src(css_path)
        .pipe(gulp.dest('public/build/base/css'));
});

gulp.task('compileLess',function(){
   return gulp.src(less_path)
        .pipe(less())
        .pipe(gulp.dest('public/build/mk_blog/css'));
});

gulp.task('default',['compileLess','moveJs','moveCss']);