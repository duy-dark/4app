$(document).ready(function() {
    var titleHtml = `<ul class="title">
                        <li class="id">ID CD</li>
                        <li class="hoTen">Họ tên KH</li>
                        <li class="sdt"> SĐT KH</li>
                        <li class="diaChi">Điểm đón khách</li>
                        <li class="state">State Request</li>
                    </ul>`;
    var getNewRequest = function() {
        if (window.localStorage.getItem('user2')) {
            var postData = {};
            postData.token = window.localStorage.getItem('actoken3');
            $.ajax({
                url: 'http://localhost:3000/datxe/getNewRequest',
                type: 'POST',
                data: JSON.stringify(postData),
                contentType: 'application/json',
                timeout: 60000
            }).done(function(data2) {

                var proData = data2.data;
                console.log(proData);
                if (proData) {
                    var html = ` <ul id="` + proData.IDCD + `">
                                    <li class="id">` + proData.IDCD + `</li>
                                    <li class="hoTen">` + proData.HOTENKH + `</li>
                                    <li class="sdt">` + proData.SDT + `</li>
                                    <li class="diaChi">` + proData.DIEMDI + `</li>
                                    <li class="state">` + proData.STATEREQUEST + `</li>
                                     <li class="toaDoN" style="display:none;">` + proData.TOADON + `</li>
                                      <li class="toaDoW" style="display:none;">` + proData.TOADOW + `</li>
                                </ul>`;
                    if (window.localStorage.getItem('content')) {
                        window.localStorage.setItem('content', html + window.localStorage.getItem('content'));

                    } else {
                        window.localStorage.setItem('content', html);
                    }
                    $('#container').html(titleHtml + window.localStorage.getItem('content'));
                    window.localStorage.setItem('processingID', proData.IDCD);
                    window.localStorage.setItem('isProcessed', false);

                } else {
                    setTimeout(getNewRequest, 1000);
                }
            }).fail(err => {


            });
        }
    }

    if (window.localStorage.getItem('user2')) {

        var html = `<span class="glyphicon glyphicon-user " aria-hidden="true" >` + window.localStorage.getItem('user2') + `</span>
            <button id="btnDangXuat" type="button" class="btn btn-success">Đăng xuất</button>`;
        $('.accountControl').html(html);
        $('#locateAppContent').css('display', 'block');
        if (window.localStorage.getItem('content')) {
            $('#container').html(titleHtml + window.localStorage.getItem('content'));

        } else {
            $('#container').html( window.localStorage.getItem('content'));
        }
        
        var dataTemp = {};
        var fn = function() {
            if (window.localStorage.getItem('user2')) {
                dataTemp.refeshToken = window.localStorage.getItem('refresh2');
                $.ajax({
                        url: 'http://localhost:3000/newtoken/createtoken',
                        type: 'POST',
                        data: JSON.stringify(dataTemp),
                        contentType: 'application/json',
                        timeout: 10000,
                    }).done(function(data2) {

                        window.localStorage.setItem('actoken2', data2.access_token);

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
        $('#locateAppContent').css('display', 'none');

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
            LOAI: 2
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

        window.localStorage.removeItem('user2');
        window.localStorage.removeItem('refresh2');
        window.localStorage.removeItem('actoken2');
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
        $('#locateAppContent').css("display", "none");




    });

    $(document).on('click', '#btnDangNhap', function() {
        var data = {};
        data.USERNAME = $('input[name=accountName]').val();
        data.PASSWORD = $('input[name=accountPasssword]').val();
        data.LOAI = 2;

        $.ajax({
            url: 'http://localhost:3000/account/login',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            timeout: 10000
        }).done(function(data) {
            if (data.auth) {

                user2 = data.user;
                var html = `<span class="glyphicon glyphicon-user " aria-hidden="true" >` + data.user.USERNAME + ` </span>
            <button id="btnDangXuat" type="button" class="btn btn-success">Đăng xuất</button>`;
                $('.accountControl').html(html);
                $('#locateAppContent').css('display', 'block');
                var tempHtml = window.localStorage.getItem('content');
                $('#container').html(titleHtml + tempHtml);

                window.localStorage.setItem('refresh2', data.refresh_token);
                window.localStorage.setItem('user2', data.user.USERNAME);
                window.localStorage.setItem('actoken2', data.access_token);

                var dataTemp = {};
                var fn = function() {
                    if (window.localStorage.getItem('user2')) {
                        dataTemp.refeshToken = window.localStorage.getItem('refresh2');
                        $.ajax({
                                url: 'http://localhost:3000/newtoken/createtoken',
                                type: 'POST',
                                data: JSON.stringify(dataTemp),
                                contentType: 'application/json',
                                timeout: 10000,
                            }).done(function(data2) {

                                window.localStorage.setItem('actoken2', data2.access_token);

                            })
                            .fail(function(err) {
                                console.log(err);
                            });
                    }
                    setTimeout(fn, 2000);
                }
                fn();
                getNewRequest();
                

            } else {
                alert('Sai tên đăng nhập hoặc mật khẩu ! ');
            }


        })



    });




});

function updateaddress() {
    var ID = $('#IDCD').val();
    if (ID === undefined) {
        console.log('123');

    } else {
        console.log(ID);
    }
    var data = {};
    data.IDCD = ID;
    data.TOADON = $('#TOADON').val();
    data.TOADOW = $('#TOADOW').val();
    data.REVERGEOCODING = $('#REVERCODING').val();
    data.STATEREQUEST = "đã định vị";

    $.ajax({
        url: 'http://localhost:3000/datxe/updatetoado',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        timeout: 10000,
        success: function(data, textstatus, xhr) {
            alert(xhr.status);
            if (xhr.status === 201) {
                alert('update thanh cong');
                $('#TOADON').val("");
                $('#TOADOW').val("");
                $('#REVERCODING').val("");
                $('a').each(function(index) {
                    if ($(this).attr('id') === ID) {
                        $(this).css('display', 'none');
                    }
                })
                $.ajax({
                    url: 'http://localhost:3000/datxe',
                    type: 'GET',
                    dataType: 'application/json',
                    timeout: 10000,
                    success: function(data1, textstatus1, xhr1) {
                        alert(xhr1.status);
                        if (xhr1.status === 201) {
                            var source = document.getElementById("list-dscd").innerHTML;
                            var template = Handlebars.compile(source);
                            var html = template(data1);
                            $('#appcd').html(html);
                            $('#statuscv').val('busy');
                        }
                        if (xhr.status === 204) {
                            $('#statuscv').val('quiet');
                            alert("akjshfksahlf");
                        }
                    }
                })
            }
            if (xhr.status === 500) {
                alert("ákfhjsaf");
                fn();
            }

        }
    }).catch(function(err) {
        console.log('123214124');
    });
}