var actoken;

function saveCD() {
    var data={};
    data.TENKH=$('#TEN').val();
    data.SDTKH=$('#SDT').val();
    data.DIEMDIKH= $('#DIEMDI').val();
    data.GHICHUKH=$('#GHICHU').val();
    
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
    var data={};
    data.HOTEN=$('#hoten').val();
    data.NGAYSINH=$('#ngaysinh').val();
    data.USERNAME= $('#username').val();
    data.PASSWORD=$('#password').val();
    data.GIOITINH=$('#gioitinh').val();
    data.DIACHI=$('#diachi').val();
    
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
    var data={};
    data.USERNAME= $('#fusername').val();
    data.PASSWORD=$('#fpassword').val();
    
    //alert(JSON.stringify(data));
    
    $.ajax({
        url: 'http://localhost:3000/account/login',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        timeout: 10000,
    }).done(function(data) {
        alert(JSON.stringify(data));
        result=data;
        $('#access-token').val(result.access_token);
        $('#refresh-token').val(result.refresh_token);

    })
    
};
/*
$(function() {
     
     
    $.ajax({
        url: 'http://localhost:3000/account/me',
        type: 'GET',
        data: ,
        dataType: 'application/json',
        timeout: 10000,
        success: function(data){
            
            alert('thanh cong');
        }
    });

});
*/