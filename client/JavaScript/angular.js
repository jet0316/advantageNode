var master = angular.module('master', ['ngResource', 'ngRoute']);

master.config(function($routeProvider){

	$routeProvider
		.when('/', {
			templateUrl : '/templates/home',
			controller  : 'profile'
		})

	$routeProvider
		.when('/login', {
			templateUrl : '/templates/login',
			controller  : 'profile'
		})

	$routeProvider
		.when('/user', {
			templateUrl : '/templates/profile',
			controller  : 'profile'
		})
});

master.factory('userFactory', function($http, $resource){
	var model = $resource('/api/user/:id', {id : '@_id'})
	// var user = $http.get('/api/user')

	return {
		model  : model,
		users 	: model.get()
	}
});

master.controller('profile', function($scope, userFactory){
	$scope.user = userFactory.users

	$scope.newuser = function(){
		var newProfile = new userFactory.model(this.newUser);

		newProfile.$save()
	}

});
