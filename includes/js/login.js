var app = angular.module('myApp.login', [

]);

app.controller('login', ['$scope', function($scope){

    $scope.login_form = function(){
        var username = $('#login-user').val();
        var password = $('#login-pass').val();
        Parse.User.logIn(username, password, {
            success: function(user){
                check_login();
            },
            error: function(user, error){
                console.log('Log-In error: ' + error.message)
            }
        });
    };

}]);