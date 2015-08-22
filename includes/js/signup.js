var app = angular.module('myApp.signup', [

]);

app.controller('signup', ['$scope', function($scope){

    $scope.signup_form = function() {
        var username = $('#username').val();
        var password = $('#password').val();
        var user = new Parse.User();
        user.set('username', username);
        user.set('password', password);
        user.signUp(null, {
            success: function () {
            },
            error: function (error) {
                console.log('SignUp error: ' + error.message);
            }
        });
    };

}]);