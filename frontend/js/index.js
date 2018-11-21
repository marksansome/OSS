$(document).ready(function() {
    $('#locations-view').hide();
    $('#displays-view').show();
});

$(document).ready(function() {

    $('#locations-button').click(function() {
        $('#displays-view').hide();
        $('#displays-button').hide();
        $('#crumb1').hide();
        $('#crumb2').hide();
        $('#content-button').hide();
        $('#locations-view').show();
    });
});