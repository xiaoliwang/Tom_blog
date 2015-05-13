/**
 * Created by TomCao on 2015/5/7.
 */
var toc;
"use strict";
(function(){

    toc = function(id){
        var heads = [];
        $(id+" :header").each(function(index,head){
            var depth = parseInt((head.tagName).replace("H",""));
            var value = $(head).text();
            heads.push([depth,value]);
        });

        var contents = generate_contents(heads);
        $("#toc").html(contents);
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
            + marked?marked.defaults.headerPrefix:"";
            + value[1].toLowerCase().replace(/[^\S]+/g, '-')
            + '">'+value[1]+'</a></li>';
        });

        if(point !== 1){
            while(--point){
                contents += '</ul>';
            }
        }
        return contents += '</ul></div>';
    }

})();