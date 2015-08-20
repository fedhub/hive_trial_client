$(document).ready(function(){

    Parse.initialize("YmjyJjNGA1QcCYQQ0C479gArZzWKBEgcwBe3kt7K", "NRJGn0tlpDY2By3mRPhlGcDFb0dclEQedm993YjV");
    var Users = Parse.Object.extend('Users');

    $('#post-form').submit(function(e){
        e.preventDefault(); // prevents the refresh of the page when submitting
        var username = $('#post-username').val();
        var password = $('#post-password').val();

        var newUser = new Users();
        newUser.set('username', username);
        newUser.set('password', password);
        newUser.save({
            success: function(){

            },
            error: function(error){
                console.log('Error: ' + error.message);
            }
        });
    });

    //var Users = Parse.Object.extend("Users");
    //var newUser = new Users();
    //newUser.set('username', 'daniellesw');
    //newUser.set('password', '1234');
    //newUser.save({
    //    success: function(){
    //
    //    },
    //    error: function(error){
    //        console.log('Error: ' + error.message);
    //    }
    //});


    //testObject.save({foo: "bar"}, {
    //    success: function(object) {
    //        $(".success").show();
    //    },
    //    error: function(model, error) {
    //        $(".error").show();
    //    }
    //});

});