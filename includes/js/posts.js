var app = angular.module('myApp.posts',[

]);

var Post = Parse.Object.extend('Post');

app.controller('posts', ['$scope', function($scope){

    get_posts($scope);

    $scope.post_form = function(){
        //e.preventDefault(); // prevents the refresh of the page when submitting
        var title = $('#post-title').val();
        var content = $('#post-content').val();
        var newPost = new Post();
        var user = Parse.User.current();
        newPost.set('title', title);
        newPost.set('content', content);
        newPost.set('user', user);

        // Get file from form input
        var file_element = $('#post-file')[0];
        var file_path = $('#post-file').val();
        var file_name = file_path.split("\\").pop();

        newPost.save({
            success: function(){

            },
            error: function(error){
                console.log('Error: ' + error.message);
            }
        });
    };

}]);

function get_posts($scope){
    var query = new Parse.Query(Post);
    query.include('user'); // include the user object
    var posts = [];
    query.find({
        success: function(results){
            for(var i in results){
                var title = results[i].get('title');
                var content = results[i].get('content');
                var user = results[i].get('user'); // entire user object
                var username = user.get('username');
                posts.push({title: title, content: content, username: username});
            }
            $scope.posts = posts;
            $scope.$apply();

        },
        error: function(error){
            console.log('Query error: ' + error.message);
        }
    });
}