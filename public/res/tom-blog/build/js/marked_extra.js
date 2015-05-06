"use strict";
(function(){

    var self;

    var Markdown_extra = function(){
        if(!marked) throw Error('you need marked，https://github.com/chjj/marked');
        if(!hljs) throw Error('you need hljs，https://github.com/isagalaev/highlight.js')
        self = this;
    };

    //extends marked
    Markdown_extra.prototype = marked;
    for(var i in marked){
        Markdown_extra.prototype.i = marked[i];
    }

    //更改默认marked配置
    var defaults = Markdown_extra.prototype.defaults;
    defaults.smartLists = true; //文档默认true，源码默认false
    //设置代码高亮
    defaults.highlight = function (code) {
        return hljs.highlightAuto(code).value;
    };

    //生成html函数
    Markdown_extra.prototype.ext_gen_html = function(value){

        var heads = []; //标题数组

        //生成脚注
        value = generate_footnotes(value);

        value = generate_definition(value);

        var tokens = self.lexer(value);
        tokens.forEach(function(object,index){
            switch(object.type){
                //换行后，生成文本直接换行
                case('paragraph'):
                    if(!self.defaults.original)
                        object.text = object.text.replace(/[\n|\r|\n\r]/ig,'<br/>');
                    break;
                //获取所有的标题
                case('heading'):
                    heads.push([object.depth,object.text]);
                    break;
            }
        });

        var afterMarked = self.parser(tokens);

        //生成目录
        var contents = generate_contents(heads);
        return afterMarked = afterMarked.replace(/<p>\[TOC\]<\/p>/ig,contents);
    }

    ///////////////////////////////////目录函数/////////////////////////////
    //生成目录函数
    var generate_contents = function(heads){
        var point = 1;
        var contents = '<div class="toc"><ul>';
        heads.forEach(function(value,index){
            if(point !== value[0]){
                var count = value[0] - point;
                var absCount = Math.abs(count);
                do{
                    contents += (count > 0?'<ul>':'</ul>');
                }while(--absCount);
                point = value[0];
            }
            contents += '<li><a href="#'
            +self.defaults.headerPrefix
            +value[1].toLowerCase().replace(/[^\w]+/g, '-')
            +'">'+value[1]+'</a></li>';
        });

        if(point !== 1){
            while(--point){
                contents += '</ul>';
            }
        }
        return contents += '</ul></div>';
    }

    /////////////////////////////////脚注函数/////////////////////////////////
    //生成脚注函数
    var generate_footnotes = function(text){
        self.footnotes = {};
        self.usedFootnotes = [];
        text = stripFootnoteDefinitions(text);
        text = doFootnotes(text);
        text = printFootnotes(text);
        delete self.footnotes;
        delete self.usedFootnotes;
        return text;
    }

    //获取到所有脚注
    var stripFootnoteDefinitions = function(text) {
        text = text.replace(
            /(?:^)\[\^(.+?)\]?\:([\S ]+?)(?:$)/mg,
            function(wholeMatch, m1, m2) {
                m1 = slugify(m1);
                m2 = m2.trim();
                m2 += "\n";
                self.footnotes[m1] = m2;
                return "";
            });
        return text;
    };

    //生成脚注编号
    var doFootnotes = function(text){
        var footnoteCounter = 0;
        text = text.replace(
            /\[\^(.+?)\]/g,
            function(wholeMatch, m1){
                m1 = slugify(m1);
                var footnote = self.footnotes[m1];
                if(footnote === undefined) {
                    return wholeMatch;
                }
                footnoteCounter++;
                self.usedFootnotes.push(m1);
                var html = '<a href="#fn:' + m1 + '" id="fnref:' + m1
                +'" title="Go to footnote" class="footnote">['
                +footnoteCounter + ']</a>';
                return html.replace("\n",'');
            });
        return text;
    }

    //生成脚注注释
    var printFootnotes = function(text){
        if(self.usedFootnotes.length === 0){
            return text;
        }
        text += '<div class="footnotes"><hr><ol>';
        for(var i = 0; i < self.usedFootnotes.length; i++){
            var id = self.usedFootnotes[i];
            var footnote = self.footnotes[id];
            text += '<li id="fn:'
                + id
                + '">'
                + footnote
                + '<a href="#fnref:'
                + id
                + '" title="Return to article" class="reversefootnote">&#8617;</a></li>'
        }
        text += '</ol></div>';
        return text;
    }

    /////////////////////////////////生成定义函数/////////////////////////////////
    function generate_definition(text){
        text = text.replace(
            /((?:^)(.*)(?:\n\:[ ]{3})(([\S ]+\n?)+?)(?:[^\n]$)(?:\n+|$))+/gmi,
            function(wholeMatch){
                var html = '<dl>';
                html +=rename1(wholeMatch);
                html += '</dl>';
                html = html.replace(/\n/g,'') + "\n\n";
                console.log(1,html);
                return html;
            });
        return text;
    }

    function rename1(text){
        text = text.replace(
            /(?:^)(.*)(?:\n\:[ ]{3})(([\S ]+\n?)+?)(?:[^\n]$)/gmi,
            function(wholeMatch,m1,m2){
                var html = '<dt>';
                html += m1;
                html += '</dt><dd>';
                html += m2.replace(/\n/g,'<br/>');
                html += '</dd>';
                return html;
            });
        return text;
    }

    /////////////////////////////工具函数///////////////////////////////////
    //移出多余空格和non-wordr
    function slugify(text) {
        return text.toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
    }

    //去除html标签
    function sanitizeHtml(html, whitelist){
        return html.replace(/<[^>]*>?/gi,function(tag){
           return tag.match(whitelist)? tag : '';
        });
    }

    //同时兼容网页和iojs
    if (typeof exports === "object" && typeof require === "function")
        module.exports = new Markdown_extra;
    else
        window.marked_extra = new Markdown_extra;

})();