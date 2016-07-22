app.controller('SignupCtrl', function ($scope, AuthService, $state) {
  $scope.signupUser = function (credentials) {
    AuthService.signup(credentials)
    .then(function (loggedinUser) {
      $state.go('home');
    });
  };
});