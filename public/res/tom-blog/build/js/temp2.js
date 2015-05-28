/**
 * Created by 杰朋 on 2015/5/28.
 */
function textTools(){

    //保存代码
    $('.glyphicon-floppy-save').click(function(){
        var version = $('#local-version').val();
        if(!version)
            $('#saveModal').modal('show');
        var value = editor.getValue();
        localStorage.setItem(version,value);
    });

    $('#local_save_sure').click(function(){
        var title = $.trim($('#blog_title').val());
        if(title){
            //关闭模态框
            $('#saveModal').modal('hide');
            //获取新的id
            var lastId = parseInt(localStorage.getItem('lastId')) || 0;
            localStorage.setItem('lastId',++lastId);
            //设置版本
            var version = 'version' + lastId;
            $('#local-version').val(version);
            sessionStorage.setItem('local-version',version);
            //版本管理设置
            var arr_version = JSON.parse(localStorage.getItem('arr_versions')) || {};
            arr_version[version] = title;
            localStorage.setItem('arr_versions',JSON.stringify(arr_version));
            //插入本地版本管理
            $('.dropdown-menu').append('<li><a href="#" class="get-version-value" val="' +
                version+ '">' + title +
                '</a></li>');
        }else{
            $('#input_alert').text('请填写标题');
            $('#blog_title').focus();
        }
    });

    //获取代码
    $('.get-version-value').click(function(){
        var version = $(this).attr('val');
        $('#local-version').val(version);
        sessionStorage.setItem('local-version',version);
        editor.selection.selectAll();
        editor.insert(localStorage.getItem(version));
    });

    $('#saveModal').on('hidden.bs.modal',function(e){
        $('#save_title').val('');
        $('#input_alert').text('');
    });
}