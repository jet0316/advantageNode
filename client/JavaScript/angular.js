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
		.when('/user/:profileID', {
			templateUrl : '/templates/profile',
			controller  : 'user'
		})
		.when('/quotes', {
			templateUrl : '/templates/quotes',
			controller  : 'quotes'
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


master.controller('profile', function($scope, $http, $resource, $rootScope, $location){

	
	console.log($scope)
	$scope.user = $rootScope.user
	$scope.login = function(){

		$http.post('/login', $scope.user)
			.then(function(response){
				console.log(response.data)

				$rootScope.user = response.data
				$scope.user = response.data


				
				if(response.data.password){
					$location.url('/user/' + response.data.username)
				}
				else{
					$location.url('/login')
				}
			})
	}

	$scope.newuser = function(){
		$http.post('/signup', $scope.newUser)
			.then(function(response){
				console.log(response)
				$location.url('/user/' + response.data.username)
			})
	}

	$scope.logout = function(){
		$http.post('/logout', $scope.newUser)
			.then(function(response){
				$location.url('/')
			})
	}

});

master.controller('user', function($scope, $http, $rootScope){
	$http.get('/api/user').then(function(response){
		$rootScope = response.data
		$scope.user = response.data
		console.log(response.data, 'user')
	})
});


master.controller('quotes', function($scope, $http){
});

master.controller('layout', function($scope, $http){
	$http.get('/api/user').then(function(response){
		$scope.user = response.data
		console.log(response.data, 'layout')
	})
});










