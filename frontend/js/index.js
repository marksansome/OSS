$(document).ready(function() {
    $('#locations-view').show();
    $('#displays-view').hide();
    $('#content-view').hide();
    /*
    $('#locations-button').attr("disabled", true);
    $('#displays-button').hide();
    $('#content-button').hide();

    $('#crumb1').hide();
    $('#crumb2').hide();
    */
});

$(document).ready(function() {

    $('#locations-button').click(function() {
        $('#locations-view').show();
        $('#displays-view').hide();
        $('#content-view').hide();

        $('#locations-button').attr("disabled", true);
        $('#displays-button').hide();
        $('#content-button').hide();
        $('#crumb1').hide();
        $('#crumb2').hide();
        
    });

    $('#displays-button').click(function() {
        $('#locations-view').hide();
        $('#displays-view').show();

        $('#content-button').hide();
        $('#displays-button').attr("disabled", true);
        $('#crumb1').show();
        $('#crumb2').hide();
    });
});