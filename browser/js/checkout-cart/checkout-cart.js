app.config(function($stateProvider) {
    $stateProvider.state('cart', {
        url: '/checkout-cart',
        controller: 'checkoutCartController',
        templateUrl: 'js/checkout-cart/checkout-cart.html',
        resolve: {
            itemsInCartSession: function(checkoutCartFactory, Session) {
                return !Session.user ? checkoutCartFactory.getSessionCartOfNonUser() :
                    checkoutCartFactory.getSessionCart();
            },
            fetchInfoAboutItems: function(itemsInCartSession, $http, Session) {
                console.log(itemsInCartSession)
                    let cartItemsPromisesArray = [];
                    let itemsInCart;

                    if (Session.user) {
                        itemsInCart = itemsInCartSession.data.cartItems;
                    } else {
                        itemsInCart = itemsInCartSession.data.cart;
                    }
                    itemsInCart.map(function(cartItem) {
                        cartItemsPromisesArray.push($http.get('/api/boxes/' + cartItem.selectBoxId));
                    });
                    return Promise.all(cartItemsPromisesArray);
                }
                //Stretch Goal: combining Login/Non-login Carts
                // combineLoginCart: function(checkoutCartFactory) {
                //     return Promise.all([checkoutCartFactory.getSessionCartOfNonUser(), checkoutCartFactory.getSessionCart()]);
                // .spread(function(cartNoLogin, cartLogin) {
                //     return cartNoLogin.data.cart.concat(cartLogin.data.cartItems);
                // })
                // }
        }
    });
});


//User was not logged in and then logs in...combine carts
//Cart button needs to increment properly
//When logged out, req.session.cart = []...the user info will be stored in the db.
//Refreshing the page, they would be automatically considered logged out - in terms of the cart?

app.constant('pricePerBox', 49.99);
app.factory('checkoutCartFactory', function($http) {
    return {
        getSessionCart: function() {
            return $http.get('/api/cartdetail');
        },
        getSessionCartOfNonUser: function() {
            return $http.get('/api/cartdetail/sessionStuff');
        },
        updateSessionCart: function(cartInfoUpdate) {
            return $http.put('/api/cartdetail/sessionStuff', cartInfoUpdate);
        },
        emptyingSessionCartOncePurchased: function() {
            return $http.delete('/api/cartdetail/sessionStuff');
        },
        updatingSessionCartOfUser: function(cartInfoUpdate) {
            return $http.put('/api/cartdetail', cartInfoUpdate);
        }
    };
});

app.animation('.fade', function() {
    return {
        leave: function(element, done) {
            $(element).fadeIn(1000, function() {
                done();
            });
        }
    }
})

app.controller('checkoutCartController', function(Session, $scope, checkoutCartFactory, itemsInCartSession, pricePerBox, fetchInfoAboutItems, $rootScope, $state) {
    console.log(itemsInCartSession);

    $scope.goToCheckout = function() {
        $state.go('checkoutone', $scope.cartItemsStuff)
    }
    $scope.price = pricePerBox;
    $rootScope.$broadcast('updateCartQuantity');

    //why doesn't this work when I put it in the factory?
    var resolvedCart = itemsInCartSession.data.cart || itemsInCartSession.data.cartItems;

    resolvedCart.map(function(thing, index) {
        return fetchInfoAboutItems[index].data.boxQuantity = thing.boxQuantity;
    });

    console.log(itemsInCartSession);
    console.log(fetchInfoAboutItems);
    $scope.cartItemsStuff = fetchInfoAboutItems; //

    $scope.updateCartBoolean = function() {
        let updatedCartArray = [];
        while (fetchInfoAboutItems.length) {
            updatedCartArray.push(false);
            fetchInfoAboutItems.length--;
        }
        return updatedCartArray;
    };

    $scope.itemQuantityChanged = function(index) {
        $scope.updateCartBoolean[index] = true;
    };

    $scope.updateCartItem = function(index, updateQuantity) {
        $scope.updateCartBoolean[index] = false;
        let cartInfoUpdate = {
            'itemIndex': index,
            'updateQuantity': updateQuantity
        };

        var updateCartStuff = function() {
            //deleting an item in cart
            if (!updateQuantity) {
                $scope.cartItemsStuff.splice(index, 1);
                if (Session.user) {
                    resolvedCart.splice(index, 1);
                    console.log("this is something", resolvedCart);
                    let updateCart = {
                        'updateCart': resolvedCart
                    };
                    return checkoutCartFactory.updatingSessionCartOfUser(updateCart)
                } else {
                    return checkoutCartFactory.updateSessionCart(cartInfoUpdate)
                }
                //updating an item in cart
            } else {
                if (Session.user) {
                    resolvedCart[index].boxQuantity = updateQuantity;
                    let updatedCart = {
                        'updateCart': resolvedCart
                    };

                    return checkoutCartFactory.updatingSessionCartOfUser(updatedCart)
                } else {
                    return checkoutCartFactory.updateSessionCart(cartInfoUpdate)
                }
            }
        };

        updateCartStuff().then(function() {
            $rootScope.$broadcast('updateCartQuantity');
        });
    };
});