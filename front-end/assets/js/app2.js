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
    var ID = $('#IDCD').val();
    var data = {};
    data.IDCD = ID;
    data.TOADON = $('#TOADON').val();
    data.TOADOW = $('#TOADOW').val();
    data.REVERGEOCODING = $('#REVERCODING').val();
    data.STATED = "đã cập nhật";

    $.ajax({
        url: 'http://localhost:3000/datxe/updatetoado',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        timeout: 10000,
        success: function(data) {

            alert('update thanh cong');
            
            $('a').each(function(index) {
                if ($(this).attr('id') === ID) {
                    $(this).css('display', 'none');
                }
            })
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
                //var h=$('#appcd').html();
                $('#appcd').html(html);
            })
        }
    });
}