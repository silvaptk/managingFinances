app.controller('navController', function($scope, $location) {
    $scope.routesState = {
        '/addRegistry': '',
        '/showRegistries': '',
        '/statistics': ''
    };

    $scope.routesState[$location.path()] = 'active';
 
    $scope.changeRoute = function(to) {
        $scope.routesState['/addRegistry'] = '';
        $scope.routesState['/showRegistries'] = '';
        $scope.routesState['/statistics'] = '';
        $scope.routesState[to] = 'active';
    }
});