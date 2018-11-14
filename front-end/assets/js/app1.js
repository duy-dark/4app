function saveCD() {
    var data={};
    data.TENKH=$('#TEN').val();
    data.SDTKH=$('#SDT').val();
    data.DIEMDIKH= $('#DIEMDI').val();
    data.GHICHUKH=$('#GHICHU').val();
    
    $.ajax({
        url: 'http://localhost:3000/datxe',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        timeout: 10000,
        success: function(data) {
        	console.log(data)
            alert('thanh cong');
        }
    });
}