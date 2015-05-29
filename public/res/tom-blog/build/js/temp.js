/**
 * Created by 杰朋 on 2015/5/20.
 */
$(function(){
    //////////////////////////////////ace的设置////////////////////
    //设置编辑器位置
    editor = ace.edit("md-editor");
    //设置皮肤和语言
    editor.setTheme("ace/theme/twilight");
    editor.getSession().setMode("ace/mode/markdown");
    editor.getSession().setUseWrapMode(true);//自动换行
    //设置编辑字体大小
    document.getElementById('md-editor').style.fontSize='20px';

    //////////////////////////////////////mathjax的设置////////////////////
    MathJax.Hub.Config({
        tex2jax: {inlineMath: [['$','$']]}
    });
    var math = document.getElementById("md-preview");

    ///////////////////////////////////////marked的设置////////////////////
    marked.setOptions({
        highlight : function(code){
            return hljs.highlightAuto(code).value;
        }
    });

    /////////////////////////////////////开始监听//////////////////////////
    var trigger = {};
    editor.getSession().on('change',function(e){
        if(trigger){
            clearTimeout(trigger);
        }
        trigger = setTimeout(function(){
            //获取初始文本
            var value = editor.getValue();
            //防止刷新丢失
            sessionStorage.setItem('edtionValue',value);
            //marked渲染
            var afterMarked = marked(value);
            $("#md-preview").html(afterMarked);
            toc("#md-preview");
            //mathjax渲染
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]);
            //sequence-diagram序列图渲染
            $(".lang-seq").sequenceDiagram({theme: 'hand'});
            $(".lang-flow").each(function(index,flow){
                var id = 'flow' + index;
                flow = $(flow);
                var str_flow = flow.text();
                flow.attr('id', id);
                flow.html('');
                var diagram = flowchart.parse(str_flow);
                diagram.drawSVG(id);
            });
        },500);
    });

/////////////////////////////////////////刷新不丢失数据////////////////////////////////////////
    var editorValue = sessionStorage.getItem('edtionValue');
    editor.insert(editorValue);
    $('#local-version').val(sessionStorage.getItem('local-version'));

    var versions = localStorage.getItem('arr_versions');
    versions =  versions && JSON.parse(versions);
    if(versions){
        console.log(versions);
        $('.dropdown-menu').prepend('<li><a href="#" id="delete-all-versions">删除所有本地文档</li>');
        $('.dropdown-menu').prepend('<li class="divider"></li>');
        for(key in versions){
            $('.dropdown-menu').prepend('<li><a href="#" class="get-version-value" val="' +
                key+ '">' + versions[key] +
                '</a></li>');
        }
    }else{
        $('.dropdown-menu').append(
            '<li class="divider"></li>'+
            '<li><a href="#" id="empty-menu" val="1">没有本地文档</a></li>'+
            '<li class="divider"></li>'
        );
    }


//////////////////////////////////////////////编辑工具栏////////////////////////////////////////////////////
    editorTools();
    textTools();

});

//ACE

//设值和取值
//editor.setValue("the new text here"); // or session.setValue
//editor.getValue(); // or session.getValue

//获取选中区域
//editor.session.getTextRange(editor.getSelectionRange());

//光标后插入
//editor.insert("Something cool");

//获取光标位置
//editor.selection.getCursor();

//去到第几行
//editor.gotoLine(int lineNumber);

//获取所有行数
//editor.session.getLength();

//设置tab的大小
//editor.getSession().setTabSize(4);

//设置只读
//editor.setReadOnly(true);

//editor.getSession().setUseSoftTabs(true);
// editor.getSession().setUseWrapMode(true);
// editor.setHighlightActiveLine(true);
// editor.setShowPrintMargin(true);