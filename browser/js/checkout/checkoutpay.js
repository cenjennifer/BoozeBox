app.config(function($stateProvider) {
    $stateProvider
        .state('checkoutpay', {
            url: '/checkout-payment',
            templateUrl: 'js/checkout/checkoutpay.html',
            controller: 'CustomerInfoController',
            params: {
                cartItems: null
            }
        });
});

// Factory
app.factory('CustomerInfoFactory', function($http) {
    return {
        findUser: function(id) {
            return $http.get('/api/users/' + String(id));
        },
        checkEmail: function(emailToCheck) {
            return $http.get('/api/users');
        },
        createUser: function(formData) {
            // console.log("Creating a new user:",formData);
            return $http.post('/api/users', formData);
        },
        updateUser: function(formData) {
            // console.log(formData);
            return $http.put('/api/users/' + String(formData.id), formData);
        },
        sendEmail: function(data) {
            return $http.post('/api/email', data);
        },
        addSale: function(data) {
            return $http.post('/api/sale', data);
        }
    };
});

// Controller
app.controller('CustomerInfoController', function($scope, $rootScope, AuthService, AUTH_EVENTS, Session, CustomerInfoFactory, $state, navbarFactory) {

    $scope.cartItems = $state.params.cartItems;
    console.log("CART STUFF", $scope.cartItems);

    $scope.errMessage = null;
    $scope.shippingOptions = {
        // Allow users to select billing as shipping address
        same_as_billing: false,
        options: null
    };
    $scope.dateNow = Date.now();
    $scope.submitData = function(userInfo, shippingInfo, cartItems, dateOfPurchase) {
        var saleReqBody = {
            date: dateOfPurchase,
            cart: cartItems,
            user: oldUserId || newUserId //what if they aren't in the database
        };

        var emailReqBody = {
            "name": userInfo.firstName,
            "recipientEmail": userInfo.email,
            "cartItems": cartItems //array of items in cart
        };

        CustomerInfoFactory.addSale(saleReqBody)
            .then(function() {
                return CustomerInfoFactory.sendEmail(emailReqBody);
            })
            .then(function(response) {
                //update cart to 0 in session and in db
                console.log(navbarFactory)
                return !Session.user ? navbarFactory.clearingCartForNonUser() : navbarFactory.clearingCartForUser();
            })
            .then(function(response){
                $rootScope.$broadcast('updateCartQuantity');
                $state.go('thankyou'); //need to create this state
             });

        // Sale Model
        // send todays date, fire off emails to delay based on shipping options
        // array/object of the cart 
        // user id (from $scope.userData -- if we made a new user we have to get that user id from the post request)

        // Clean up data for POST/
        $scope.userData.cc_fname = userInfo.cc_fname;
        $scope.userData.cc_lname = userInfo.cc_lname;
        $scope.userData.cc_number = userInfo.cc_number;
        $scope.userData.cc_cvv = userInfo.cc_cvv;
        $scope.userData.cc_expiration = userInfo.cc_expiration;
        $scope.userData.cc_streetaddress = userInfo.cc_streetaddress;
        $scope.userData.cc_zipcodeaddress = userInfo.cc_zipcodeaddress;
        $scope.userData.cc_cityaddress = userInfo.cc_cityaddress;
        $scope.userData.cc_stateaddress = userInfo.cc_stateaddress;
        $scope.userData.cc_countryaddress = userInfo.cc_countryaddress;

        $scope.userData.email = userInfo.email;
        $scope.userData.password = userInfo.password;
        $scope.userData.firstName = userInfo.firstName;
        $scope.userData.lastName = userInfo.lastName;
        $scope.userData.street_address = userInfo.street_address;
        $scope.userData.zipcode_address = userInfo.zipcode_address;
        $scope.userData.city_address = userInfo.city_address;
        $scope.userData.state_address = userInfo.state_address;
        $scope.userData.country_address = userInfo.country_address;
        $scope.userData.birthday = userInfo.birthday;

        if (shippingInfo.same_as_billing) {
            $scope.userData.street_address = userInfo.cc_streetaddress;
            $scope.userData.zipcode_address = userInfo.cc_zipcodeaddress;
            $scope.userData.city_address = userInfo.cc_cityaddress;
            $scope.userData.state_address = userInfo.cc_stateaddress;
            $scope.userData.country_address = userInfo.cc_countryaddress;
        }

        var newUserId; //For new user
        $scope.isUserInDb = false;
        // Old users
        if ($scope.userData.id) CustomerInfoFactory.updateUser($scope.userData);
        // New users
        else {
            CustomerInfoFactory.checkEmail($scope.userData.email)
                .then(function(allUsers) {
                    // console.log(allUsers.data); // array of all users
                    // console.log(allUsers.data) // check this out!!!!!!!! array of data or promises...
                    // Promise.all(allUsers.data).then(function(user){

                    return allUsers;

                })
                .then(function(allUsers) {
                    for (var i = 0; i < allUsers.length; i++) {
                        if (allUsers[i].email === $scope.userData.email) {
                            $scope.errMessage = 'Email already exists!';
                            $scope.isUserInDb = true;
                            return;
                        }
                    }
                    if (!$scope.isUserInDb) {
                        CustomerInfoFactory.createUser($scope.userData)
                            .then(function(res) {
                                newUserId = res.data.id;
                                console.log(res);
                            });
                    }
                });
        }
    };
    var oldUserId;
    // If user exists, get the information we need and populate the form or null 
    $scope.populateUser = function(id) {
        CustomerInfoFactory.findUser(id)
            .then(function(userData) {

                // Angular issue, birthday is one day off. Fix: 
                var localDate = new Date(userData.data.birthday);
                var localTime = localDate.getTime();
                var localOffset = localDate.getTimezoneOffset() * 60000;
                var bday = new Date(localTime + localOffset);
                var month = bday.getMonth() + 1;
                var day = bday.getDate();
                var year = bday.getFullYear();
                userData.data.birthday = month + "/" + day + "/" + year;
                oldUserId = userData.data.id;
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
        $scope.populateUser($scope.user.id);
    });

    // If user clicks log-out during this page
    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(event) {
        $scope.user = null;
        $state.go('home');
    });
});