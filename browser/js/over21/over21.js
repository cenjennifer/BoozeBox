app.config(function($stateProvider) {
    $stateProvider.state('over21', {
        url: '/',
        templateUrl: 'js/over21/over21.html',
        controller: 'over21Controller'
    });
    $stateProvider.state('tooYoung', {
        url: '/over21/tooYoung',
        templateUrl: 'js/over21/tooYoung.html'
    });
});

app.controller('over21Controller', function($scope, theMonths, $state, $rootScope) {
    $scope.months = theMonths;

    $scope.checkAge = function(month, day, year) {

        var month = theMonths.indexOf(month);
        var birthday = new Date(year, month, day);
        if (((Date.now() - birthday) / (86400000 * 365)) > 21) {
            $rootScope.$broadcast('over21');
            $state.go('home');
        } else {
            $state.go('tooYoung');
        }
    };

});

app.value('theMonths', ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);