// Adicionando validações
app.directive('validateRegistryName', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function validateRegistryName(value) {
                if (RegExp(".{2,}").test(value)) {
                    mCtrl.$setValidity('validRegistryName', true);
                } else {
                    mCtrl.$setValidity('validRegistryName', false);
                }
                
                return (value);
            }

            mCtrl.$parsers.push(validateRegistryName);
        }
    }
});

app.directive('validateRegistryValue', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function validateRegistryValue(value) {
                if(RegExp("^[0-9]+(\.[0-9]+)?$").test(value)) {
                    mCtrl.$setValidity('validRegistryValue', true);
                } else {
                    mCtrl.$setValidity('validRegistryValue', false);
                }
                
                return (value);
            }

            mCtrl.$parsers.push(validateRegistryValue);
        }
    }
});

app.directive('validateRegistryDate', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function validateRegistryDate(value) {
                if(RegExp("^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$").test(value)) {
                    let date = value.split('/');
                    let typedDay = Number(date[0]); 
                    let typedMonth = Number(date[1]); 
                    let typedYear = Number(date[2]);
                    
                    if (typedMonth < 1 && typedMonth > 12) {
                        mCtrl.$setValidity('validRegistryDate', false);
                        return (value);
                    }

                    if (typedDay < 1 || typedDay > 31) {
                        mCtrl.$setValidity('validRegistryDate', false);
                        return (value);
                    }

                    if (typedMonth % 2 === 0 && typedDay === 31) {
                        mCtrl.$setValidity('validRegistryDate', false);
                        return (value);
                    }

                    if (typedMonth === 2 && typedDay > 29) {
                        mCtrl.$setValidity('validRegistryDate', false);
                        return (value);
                    }

                    if (typedYear % 4 === 0 && typedMonth === 2 && typedDay > 28) {
                        mCtrl.$setValidity('validRegistryDate', false);
                        return (value);
                    }

                    mCtrl.$setValidity('validRegistryDate', true);
                    return (value);
                } else {
                    mCtrl.$setValidity('validRegistryDate', false);
                    return (value);
                }
            }
            mCtrl.$parsers.push(validateRegistryDate);
        }
    }
});

// Controlador
app.controller("addRegistryController", function($rootScope, $scope, $timeout) {
    $scope.currentRegistry = {
        type: 'income',
    };
    
    $scope.registryType = function(type) {
        $scope.currentRegistry.type = type;
    };

    $scope.showWarning = function(forWhat, event) {
        if (forWhat.$invalid && forWhat.$touched) {
            return (true);
        }

        return (false);
    };

    $scope.submitRegistry = function(form, event) {
        if (form.$valid) {
            $scope.currentRegistry.name = $scope.typedRegistryName;
            $scope.currentRegistry.value = Number($scope.typedRegistryValue);
            $scope.currentRegistry.date = $scope.typedRegistryDate;
            $scope.currentRegistry.descritption = $scope.typedRegistryDescription;
            
            $rootScope.registries.push($scope.currentRegistry);
            console.log($rootScope.registries);
            
            $scope.typedRegistryName = "";
            $scope.typedRegistryValue = "";
            $scope.typedRegistryDate = "";
            $scope.typedDescritption = "";

            form.$setUntouched();

            console.log(event);
            event.target.classList.add('submited'); 
            event.target.value = "Adicionado!";

            $timeout(function() {
                event.target.classList.remove('submited');
                event.target.value = "Adicionar";
            }, 2000);
        }
    }
});
