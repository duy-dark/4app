var actoken = $('#access_token').val();
var rftoken = $('#refresh_token').val();

function saveCD() {
    var data = {};
    data.TENKH = $('#TEN').val();
    data.SDTKH = $('#SDT').val();
    data.DIEMDIKH = $('#DIEMDI').val();
    data.GHICHUKH = $('#GHICHU').val();

    $.ajax({
        url: 'http://localhost:3000/datxe',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        timeout: 10000,
        success: function(data) {
            console.log(data)
            alert('thanh cong');
        }
    });
};

function regist() {
    var data = {};
    data.HOTEN = $('#hoten').val();
    data.NGAYSINH = $('#ngaysinh').val();
    data.USERNAME = $('#username').val();
    data.PASSWORD = $('#password').val();
    data.GIOITINH = $('#gioitinh').val();
    data.DIACHI = $('#diachi').val();

    //alert(JSON.stringify(data));

    $.ajax({
        url: 'http://localhost:3000/account/register',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        timeout: 10000,
        success: function(data) {
            console.log(data)
            alert('thanh cong');
        }
    });

};

function login() {
    var data = {};
    data.USERNAME = $('#fusername').val();
    data.PASSWORD = $('#fpassword').val();

    //alert(JSON.stringify(data));

    $.ajax({
        url: 'http://localhost:3000/account/login',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        timeout: 10000,
        success: function(data, textstatus, xhr) {
            // alert(xhr.status);
        }
    }).done(function(data) {
        //alert(data.length());
        result = data;
        $('#access-token').val(result.access_token);
        $('#refresh-token').val(result.refresh_token);
    })
    function
};
/*
var start = function() {
    var data = {};
    data.accesstoken = actoken;
    $.ajax({
        url: 'http://localhost:3000/account/me',
        type: 'POST',
        data: JSON.stringify(data),
        dataType: 'application/json',
        timeout: 10000,
        success: function(data, textstatus, xhr) {
            if (xhr.status === 201) {
               var html = document.getElementById("dangnhap").innerHTML;
                $('#dangnhapabc').html(html);
                
            }
            if (xhr.status === 204) {
                alert('đã đăng nhập');

            }
        }
    });

}
*/