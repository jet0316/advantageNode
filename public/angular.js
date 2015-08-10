var angular = angular.module('angular', ['ngResource', 'ngRoute']);

angular.config(function($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl : '/templates/quotes',
				controller  : 'quote'
			})
});

angular.factory('quoteFactory', function($resource){
	var model = $resource('/api/')
})