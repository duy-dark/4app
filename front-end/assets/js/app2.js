$(function() {
    
    $.ajax({
        url: 'http://localhost:3000/datxe',
        type: 'GET',
        dataType: 'json',
        timeout: 10000
    }).done(function(data) {
        // console.log(data);
        var source = document.getElementById("list-dscd").innerHTML;
        var template = Handlebars.compile(source);
        var html = template(data);
        $('#appcd').html(html);
    })
});
function updateaddress() {
    var data={};
    data.IDCD=$('#IDCD').val();
    data.TOADON=$('#TOADON').val();
    data.TOADOW=$('#TOADOW').val();
    
    
    $.ajax({
        url: 'http://localhost:3000/datxe/updatetoado',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        timeout: 10000,
        success: function(data) {
            console.log(data)
            alert('update thanh cong');
        }
    });
    
}