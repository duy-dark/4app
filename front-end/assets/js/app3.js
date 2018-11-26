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
});