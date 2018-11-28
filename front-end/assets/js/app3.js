$(document).ready(function() {
	

	if(window.localStorage.getItem('user3')){

			var html=`<span class="glyphicon glyphicon-user " aria-hidden="true" >`+window.localStorage.getItem('user3')+`</span>
			<button id="btnDangXuat" type="button" class="btn btn-success">Đăng xuất</button>`;
            	$('.accountControl').html(html);
            	$('#homePageTitle').html('');
	}
	else{
		
		var html=`<span >
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
	}
	
    var h = screen.height - 150 + 'px';
    $(".navbar-left").css('height', h);

    $(document).on('click', '#btnDangKi', function() {
        $('.modaFormBackground').css('display', 'block');
        $('#dangKiForm form')[0].reset();
    });

    $(document).on('click', '.modaFormBackground', function() {
        $(".modaFormBackground").css({ "display": "none" });
    });

    $("#dangKiForm").click(function(e) {
        e.stopPropagation();
    });

    $(document).on('click', '#btnDangXuat', function() {
		window.localStorage.removeItem('user3');
		window.localStorage.removeItem('refresh3');
		window.localStorage.removeItem('actoken3');

		var html=`<span >
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
    });

    $(document).on('click', '#btnDangNhap', function() {
        var data = {};
        data.USERNAME = $('input[name=accountName]').val();
        data.PASSWORD = $('input[name=accountPasssword]').val();
        data.LOAI = 4;

        $.ajax({
            url: 'http://localhost:3000/account/login',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            timeout: 10000
        }).done(function(data) {
            if (data.auth) {
            	user1=data.user;
            	var html=`<span class="glyphicon glyphicon-user " aria-hidden="true" >`+data.user.USERNAME+` </span>
			<button id="btnDangXuat" type="button" class="btn btn-success">Đăng xuất</button>`;
            	$('.accountControl').html(html);
            	$('#homePageTitle').html('');

                window.localStorage.setItem('refresh3', data.refresh_token);
                window.localStorage.setItem('user3', data.user.USERNAME);
         		 window.localStorage.setItem('actoken3', data.user.access_token);
               
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
                        .catch(function(err) {
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