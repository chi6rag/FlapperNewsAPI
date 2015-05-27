var flapperNews = angular.module('flapperNews', ['ui.router']);

flapperNews.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider){
	$stateProvider
	  
	  .state('home', {
	  	url: '/home',
	  	templateUrl: '/home.html',
	  	controller: 'MainCtrl'
	  })

	  .state('posts', {
	  	url: '/posts/{id}',
	  	templateUrl: '/posts.html',
	  	controller: 'PostsCtrl'
	  })

	  $urlRouterProvider.otherwise('/home');

}]);

flapperNews.controller('MainCtrl', [
	'$scope', 'posts',
	function($scope, posts){
		$scope.posts = posts.posts;
		$scope.addPost = function(){
			if($scope.title==undefined || $scope.title.match(/^\s+$/)){ return; }
			$scope.posts.push({
				title: $scope.title,
				link: $scope.link,
				upvotes: 0,
				comments: [
					{author: 'chi6rag', body: 'lorem ipsum dolor', upvotes: 0},
					{author: 'chi6rag', body: 'lorem ipsum dolor', upvotes: 0},
					{author: 'chi6rag', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', upvotes: 0}
				]
			});
			$scope.title = '';
			$scope.link = '';
		};
		$scope.incrementUpvotes = function(post){
			post.upvotes += 1
		};
}]);

flapperNews.controller('PostsCtrl', [
	'$scope', 'posts', '$stateParams',
	function($scope, posts, $stateParams){
		$scope.post = posts.posts[$stateParams.id];
		
		$scope.addComment = function(){
			console.log($scope.post.comments);
			if($scope.post == undefined
				 || $scope.commentAuthor.match(/^\s+$/)
				 || $scope.commentBody.match(/^\s+$/) ){
				return;
			};
			comment = {
				author: $scope.commentAuthor,
				body: $scope.commentBody,
				upvotes: 0
			};
			$scope.post.comments.push(comment);
			$scope.commentAuthor = "";
			$scope.commentBody = "";
		};

		$scope.incrementUpvotes = function(comment){
			comment.upvotes += 1;
		}

	}
]);

flapperNews.factory('posts', [function(){
	var output = {};
	output.posts = [
		{ title: 'First Post', upvotes: 100, link: 'https://www.example.com', comments: [] },
		{ title: 'Second Post', upvotes: 200, link: 'https://www.example.com', comments: [] },
		{ title: 'Third Post', upvotes: 300, link: 'https://www.example.com', comments: [] },
		{ title: 'Fourth Post', upvotes: 400, link: 'https://www.example.com', comments: []  },
		{ title: 'Fifth Post', upvotes: 500, link: 'https://www.example.com', comments: []  }
  ];
  return output;
}]);