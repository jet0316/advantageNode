var angular = angular.module('angular', ['ngResource', 'ngRoute']);

angular.config(function($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl : '/templates/quotes',
				controller  : 'quote'
			})
});

angular.factory('quoteFactory', function($resource){
	var model = $resource('/api/quotes/:id', {id : '@_id'})

	return {
		model  : model,
		quotes : model.query()
	}
});

angular.controller('quote', function($scope, quoteFactory){

});