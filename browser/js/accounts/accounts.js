// State
// PARENT STATE
app.config(function($stateProvider) {
	$stateProvider.state('accounts', {
		url: '/myaccount',
		templateUrl: 'js/accounts/accounts.html',
		controller: 'AccountsController',
		params: {
			cartItems: null,
		}
	});
});

// Controller
app.controller('AccountsController', function($scope, $state, AccountsFactory) {

	// Noticed small issue:
	// 	- When go to checkout-1 page, needs to be refreshed to load
	// Now, with this fix, when going to checkout-1 page, 
	// this loads it right away
	if (Session.user) {
		$scope.user = Session.user;
		$scope.populateUser($scope.user.id);
	}

	// EXTRAS...
	// Noticed small issue:
	// 	- When refresh on checkout-1 page, lose data
	// Now, with this fix, we keep data on refresh
	$rootScope.$on(AUTH_EVENTS.loginSuccess, function(event, data) {
		$scope.user = Session.user;
		$scope.populateUser($scope.user.id);
	});

	// If user clicks log-out during this page
	$rootScope.$on(AUTH_EVENTS.logoutSuccess, function(event) {
		$scope.user = null;
		$state.go('home');
	});
});


app.factory('AccountsFactory', function($http) {
	return {
		findUser: function(id) {
			// find user in the sale table
		}
	};
});