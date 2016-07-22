app.factory('navbarFactory', function($http, checkoutCartFactory, Session) {
    return {
        // addCartLogout: function() {
        //     return $http.post('/api/cartdetail');
        // },

        //if you are not logged in as an user
        clearingCartForNonUser: function(){
            return $http.delete('/api/cartdetail/sessionStuff');
        },
        clearingCartForUser: function(){
            return $http.put('/api/cartdetail', {'updateCart': []});
        },
        getNumberOfItemsinCart: function() { //This is being repeated in the checkout-cart.js...is there a way to keep code DRY?
            return !Session.user ? checkoutCartFactory.getSessionCartOfNonUser() :
                checkoutCartFactory.getSessionCart();
        }
    };
});


app.directive('ngEnter', function() {
    return {
        restrict: "A",
        scope: {
            ngEnter: "&"
        },
        link: function(scope, element, attribute) {
            element.on('keydown', function(event) {
                if (event.which === 13) {
                    scope.ngEnter();
                }
            });

        }
    };
});

app.directive('navbar', function($rootScope, AuthService, AUTH_EVENTS, $state, navbarFactory, Session) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function(scope) {
            scope.checkedAge = false;
            $rootScope.$on('over21', function(){
                scope.checkedAge = true;
            });
            
            $rootScope.$on('updateCartQuantity', function(){
                navbarFactory.getNumberOfItemsinCart()
                .then(function(response) {
                    console.log(response);
                    scope.countItems = Session.user ? response.data.cartItems.length : response.data.cart.length;
                });
            });
            scope.searchActive = false;
            scope.search = function(){
                !scope.searchActive ? scope.searchActive = true : scope.searchActive = false;
            };

            scope.searchProducts = function(searchQuery){
                scope.searchActive = false;
                $state.go('searchResult', {'search': searchQuery});
                scope.searchQuery = null;
            };

            scope.cart = function() {
                $state.go('cart');
            };

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Quiz', state: 'quiz' },
                { label: 'Our Boxes', state: 'boxes' },
                { label: 'Members Only', state: 'membersOnly', auth: true }
            ];

            scope.user = null;

            scope.isLoggedIn = function() {
                return AuthService.isAuthenticated();
            };

            //To avoid conflict with login session.cart and non-login user session.cart...resetting the cart if there is any changes in user state
            scope.login = function(){
                //getting stuff in cart when user is not logged in
                navbarFactory.clearingCartForNonUser()
                    .then(function(response){
                        console.log(response);
                });
            };

            scope.logout = function() {
                // navbarFactory.addCartLogout()
                //     .then(function(){
                //         return AuthService.logout();
                //      })
                    AuthService.logout()
                    .then(function(){
                        return navbarFactory.clearingCartForNonUser();
                    })
                    .then(function(){
                        $rootScope.$broadcast('updateCartQuantity');
                        $state.go('home');
                    });
            };

            var setUser = function() {
                AuthService.getLoggedInUser().then(function(user) {
                    scope.user = user;
                });
            };

            var removeUser = function() {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});