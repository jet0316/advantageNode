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
			controller  : 'user',
			resolve     : {
				'auth'  : function($rootScope){
					if($rootScope.user){
						return true
					}
					else{
						$location.path('/')
					}
				}
			}
		})
		.when('/quotes', {
			templateUrl : '/templates/quotes',
			controller  : 'quotes',
			resolve     : {
				'auth'	: function($rootScope){
					if($rootScope.user){
						return true
					}
					else{
						$location.path('/')
					}
				}
			}
		})
		.when('/admin/:adminName', {
			templateUrl : '/templates/admin',
			controller  : 'admin',
			resolve     : {
				'auth'  : function($rootScope){
					if($rootScope.user.admin){
						return true
					}
					else{
						$location.path('/')
					}
				}
			}
		})
		.otherwise({
			redirectTo: '/'
		})
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

				console.log($rootScope, 'profile')
				
				if(response.data.admin){
					$location.path('/admin/' + response.data.username)
				}
				else if(response.data.password){
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
				$location.path('/user/' + response.data.username)
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
		$rootScope.user = response.data
		$scope.user = $rootScope.user 	
	})
});


master.controller('navbar', function($scope, $http, $rootScope){
	$http.get('/api/user').then(function(response){
		$rootScope.user = response.data
		$rootScope.$on('$stateChangeSuccess', function(){
			$scope.user = $rootScope.user 
			
		})
		// $scope.$apply(function(){

		// })
	})
});


master.factory('orderFactory', function($http, $resource){
	var model = $resource('/api/getUserOrder')
	

	return {
		model   : model,
		users 	: model.get()
	}
});

master.controller('quotes', function($scope, $http, orderFactory){

	$scope.options = [{name : 1, val : 1}, 
			{name : 2, 
				val : 2
			},
			{
				name : 3, 
				val : 3
			},
			{
				name : 4, 
				val : 4
			},
			{
				name : 5, 
				val : 5
			},
			{
				name : 6, 
				val : 6
			},
			{
				name : 7, 
				val : 7
			},
		]
	$scope.locations = 1

	// $scope.colorNumber = [
	// 		{
	// 			name : 1, 
	// 			val : 1
	// 		}, 
	// 		{
	// 			name : 2, 
	// 			val : 2
	// 		},
	// 		{
	// 			name : 3, 
	// 			val : 3
	// 		},
	// 		{
	// 			name : 4, 
	// 			val : 4
	// 		},
	// 		{
	// 			name : 5, 
	// 			val : 5
	// 		},
	// 		{
	// 			name : 6, 
	// 			val : 6
	// 		},
	// 		{
	// 			name : 7, 
	// 			val : 7
	// 		},
	// 	]
	// $scope.colors = 1

	// $scope.locationName = [
	// 		{
	// 			name : 1, 
	// 			val : 1
	// 		}, 
	// 		{
	// 			name : 2, 
	// 			val : 2
	// 		},
	// 		{
	// 			name : 3, 
	// 			val : 3
	// 		},
	// 		{
	// 			name : 4, 
	// 			val : 4
	// 		},
	// 		{
	// 			name : 5, 
	// 			val : 5
	// 		},
	// 		{
	// 			name : 6, 
	// 			val : 6
	// 		},
	// 		{
	// 			name : 7, 
	// 			val : 7
	// 		},
		// ]
	// $scope.print = 1


	// $http.get('/api/getUserOrder').then(function(response){
	// 	scope.order = response.data
	// });

	// var newCryptAnimal = new orderFactory.model(this.newAnimal);


	$scope.dataID = function(){

		$scope.locationId++
		// $scope.locationId = 0
		console.log($scope.locationId)
	}
});

master.controller('layout', function($scope, $http){

	$scope.newOrder = function(){
		$http.get('/api/user').then(function(response){
			$scope.user = response.data
			console.log(response.data, 'layout')
	})

	}
});

master.controller('admin', function($scope, $http){

});









