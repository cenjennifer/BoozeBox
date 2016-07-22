app.config(function($stateProvider) {

    $stateProvider.state('boxes', {
        url: '/boxes',
        controller: 'BoxesController',
        templateUrl: 'js/boxes/boxes.html',
    });

    $stateProvider.state('box', {
        url: '/boxes/:boxId',
        controller: 'BoxController',
        templateUrl: 'js/boxes/box.html'
    });

});

app.controller('BoxesController', function($scope, BoxesFactory) {
    BoxesFactory.fetchAll().then(function(response) {
        $scope.boxes = response.data;
    });


    BoxesFactory.getBoxesByLifestyle().then(function(response) {
        var lifestyles = response.data;
        BoxesFactory.fetchAll().then(function(response) {
            var boxes = response.data;
            var lifestylesArr = Object.keys(lifestyles).map(function(k) {
                return lifestyles[k];
            });
            var boxesArr = Object.keys(boxes).map(function(k) {
                return boxes[k];
            });
            $scope.lifestylesBoxes = [];
            lifestylesArr.forEach(function(value, index) {
                $scope.lifestylesBoxes.push(value);
                $scope.lifestylesBoxes[index].boxes = boxes.filter(function(el) {
                    return el.lifestyle.id === value.id;
                });
            });
        });
    });

});


app.factory('BoxesFactory', function($http) {
    return {
        fetchAll: function() {
            return $http.get('/api/boxes');
        },
        getBoxesByLifestyle: function() {
            return $http.get('/api/lifestyles')
                .then(function(lifestyles) {
                    return lifestyles;
                });
        }
    };
});


app.controller('BoxController', function($scope, BoxFactory, navbarFactory, $timeout, $rootScope, Session, AUTH_EVENTS, CustomerInfoFactory) {

    // If user exists, get the information we need and populate the form or null 
    $scope.populateUser = function(id) {
        CustomerInfoFactory.findUser(id)
            .then(function(userData) {
                $scope.userData = userData.data;
            });
    };

    // Noticed small issue:
    //  - When go to checkout-1 page, needs to be refreshed to load
    // Now, with this fix, when going to checkout-1 page, 
    // this loads it right away
    if (Session.user) {
        $scope.user = Session.user;
        $scope.populateUser($scope.user.id);
    }

    // EXTRAS...
    // Noticed small issue:
    //  - When refresh on checkout-1 page, lose data
    // Now, with this fix, we keep data on refresh
    $rootScope.$on(AUTH_EVENTS.loginSuccess, function(event, data) {
        $scope.user = Session.user;
        $scope.populateUser($scope.user.id);
    });


    $scope.boxToBeAdded = false;
    $rootScope.$broadcast('updateCartQuantity');

    $scope.addToCart = function(selectBoxId, boxQuantity) {
        var addToCartObj = { 'selectBoxId': selectBoxId, 'boxQuantity': boxQuantity };
        $scope.quantity = null;
        if (boxQuantity) {
            $scope.boxToBeAdded = true;
            $timeout(function() { $scope.boxToBeAdded = false }, 2000);
            BoxFactory.fetchReqSession(addToCartObj);
        } else {
            $scope.boxNullMsg = true;
            $timeout(function() { $scope.boxNullMsg = false }, 2000);
        }
    };
    BoxFactory.fetchOne()
        .then(function(response) {
            console.log("box", response.data);
            $scope.box = response.data;
        });

    // $scope.$watch('editedBox', function() {}, true);
    $scope.editedBox = {};
    $scope.editBox = function() {
        $scope.hasSubmitted = true;
        BoxFactory
            .updateBox($scope.editedBox)
            .then(function(response) {
                console.log("response", response.data);
            })
            .catch(function(err) {
                $scope.hasSubmitted = false;
                $scope.serverError = err.message || 'Something went wrong!';
            });
    };

    $scope.removeProduct = function(productId) {
        BoxFactory.removeProductFromBox(productId)
            .then(function(response) {
                console.log("after removal", response.data);
            });
    };

    $scope.addProduct = function(productName) {
        console.log("clicked");
        BoxFactory.addProductToBox(productName)
        .then(function(response) {
            console.log("after adding", response.data);
        });
    };
});

app.factory('BoxFactory', function($http, $stateParams, Session, checkoutCartFactory, $rootScope) {
    return {
        fetchOne: function() {
            return $http.get('/api/boxes/' + $stateParams.boxId);
        },
        //create/update req.session.cart
        fetchReqSession: function(addToCartData) {
            var fetchReqSessionPromise = function() {
                if (Session.user) {
                    return checkoutCartFactory.getSessionCart()
                        .then(function(response) {
                            response.data.cartItems.push(addToCartData);
                            return checkoutCartFactory.updatingSessionCartOfUser({ 'updateCart': response.data.cartItems });
                        });
                } else {
                    return $http.post('/api/cartdetail/sessionStuff', addToCartData);
                }
            };

            fetchReqSessionPromise().then(function(res) {
                console.log(res);
                $rootScope.$broadcast('updateCartQuantity');
            });
        },
        updateBox: function(data) {
            return $http.put('/api/boxes/' + $stateParams.boxId, data);
        },
        removeProductFromBox: function(productId) {
            return $http.put('/api/boxes/' + $stateParams.boxId + '/product/' + String(productId));
        },
        addProductToBox: function(productName) {
            return $http.post('/api/boxes/' + $stateParams.boxId + '/product/' + productName);
        }
    };
});
