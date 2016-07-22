app.config(function($stateProvider) {
    $stateProvider.state('searchResult', {
        url: '/search-results/:search',
        controller: 'searchProductsController',
        templateUrl: 'js/searchResult/searchResult.html',
        resolve: {
            searchDb: function($stateParams, $http) {
                return $http.get('/api/products/search/?search=' + $stateParams.search);
            }
        }
    });
});

app.controller('searchProductsController', function($scope, searchDb, BoxesFactory, $stateParams) {
    $scope.noResults = false;
    if (!searchDb.data.boxes) {
        $scope.noResults = true;
        $scope.searchString = $stateParams.search;
        BoxesFactory.fetchAll()
            .then(function(response) {
                var generateThreeRandomBoxes = function() {
                    let randomBoxes = [];
                    let num = 0;
                    while (num < 3) {
                        let randNum = Math.floor(Math.random() * (response.data.length));
                        randomBoxes.push(response.data[randNum]);
                        response.data.splice(randNum, 1);
                        num++;
                    }
                    return randomBoxes;
                }
                $scope.matchedBoxes = generateThreeRandomBoxes();
            });
    } else {
        $scope.matchedBoxes = searchDb.data.boxes;
    }
});