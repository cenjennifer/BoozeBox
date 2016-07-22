// State
app.config(function($stateProvider) {
	$stateProvider.state('checkoutlogin', {
		url: '/checkout-login',
		controller: 'CheckoutLoginController',
		templateUrl: 'js/checkout/checkout-login.html',
		params: {
			cartItems: null,
		}
	});
});

// Controller
app.controller('CheckoutLoginController', function($scope, $rootScope, AUTH_EVENTS, Session, AuthService, $state, $stateParams) {
	$scope.cartData = $state.params.cartItems
	// If user is signed in, check to see if they want
	// to continue with this account, or log into a different one
	$rootScope.$on(AUTH_EVENTS.loginSuccess, function(event, data) {
		$scope.session = Session.user;
	});
	if(Session) $scope.session=Session.user;

	$scope.login = {
		email: null,
		password: null
	};

	// To sign in an existing customer...
	$scope.sendLogin = function(loginInfo) {
		AuthService.login(loginInfo)
			.then(function() {

				$state.go("checkoutpay", {cartItems: $scope.cartData});
			})
			.catch(function() {
				$scope.error = 'Invalid login credentials.';
			});
	};
});