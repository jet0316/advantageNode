var master = angular.module('master', ['ngResource', 'ngRoute']);

master.config(function($routeProvider){

	$routeProvider
		.when('/', {
			templateUrl : '/templates/home',
			controller  : 'home'
		})
		.when('/login', {
			templateUrl : '/templates/login',
			controller  : 'login'
		})
		.when('/user/:profileID', {
			templateUrl : '/templates/profile',
			controller  : 'user',
			resolve     : {
				message : function($rootScope, $location){
					if($rootScope.user.email){
						return true
					}
					else{
						alert('User not in database')
						$location.path('/login')
					}
				}
			}
		})
		.when('/quotes', {
			templateUrl : '/templates/quotes',
			controller  : 'quotes',
			resolve     : {
				message	: function($rootScope, $location){
					if($rootScope.user.email){
						return true
					}
					else{
						$location.path('/login')
					}
				}
			}
		})
		.when('/admin/:adminName', {
			templateUrl : '/templates/admin',
			controller  : 'admin',
			resolve     : {
				message : function($rootScope, $location){
					if($rootScope.user.admin){
						return true
					}
					else{
						$location.path('/login')
					}
				}
			}
		})
		.when('/cart', {
			templateUrl : '/templates/cart',
			controller  : 'cart',
			resolve     : {
				message : function($rootScope, $location){
					if($rootScope.user.password){
						return true
					}
					else{
						$location.path('/login')
					}
				}
			}
		})
		.when('/contact', {
			templateUrl : '/templates/contact',
			controller  : 'home'

		})
		.otherwise({
			redirectTo: '/'
		})
});


master.controller('login', function($scope, $http, $resource, $rootScope, $location){
	console.log('loc', $location)	
	$scope.user = $rootScope.user
	$scope.login = function(){

		$http.post('/login', $scope.user)
			.then(function(response){
				

				$rootScope.user = response.data
				$scope.user = response.data

				
				
				if(response.data.admin){
					$location.url('/admin/' + response.data.username)
				}
				else if(response.data.password){
					$location.url('/user/' + response.data.username)
				}
				else{
					alert('User does not exist')
					$location.url('/login')
				}
			})
	}

	$scope.newuser = function(){
		$http.post('/signup', $scope.newUser)
			.then(function(response){
				if(response){
					$rootScope.user = response.data
					$location.url('/user/' + response.data.username)
				}
				else{
					alert('This user already exists')
				}
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
	$scope.user = $rootScope.user

	$http.get('/api/getHomeOrder?id=' + $rootScope.user._id).then(function(response){
		console.log(response)
		$scope.orders = response.data
	})

	$scope.deleteOrder = function(order, index){

		console.log(order)
		$http.delete('/api/delete/'+ order._id).then(function(response){
			$scope.orders = response.data
		})
	}

});


master.controller('navbar', function($scope, $http, $rootScope){
	$http.get('/api/user').then(function(response){
		$rootScope.user = response.data
		$rootScope.$on('$stateChangeSuccess', function(){
			$scope.user = $rootScope.user 
			
		})
	})
});


master.factory('orderFactory', function($http, $resource){
	var model = $resource('/api/user')
	

	return {
		model   : model,
		users 	: model.get()
	}
});

master.controller('quotes', function($scope, $location, $rootScope, $http, orderFactory){

	$scope.options = [{name : 1, val : 1}, 
					{name : 2, val : 2},
					{name : 3, val : 3},
					{name : 4, val : 4},
					{name : 5, val : 5},
					{name : 6, val : 6},
					{name : 7, val : 7},
					]
	$scope.locations = 1

	$scope.colorNumber = [{name : 1, val : 1}, 
						{name : 2, val : 2},
						{name : 3, val : 3},
						{name : 4, val : 4},
						{name : 5, val : 5},
						{name : 6, val : 6},
						{name : 7, val : 7},
						{name : 8, val : 8},
						{name : 9, val : 9},
						{name : 10, val : 10},
						]
	$scope.colors = 1

	$scope.locationName = [{name : 'Front'}, 
						{name : 'Back'},
						{name : 'Left Chest'},
						{name : 'Right Chest'},
						{name : 'Left Sleeve'},
						{name : 'Right Sleeve'},
						{name : 'Back Tag'},
						{name : 'Right Thigh'},
						{name : 'Left Thigh'},
						]

	
	
	$scope.shirtStyle = [{name : 'T-Shirts'},
						{name : 'Long Sleeve T-Shirts'},
						{name : 'Hoodies'},
						{name : 'Polos'},
						{name : 'Shorts'},
						{name : 'Sweats'},
						]

	$scope.locationList = [{},{},{},{},{},{},{}]


	$scope.newQuote = function(){
		$scope.locationArr = []
		$scope.locationList.forEach(function(element){
			if(element.colors){
				$scope.locationArr.push(element)
				// console.log($scope.locationArr)
			}
		})

		$scope.quote.locations = $scope.locationArr
		$http.post('/api/quote', $scope.quote).then(function(response){
			$scope.returnQuote = response.data
			console.log(response.data)
		})
		$scope.quote = {}
		$scope.locationList = [{},{},{},{},{},{},{}]
		$scope.colors = 1
		$scope.locations = 1

	}

	$scope.newOrder = function(){
			$scope.returnQuote.date = moment().format('MMM DD YYYY')

		$http.post('/api/newOrder', $scope.returnQuote)
		.then(function(response){
			

			$rootScope.orderId = response.data._id
			console.log(response)
			$location.path('/cart')
		})
		console.log('hello?', $scope.returnQuote)
	}

});

master.controller('admin', function($scope, $http){
	$http.get('/api/getOrder').
		then(function(response){
            $scope.orders = response.data.reverse();
	})	
	$scope.deleteMasterOrder = function(order, index){

		console.log(order)
		$http.delete('/api/deletemaster/'+ order._id).then(function(response){
			$scope.orders = response.data
		})
	}
});

master.controller('cart', function($scope, $http, $resource, $rootScope){
	console.log($rootScope.orderId)
	$http.get('/api/getUserOrder?id=' + $rootScope.orderId).then(function(response){
		$scope.order = response.data
		console.log(response.data)
	})

});

master.controller('home', function($scope, $rootScope){
	$scope.user = $rootScope.user
});








