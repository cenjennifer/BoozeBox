app.config(function ($stateProvider) {
    $stateProvider.state('plans', {
        url: '/plans',
        controller: 'PlansController',
        templateUrl: 'js/plans/plans.html'
    });
});


app.controller('PlansController', function($scope, PlansFactory) {
	PlansFactory.fetchAll()
	.then(function(response) {
		console.log("data", response.data);
		$scope.plans = response.data;
	})
	.catch(function(err) {
		console.error(err);
	});
});

app.factory('PlansFactory', function($http) {
	return {
		fetchAll: function() {
			return $http.get('/api/plans');
		}
	};
});