/**
 * Created by 杰朋 on 2015/5/20.
 */
$(function(){
    //////////////////////////////////ace的设置////////////////////
    //设置编辑器位置
    var editor = ace.edit("md-editor");
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
            //marked渲染
            var afterMarked = marked(value);
            afterMarked+="<div style=”clear:both;”></div>";
            $("#md-preview").html(afterMarked);
            toc("#md-preview");
            //mathjax渲染
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]);
        },1000);
    });

//////////////////////////////////////////////工具栏////////////////////////////////////////////////////
    //字体加粗
    $(".glyphicon-bold").click(function(){
        var selectRange = editor.getSelectionRange();
        var selectVal = editor.session.getTextRange(selectRange);
        if(selectVal){
            editor.insert("**"+selectVal+"**");
        }else{
            var cursor_position = editor.selection.getCursor();
            var temp_column = cursor_position.column;
            var temp_row = cursor_position.row;
            selectRange.setStart(temp_row, temp_column+2);
            selectRange.setEnd(temp_row, temp_column+6);
            editor.insert("**粗体文本**");
            editor.selection.setSelectionRange(selectRange, true);
        }
    });
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