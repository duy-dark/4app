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