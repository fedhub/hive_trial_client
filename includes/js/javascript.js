$(document).ready(function(){

    check_login();

});

function check_login(){
    if(Parse.User.current()){
        var username = Parse.User.current().get('username');
        $('#current-user').html('User: ' + username);
    }
    else{
        $('#current-user').html('Not Logged');
    }
}

