function login() {
    var data = {};
    var o;
    data.USERNAME = $('#fusername').val();
    data.PASSWORD = $('#fpassword').val();
    data.LOAI=4;

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
        user1 = result.user;
        /*
        $('#access-token').val(result.access_token);
        $('#refresh-token').val(result.refresh_token);
        $('#authtoken').val(result.auth);
        $('#usertoken').val(JSON.stringify(result.user));
        $('#daidien').val(user1.HOTEN);
        */

        
        window.localStorage.setItem('refresh', result.refresh_token);
        console.log(window.localStorage.getItem('refresh'));
        var data1={};
        data1.refeshToken=window.localStorage.getItem('refresh');
        var fn = function() {

            $.ajax({
                url: 'http://localhost:3000/newtoken/createtoken',
                type: 'POST',
                data: JSON.stringify(data1),
                contentType: 'application/json',
                timeout: 10000,
                success: function(data, textstatus, xhr) {
                    // alert(xhr.status);
                }
            }).done(function(data) {
                window.localStorage.setItem('actoken', data.access_token);
                console.log(window.localStorage.getItem('actoken'));
            })
            .catch(function(err){
                console.log(err);
            });

            setTimeout(fn, 2000);
        }
        fn();
        alert('login thành công');


    })

};

function doigiaodien() {
    document.getElementById('chuadangnhap').style.display = 'none';

}