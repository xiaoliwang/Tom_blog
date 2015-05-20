/**
 * Created by ���� on 2015/5/20.
 */
$(function(){
    //////////////////////////////////ace������////////////////////
    //���ñ༭��λ��
    var editor = ace.edit("md-editor");
    //����Ƥ��������
    editor.setTheme("ace/theme/twilight");
    editor.getSession().setMode("ace/mode/markdown");
    editor.getSession().setUseWrapMode(true);//�Զ�����
    //���ñ༭�������С
    document.getElementById('md-editor').style.fontSize='20px';

    //////////////////////////////////////mathjax������////////////////////
    MathJax.Hub.Config({
        tex2jax: {inlineMath: [['$','$']]}
    });
    var math = document.getElementById("md-preview");

    ///////////////////////////////////////marked������////////////////////
    marked.setOptions({
        highlight : function(code){
            return hljs.highlightAuto(code).value;
        }
    });

    /////////////////////////////////////��ʼ����//////////////////////////
    var trigger = {};
    editor.getSession().on('change',function(e){
        if(trigger){
            clearTimeout(trigger);
        }
        trigger = setTimeout(function(){
            //��ȡ��ʼ�ı�
            var value = editor.getValue();
            //marked��Ⱦ
            var afterMarked = marked(value);
            afterMarked+="<div style=”clear:both;”></div>";
            $("#md-preview").html(afterMarked);
            toc("#md-preview");
            //mathjax��Ⱦ
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]);
        },1000);
    });

});

//ACE������������������������������������������������������������������������������������������������������������

//��ֵ��ȡֵ
//editor.setValue("the new text here"); // or session.setValue
//editor.getValue(); // or session.getValue

//��ȡѡ������
//editor.session.getTextRange(editor.getSelectionRange());

//�������
//editor.insert("Something cool");

//��ȡ���λ��
//editor.selection.getCursor();

//ȥ���ڼ���
//editor.gotoLine(int lineNumber);

//��ȡ��������
//editor.session.getLength();

//����tab�Ĵ�С
//editor.getSession().setTabSize(4);

//����ֻ��
//editor.setReadOnly(true);

//editor.getSession().setUseSoftTabs(true);
// editor.getSession().setUseWrapMode(true);
// editor.setHighlightActiveLine(true);
// editor.setShowPrintMargin(true);