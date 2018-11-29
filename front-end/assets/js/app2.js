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