function login() {

    var data = {};
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

        result = data;
        if (result.auth) {
            user1 = result.user;
            $('#daidien').val(user1.HOTEN);
            window.localStorage.setItem('refresh4', result.refresh_token);
            window.localStorage.setItem('user4', user1.USERNAME);
            window.localStorage.setItem('actoken4', result.access_token);
            $('#idtx').val(user1.ID);


            var data1 = {};
            var fn = function() {
                if (window.localStorage.getItem('user4')) {
                    data1.LOAI = 4;
                    data1.refeshToken = window.localStorage.getItem('refresh4');
                    $.ajax({
                            url: 'http://localhost:3000/newtoken/createtoken',
                            type: 'POST',
                            data: JSON.stringify(data1),
                            contentType: 'application/json',
                            timeout: 15000
                        }).done(function(data2) {
                            window.localStorage.setItem('actoken4', data2.access_token);

                        })
                        .fail(function(err) {
                            console.log(err);
                        });

                    setTimeout(fn, 58000);
                }

            }
            fn();

            $('#myModal').css('display', 'none');
            document.getElementById('chuadangnhap').style.display = 'none';
            document.getElementById('dangnhaproi').style.display = 'block';
            document.getElementById('taixesd').style.display = 'block';
            document.getElementById('hotro').style.display = 'block';
        } else {
            document.getElementById('loidangnhap').style.display = 'block';
        }

    })
}
$('#btnDN').click(function() {
    $('#myModal').css('display', 'block');
    $('#myModal').css('background-color', 'rgba(0, 0, 0, 0.4)');

});
$('#btnDK').click(function() {
    $('#myModal1').css('display', 'block');
    $('#myModal1').css('background-color', 'rgba(0, 0, 0, 0.4)');

});



function regist() {
    var data = {};
    data.HOTEN = $('#hoten').val();

    data.USERNAME = $('#username').val();
    data.PASSWORD = $('#password').val();
    //alert(JSON.stringify(data));

    $.ajax({
        url: 'http://localhost:3000/account/registertx',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        timeout: 10000,
        success: function(data) {
            console.log(data)
            alert('thanh cong');
            $('#myModal1').css('display', 'none');
        }
    });

};



function logout() {
    window.localStorage.removeItem('user4');
    window.localStorage.removeItem('refresh4');
    window.localStorage.removeItem('actoken4');

    document.getElementById('chuadangnhap').style.display = 'block';
    document.getElementById('dangnhaproi').style.display = 'none';
    document.getElementById('taixesd').style.display = 'none';
    document.getElementById('hotro').style.display = 'none';
    var data = {};
    data.IDTX = $('#idtx').val();
    data.IDCD = $('#idcd').val();
    data.token = window.localStorage.getItem('actoken4');
    $.ajax({
        url: 'http://localhost:3000/datxe/logout',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        timeout: 10000
    }).done(function(data) {
        
    }).fail(function(err) {
       console.log(err);
    });
}