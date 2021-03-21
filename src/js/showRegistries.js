app.controller('showRegistriesController', function($rootScope, $scope) {
    $scope.showDescription = Array($rootScope.registries.length).fill(false);
    
    $scope.toggleDescription = function(index, event) {
        event.currentTarget.classList.toggle('deactivated');
        $scope.showDescription[index] = !$scope.showDescription[index];
    }
});