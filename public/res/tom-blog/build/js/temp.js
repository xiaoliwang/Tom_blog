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
        },1000);
    });

//////////////////////////////////////////////工具栏////////////////////////////////////////////////////
    //粗体文本
    $(".glyphicon-bold").click(function(){
        insertVal('**');
    });

    //斜体文本
    $(".glyphicon-italic").click(function(){
        insertVal('*');
    });

    //加粗或者斜体
    function insertVal(mark){
        //选取范围
        var selectRange = editor.getSelectionRange();
        var sr_start = selectRange.start;
        var sr_end = selectRange.end;
        var row_end = editor.session.getLine(sr_end.row).length; //选取行的末尾column值
        //选取范围的值
        var val = editor.session.getTextRange(selectRange);
        val = $.trim(val.replace(/\n/g,'').replace(/\*/g,'\\*'));

        //是否已经为加粗或斜体文本
        if(sr_start.column > (mark.length - 1)
            && sr_end.column < (row_end - mark.length + 1)){
            var newRange = selectRange.clone();
            newRange.setStart(sr_start.row,sr_start.column - mark.length);
            newRange.setEnd(sr_end. row,sr_end.column + mark.length);
            var newVal = editor.session.getTextRange(newRange);
            var escape_mark = mark.replace(/\*/g,'\\*');
            var regular_express = new RegExp(escape_mark+'.*'+escape_mark);
            if(regular_express.test(newVal)){
                editor.selection.setSelectionRange(newRange);
                mark = '';
            }else{
                val = val || (mark.length === 2?'粗体文本'
                    :'斜体文本');
            }
        }else{
            val = val || (mark.length === 2?'粗体文本'
                :'斜体文本');
        }
        //插入新文本
        editor.insert(mark + val + mark);
        //设置选取范围
        var cursor = editor.selection.getCursor();
        var c_row = cursor.row;
        var c_column = cursor.column;
        selectRange.setStart(c_row,c_column - mark.length - val.length);
        selectRange.setEnd(c_row,c_column - mark.length);
        editor.selection.setSelectionRange(selectRange);
        editor.focus();
    }

    /*$(".glyphicon-bold").click(function(){
        //获取选取位置的range
        var selectRange = editor.getSelectionRange();
        //获取range中的值
        var selectVal = editor.session.getTextRange(selectRange);
        selectVal = selectVal.replace(/\n/g,'');
        if(selectVal.replace(/\s/g,'')){
            if(1) {
                editor.insert(selectVal);
                var n_c_column = cursor_position.column;
                var n_c_column = cursor_position.column;
                var n_c_row = cursor_position.row;
                selectRange.setStart(n_c_row, n_c_column - selectVal.length);
                selectRange.setEnd(n_c_row, n_c_column);
                editor.selection.setSelectionRange(bigRange, true);
            } else{
                editor.insert("**"+selectVal+"**");
                var n_c_column = cursor_position.column;
                var n_c_column = cursor_position.column;
                var n_c_row = cursor_position.row;
                selectRange.setStart(n_c_row, n_c_column - selectVal.length - 2);
                selectRange.setEnd(n_c_row, n_c_column - 2);
                editor.selection.setSelectionRange(bigRange, true);
            }
        }else{
            //editor.insert("**粗体文本**");
            editor.moveCursorTo(0,1, false);
            editor.selection.moveCursorTo(0,2,true);
            editor.focus();
        }
    });*/
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