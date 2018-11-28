$(document).ready(function() {
    var html2 = ` <ul class="title">
                                <li class="tgd">Thời điểm đặt</li>
                                <li class="id">ID CD</li>
                                <li class="hoTen">Họ tên KH</li>
                                <li class="sdt"> SĐT KH</li>
                                <li class="diaChi">Điểm đón khách</li>
                                <li class="gc">Ghi chú</li>
                                <li class="state">State Request</li>
                                <li class="state">State CĐ</li>
                                <li class="id">ID TX</li>
                                <li class="hoTen">Họ tên TX</li>
                                <li class="sdt">SĐT TX</li>
                                <li class="vt">Xem đường đi ngắn nhất</li>
                            </ul>`;

    if (window.localStorage.getItem('user3')) {

        var html = `<span class="glyphicon glyphicon-user " aria-hidden="true" >` + window.localStorage.getItem('user3') + `</span>
            <button id="btnDangXuat" type="button" class="btn btn-success">Đăng xuất</button>`;
        $('.accountControl').html(html);
        $('#homePageTitle').html('');
        $('#requestManageContent').html(html2);
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
        $('#homePageTitle').html('REQUEST MANANGEMENT APP');
        $('#requestManageContent').html('');

    }

    var loadAllRequest = function() {
        console.log(window.localStorage.getItem('actoken3'));
        console.log(window.localStorage.getItem('user3'));
        console.log(window.localStorage.getItem('refresh3'));
        var tempActoken=window.localStorage.getItem('actoken3');
        $.ajax({
            url: 'http://localhost:3000/requestManage',
            headers:{
                'x-access-token':'vk',
                'Content-Type':'application/json'
            },
            type: 'GET',
            dataType: 'json',
            timeout: 60000
        }).done(function(data2) {
            var source = document.getElementById("template").innerHTML;
            var template = Handlebars.compile(source);
            var buffer=[];

            var html = template(data2.data);

            var temp = $("#requestManageContent").html();
            $("#requestManageContent").html(temp + html);
           // loadAllRequest();
           
           
        }).fail(err => {
            //loadAllRequest();
          
        });
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
            LOAI: 3
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
        window.localStorage.removeItem('user3');
        window.localStorage.removeItem('refresh3');
        window.localStorage.removeItem('actoken3');

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
        $('#homePageTitle').html('REQUEST MANANGEMENT APP');
        $('#requestManageContent').html('');

    });

    $(document).on('click', '#btnDangNhap', function() {
        var data = {};
        data.USERNAME = $('input[name=accountName]').val();
        data.PASSWORD = $('input[name=accountPasssword]').val();
        data.LOAI = 3;

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
                $('#homePageTitle').html('');
                $('#requestManageContent').html(html2);

                window.localStorage.setItem('refresh3', data.refresh_token);
                window.localStorage.setItem('user3', data.user.USERNAME);
                window.localStorage.setItem('actoken3', data.access_token);
                
                loadAllRequest();
                var data1 = {};
                data1.refeshToken = window.localStorage.getItem('refresh3');
                var fn = function() {

                    $.ajax({
                            url: 'http://localhost:3000/newtoken/createtoken',
                            type: 'POST',
                            data: JSON.stringify(data1),
                            contentType: 'application/json',
                            timeout: 10000,
                        }).done(function(data2) {
                        
                            window.localStorage.setItem('actoken3', data2.access_token);

                        })
                        .fail(function(err) {
                            console.log(err);
                        });

                    setTimeout(fn, 58000);
                }
                fn();

            } else {
                alert('Sai tên đăng nhập hoặc mật khẩu ! ');
            }


        })



    });
});