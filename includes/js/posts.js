var app = angular.module('myApp.posts',[

]);

var Post = Parse.Object.extend('Post');
var Comment = Parse.Object.extend('Comment');


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

        if(file_element.files.length > 0){
            var file = file_element.files[0];
            var newFile = new Parse.File(file_name, file);
            newFile.save({
                success: function(){

                },
                error: function(file, error){
                    console.log('File upload error: ' + error.message);
                }
            }).then(function(theFile){
                newPost.set('file', theFile);
                newPost.save({
                    success: function(){
                        get_posts($scope);
                    },
                    error: function(error){
                        console.log('Post save with file error: ' + error.message);
                    }
                });
            });
        }
        else{
            newPost.save({
                success: function(){

                },
                error: function(error){
                    console.log('Post error: ' + error.message);
                }
            });
        }
    };

    $('#list-posts').on('click', 'a', function(event){
        event.preventDefault();
        var id = $(this).attr('href');
        var index = $(this).parent().parent().index();
        var query = new Parse.Query(Post);
        query.include('user'); // include the user object
        query.equalTo('objectId', id);
        query.find({
            success: function(results){
                var content = results[0].get('content');
                var user = results[0].get('user'); // entire user object
                var author = user.get('username');
                var src = '';
                if(results[0].get('file')){
                    var file = results[0].get('file');
                    src = file.url();
                }
                var $li = $('#list-posts li:eq('+index+')');
                $li.find('small').html(author).css('display', 'block');
                $li.find('.post-content').html(content).css('display', 'block');
                $li.find('img').attr('src', src).css('display', 'block');
                $li.find('#post-comment-form').css('display', 'block');
            },
            error: function(error){
                console.log(error.message);
            }
        });
    });

    $scope.submit_comment = function(post_id){
        var user = Parse.User.current();
        var post = new Post({id:post_id});
        var newComment = new Comment();
        var content = $('#post-comment').val();
        newComment.set('user', user);
        newComment.set('post', post);
        newComment.set('content', content);
        newComment.save({
            success: function(obj){
                console.log('Comment saved');
            },
            error: function(obj, error){
                console.log(error.message);
            }
        });

    };

}]);

function get_posts($scope){
    var query = new Parse.Query(Post);
    var posts = [];
    query.find({
        success: function(results){
            for(var i in results){
                var id = results[i].id;
                var title = results[i].get('title');
                posts.push({title: title, id: id});
            }
            $scope.posts = posts;
            $scope.$apply();

        },
        error: function(error){
            console.log('Query error: ' + error.message);
        }
    });
}