app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, Session, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    //From checkout, if user wants to sign in as another use
    //AND if there is an account that's logged in, logout
    if(Session.user) {
        // console.log('logging you out...')
        AuthService.logout()
    }

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});