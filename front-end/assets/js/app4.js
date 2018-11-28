function login() {
    var data = {};
    var o;
    data.USERNAME = $('#fusername').val();
    data.PASSWORD = $('#fpassword').val();
    data.LOAI = 4;

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
            /*
            $('#access-token').val(result.access_token);
            $('#refresh-token').val(result.refresh_token);
            $('#authtoken').val(result.auth);
            $('#usertoken').val(JSON.stringify(result.user));
            $('#daidien').val(user1.HOTEN);
            */

            $('#daidien').val(user1.HOTEN);
            window.localStorage.setItem('refresh4', result.refresh_token);

            var data1 = {};
            data1.refeshToken = window.localStorage.getItem('refresh4');
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
                        window.localStorage.setItem('actoken4', data2.access_token);

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
}

function doigiaodien() {
    document.getElementById('chuadangnhap').style.display = 'none';
    document.getElementById('dangnhaproi').style.display = 'block';
    document.getElementById('taixesd').style.display = 'block';

}
$(function() {

    if (window.localStorage.getItem('actoken4')===0) {
        document.getElementById('chuadangnhap').style.display = 'none';
    }

});

function logout() {
    window.localStorage.setItem('actoken4', '0');
    document.getElementById('chuadangnhap').style.display = 'block';
    document.getElementById('dangnhaproi').style.display = 'none';
        document.getElementById('taixesd').style.display = 'none';
}