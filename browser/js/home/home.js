app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'js/home/home.html',
        controller: "homeController"
    });
});

app.controller('homeController', function($rootScope){

	$rootScope.$broadcast('updateCartQuantity');
});