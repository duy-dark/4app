var t;

function fn() {
    $.ajax({
        url: 'http://localhost:3000/datxe',
        type: 'GET',
        dataType: 'application/json',
        timeout: 15000,
        success: function(data1, textstatus1, xhr1) {

            if (xhr1.status === 201) {
                var source = document.getElementById("list-dscd").innerHTML;
                var template = Handlebars.compile(source);
                var html = template(data1);
                $('#appcd').html(html);
                $('#statuscv').val('busy');

            }
        }
    }).done(function(data) {
        setTimeout(fn, 15000);
        alert(JSON.stringify(data));
    }).catch(function(err) {
        console.log(err);
    });
}
$(function() {

    fn();
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
function login() {
    var data = {};
    data.USERNAME = $('#fusername').val();
    data.PASSWORD = $('#fpassword').val();
    data.LOAI=2;
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
            window.localStorage.setItem('refresh2', result.refresh_token);

            var data1 = {};
            data1.refeshToken = window.localStorage.getItem('refresh2');
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
                        window.localStorage.setItem('actoken2', data2.access_token);

                    })
                    .catch(function(err) {
                        console.log(err);
                    });

                setTimeout(fn, 58000);
            }
            fn();
            alert('login thành công');
            $('.content').css('display','block');

        } else {
            document.getElementById('loidangnhap').style.display = 'block';
        }

    })

};
function regist() {
    var data = {};
    data.HOTEN = $('#hoten').val();
    data.NGAYSINH = $('#ngaysinh').val();
    data.USERNAME = $('#username').val();
    data.PASSWORD = $('#password').val();
    data.GIOITINH = $('#gioitinh').val();
    data.DIACHI = $('#diachi').val();
    data.LOAI=2;

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