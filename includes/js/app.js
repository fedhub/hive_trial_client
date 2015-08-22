var app = angular.module('myApp',[
    'myApp.signup',
    'myApp.login',
    'myApp.logout',
    'myApp.posts'
]);

Parse.initialize("YmjyJjNGA1QcCYQQ0C479gArZzWKBEgcwBe3kt7K", "NRJGn0tlpDY2By3mRPhlGcDFb0dclEQedm993YjV");

//app.config(['$routeProvider', function($routeProvider){
//    $routeProvider
//        .when('/', {
//            //templateUrl: '../../index.html',
//            controller: 'main'
//        });
//}]);