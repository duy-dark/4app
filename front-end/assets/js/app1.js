$(document).ready(function() {



    if (window.localStorage.getItem('user1')) {

        var html = `<span class="glyphicon glyphicon-user " aria-hidden="true" >` + window.localStorage.getItem('user1') + `</span>
            <button id="btnDangXuat" type="button" class="btn btn-success">Đăng xuất</button>`;
        $('.accountControl').html(html);
        $('#requestReceiverContent').css('display', 'block');
        var dataTemp = {};
        var fn = function() {
            if (window.localStorage.getItem('user1')) {
                dataTemp.refeshToken = window.localStorage.getItem('refresh1');
                $.ajax({
                        url: 'http://localhost:3000/newtoken/createtoken',
                        type: 'POST',
                        data: JSON.stringify(dataTemp),
                        contentType: 'application/json',
                        timeout: 10000,
                    }).done(function(data2) {

                        window.localStorage.setItem('actoken1', data2.access_token);

                    })
                    .fail(function(err) {
                        console.log(err);
                    });
            }
            setTimeout(fn, 2000);
        }
        fn();

    } else {

        var html = `<span >
                User Name:
                <input type="text" name="accountName">
            </span>
            <span>
                Password:
                <input type="password" name="accountPasssword">
            </span>
             
            
             <button id="btnDangNhap" type="button" class="btn btn-success">Đăng nhập</button>
             <button id="btnDangKi" type="button" class="btn btn-primary">Tạo tài khoản</button>`;
        $('.accountControl').html(html);
        $('#requestReceiverContent').css('display', 'none');

    }




    $(document).on('click', '#btnDangKi', function() {
        $('.modaFormBackground').css('display', 'block');
        $('#dangKiForm form')[0].reset();
        $('#alertDki').html('');
    });

    $(document).on('click', '.modaFormBackground', function() {
        $(".modaFormBackground").css({ "display": "none" });
    });

    $("#dangKiForm").click(function(e) {
        e.stopPropagation();
    });

    $("#dangKiForm form").submit(function(event) {
        event.preventDefault();
        var userNameDk = $("#dangKiForm form input[name=fuserNameDk]").val();
        var passwordDk = $("#dangKiForm form input[name=fpasswordDk]").val();
        var postData = {
            USERNAME: userNameDk,
            PASSWORD: passwordDk,
            LOAI: 1
        };
        $.ajax({
            url: 'http://localhost:3000/account/register',
            type: 'POST',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            timeout: 10000
        }).done(data => {
            if (data.added) {
                $(".modaFormBackground").click();
                alert('Tạo tài khoản thành công !');

            } else {
                $('#alertDki').html('Tài khoản đã tồn tại !');
            }
        }).fail(err => {
            $('#alertDki').html('Tài khoản đã tồn tại !');
        })


    });

    $(document).on('click', '#btnDangXuat', function() {

        window.localStorage.removeItem('user1');
        window.localStorage.removeItem('refresh1');
        window.localStorage.removeItem('actoken1');
        isSelecting = false;

        var html = `<span >
                User Name:
                <input type="text" name="accountName">
            </span>
            <span>
                Password:
                <input type="password" name="accountPasssword">
            </span>
             
            
             <button id="btnDangNhap" type="button" class="btn btn-success">Đăng nhập</button>
             <button id="btnDangKi" type="button" class="btn btn-primary">Tạo tài khoản</button>`;
        $('.accountControl').html(html);
        $('#requestReceiverContent').css("display", "none");




    });

    $(document).on('click', '#btnDangNhap', function() {
        var data = {};
        data.USERNAME = $('input[name=accountName]').val();
        data.PASSWORD = $('input[name=accountPasssword]').val();
        data.LOAI = 1;

        $.ajax({
            url: 'http://localhost:3000/account/login',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            timeout: 10000
        }).done(function(data) {
            if (data.auth) {

                user1 = data.user;
                var html = `<span class="glyphicon glyphicon-user " aria-hidden="true" >` + data.user.USERNAME + ` </span>
            <button id="btnDangXuat" type="button" class="btn btn-success">Đăng xuất</button>`;
                $('.accountControl').html(html);
                $('#requestReceiverContent').css('display', 'block');

                window.localStorage.setItem('refresh1', data.refresh_token);
                window.localStorage.setItem('user1', data.user.USERNAME);
                window.localStorage.setItem('actoken1', data.access_token);

                var dataTemp = {};
                var fn = function() {
                    if (window.localStorage.getItem('user1')) {
                        dataTemp.refeshToken = window.localStorage.getItem('refresh1');
                        $.ajax({
                                url: 'http://localhost:3000/newtoken/createtoken',
                                type: 'POST',
                                data: JSON.stringify(dataTemp),
                                contentType: 'application/json',
                                timeout: 10000,
                            }).done(function(data2) {

                                window.localStorage.setItem('actoken1', data2.access_token);

                            })
                            .fail(function(err) {
                                console.log(err);
                            });
                    }
                    setTimeout(fn, 2000);
                }
                fn();


            } else {
                alert('Sai tên đăng nhập hoặc mật khẩu ! ');
            }


        })



    });


    $("#requestReceiverContent form").submit(function(event) {
        event.preventDefault();
        var hoten = $('#requestReceiverContent form input[name=hoTen]').val();
        var sdt = $('#requestReceiverContent form input[name=sdt]').val();
        var diaChi = $('#requestReceiverContent form input[name=diaChi]').val();
        var gc = $('#requestReceiverContent form input[name=gc]').val();
        var dataTemp={};
        dataTemp.TENKH=hoten;
        dataTemp.SDTKH=sdt;
        dataTemp.DIEMDIKH=diaChi;
        dataTemp.GHICHUKH=gc;
        $.ajax({
                url: 'http://localhost:3000/datxe',
                type: 'POST',
                data: JSON.stringify(dataTemp),
                contentType: 'application/json',
                timeout: 10000,
            }).done(function(data2) {

                alert('Thêm request thành công');
                $('#requestReceiverContent form')[0].reset();

            })
            .fail(function(err) {
                console.log(err);
            });
    });
});