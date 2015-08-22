var app = angular.module('myApp.logout', [

]);

app.controller('logout', ['$scope', function($scope){
    $('#logout').click(function(){
        Parse.User.logOut();
        check_login();
    });

}]);