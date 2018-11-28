$( document ).ready(function() {

	var h=screen.height-150+'px';
    $(".navbar-left").css('height',h);

    $(document).on('click', '#btnDangKi', function() {
   		$('.modaFormBackground').css('display','block');
   		$('#dangKiForm form')[0].reset();
	}) ;

	$(document).on('click', '.modaFormBackground', function() {
   		 $(".modaFormBackground").css({ "display": "none" });
	}) ;

	$("#dangKiForm").click(function(e){
		e.stopPropagation();
	});


	$(document).on('submit', '#formDangNhap', function() {
   		var data = {};
	   	data.USERNAME = $('input[name=accountName]').val();
	    data.PASSWORD = $('input[name=accountPasssword]').val();
	    data.LOAI=3;

	    $.ajax({
        url: 'http://localhost:3000/account/login',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        timeout: 10000
    }).done(function(data) {
        
        window.localStorage.setItem('refresh3', data.refresh_token);
        var data1={};
        data1.refeshToken=window.localStorage.getItem('refresh3');
        var fn = function() {

            $.ajax({
                url: 'http://localhost:3000/newtoken/createtoken',
                type: 'POST',
                data: JSON.stringify(data1),
                contentType: 'application/json',
                timeout: 10000,
	            }).done(function(data2) {
	                window.localStorage.setItem('actoken', data2.access_token);
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
	}) ;
});