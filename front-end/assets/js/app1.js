

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
    data.LOAI=1;

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
    data.LOAI=1;
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
        
        if (result.auth) {
            user1 = result.user;
            

            $('#daidien').val(user1.HOTEN);
            window.localStorage.setItem('refresh1', result.refresh_token);

            var data1 = {};
            data1.refeshToken = window.localStorage.getItem('refresh1');
            var fn = function() {

                $.ajax({
                        url: 'http://localhost:3000/newtoken/createtoken',
                        type: 'POST',
                        data: JSON.stringify(data1),
                        contentType: 'application/json',
                        timeout: 10000,
                        success: function(data2, textstatus, xhr) {
                            // alert(xhr.status);
                        }
                    }).done(function(data2) {
                        window.localStorage.setItem('actoken1', data2.access_token);

                    })
                    .catch(function(err) {
                        console.log(err);
                    });

                setTimeout(fn, 58000);
            }
            fn();
            alert('login thành công');

        } else {
            document.getElementById('loidangnhap').style.display = 'block';
        }

    })

};

function logout() {
    window.localStorage.setItem('actoken1', '0');
    document.getElementById('dangnhap123').style.display = 'block';
    document.getElementById('dangnhaproi').style.display = 'none';
    document.getElementById('dowork').style.display = 'none';
}

function doigiaodien() {
    document.getElementById('dangnhap123').style.display = 'none';
    document.getElementById('dangnhaproi').style.display = 'block';
    document.getElementById('dowork').style.display = 'block';
    

}
$(function() {

    if (window.localStorage.getItem('actoken1')===0) {
        document.getElementById('dangnhap123').style.display = 'none';
    }

});
