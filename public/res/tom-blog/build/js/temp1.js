/**
 * Created by 杰朋 on 2015/5/28.
 */
////////////////////////编辑工具栏///////////////////////////////////
function editorTools(){
    //粗体文本
    $(".glyphicon-bold").click(function(){
        insertVal('**');
    });

    //斜体文本
    $(".glyphicon-italic").click(function(){
        insertVal('*');
    });

    //斜体文本
    $(".glyphicon-minus").click(function(){
        insertVal('~~');
    });

    //添加链接
    $("#add_link_sure").click(function(){
        //关闭模态框
        $('#linkModal').modal('hide');
        //处理选择内容
        var selectRange = editor.getSelectionRange();
        var s_val = editor.session.getTextRange(selectRange);
        s_val = $.trim(s_val.replace(/\n/g,''));
        s_val = s_val || '此处输入链接的描述';   //描述的值
        //处理输入网址并插入
        var link_val = $('#link_value').val();  //网址
        editor.insert('['+s_val+']('+link_val+')');
        //设置选取框
        var cursor = editor.selection.getCursor();
        var nsc_end = cursor.column - link_val.length - 3;
        var nsc_begin = nsc_end - s_val.length;
        selectRange.setStart(cursor.row, nsc_begin);
        selectRange.setEnd(cursor.row, nsc_end);
        editor.selection.setSelectionRange(selectRange);
        editor.focus();
    });

    //关闭模态框，清空输入框
    $('#linkModal').on('hidden.bs.modal',function(e){
        $('#link_value').val('');
    });

//////////////////////////////////////////////////tool function////////////////////////////////
    //添加mark文本
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
                val = val || getText(mark);
            }
        }else{
            val = val || getText(mark);
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

    //获取默认文本
    function getText(mark){
        switch(mark){
            case '**':
                return '粗体文本';
            case '*':
                return '斜体文本';
            case '~~':
                return '划掉文本';
        }
    }

    //添加段落（未完成）
    /*$('.glyphicon-chevron-right').click(function(){
     var selectRange = editor.getSelectionRange();
     var s_val = editor.session.getTextRange(selectRange);
     s_val = $.trim(s_val.replace(/\n/g,''));
     if(s_val){

     }else{
     if(selectRange.start.row){
     editor.insert('\n> 段落引用\n');
     }else{
     editor.insert('> 段落引用');
     }
     }
     });*/

    //代码样例（未完成）
    /*$('.glyphicon-console').click(function(){

     });*/

};