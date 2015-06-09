/**
 * Created by 杰朋 on 2015/5/28.
 */
function textTools(){

    //更新代码或者打开弹出框
    $('.glyphicon-floppy-save').click(function(){
        var version = $('#local-version').val();
        if(!version){
            $('#saveModal').modal('show');
        }else{
            var value = editor.getValue();
            localStorage.setItem(version,value);
            $('#saveStatus').modal('show');
        }
    });

    //保存弹出框
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
            //保存内容
            var value = editor.getValue();
            localStorage.setItem(version,value);
            //插入本地版本管理
            if(!$('#no-menu').is(":hidden")){
                $('#no-menu').hide();
                $('#has-menu').show();
            }
            $('#has-menus').prepend('<li><a href="#" class="get-version-value" val="' +
                version+ '">' + title +
                '</a></li>');
            $('#saveStatus').modal('show');
        }else{
            $('#input_alert').text('请填写标题');
            $('#blog_title').focus();
        }
    });

    $('#saveModal').on('hidden.bs.modal',function(e){
        $('#blog_title').val('');
        $('#input_alert').text('');
    });

    //获取代码
    $('.get-version-value').click(function(){
        //获取版本号
        var version = $(this).attr('val');
        //更新本地版本
        $('#local-version').val(version);
        sessionStorage.setItem('local-version',version);
        //插入新文本
        editor.selection.selectAll();
        editor.insert(localStorage.getItem(version));
    });

    $('#delete-all-versions').click(function(){
       $('#deleteAllStatus').modal('show');
    });

    $('#delete_all_sure').click(function(){
        localStorage.clear();
        sessionStorage.clear();
        $('#local-version').val('');
        $('#no-menu').show();
        $('#has-menu').hide();
        $('#has-menus').find('.get-version-value').remove();
        $('#deleteAllStatus').modal('hide');
    });

    window.deleteById = function(versionId){
        localStorage.removeItem(versionId);
    }

}