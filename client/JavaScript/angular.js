var master = angular.module('master', ['ngResource', 'ngRoute']);

master.config(function($routeProvider){

	$routeProvider
		.when('/', {
			templateUrl : '/templates/home',
			controller  : 'home'
		})
		.when('/login', {
			templateUrl : '/templates/login',
			controller  : 'profile'
		})
		.when('/user', {
			templateUrl : '/templates/profile',
			controller  : 'user'
		})
});

master.factory('userFactory', function($http, $resource){
	var model = $resource('/api/user/:id', {id : '@_id'})
	

	return {
		model   : model,
		users 	: model.get()
	}
});


master.controller('home', function($scope, $http, $resource){

});


master.controller('profile', function($scope, $http, $resource, $location){

	console.log($scope)
	

	$scope.login = function(){

		$http.post('/login', $scope.user)
			.then(function(response){
				console.log(response.data.password)
				if(response.data.password){
					$location.url('/user')
				}
				else{
					$location.url('/login')
				}
			})
	}

	$scope.newuser = function(){
		$http.post('/signup', $scope.newUser)
			.then(function(response){
				$location.url('/user')
			})
	}

	$scope.logout = function(){
		$http.post('/logout', $scope.newUser)
			.then(function(response){
				$location.url('/')
			})
	}

});

master.controller('user', function($scope, $http){
	$http.get('/api/user').then(function(response){
		$scope.user = response.data
	})
});










