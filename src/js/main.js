let app = angular.module('managingFinances', ['ngRoute', 'ngAnimate']);


// Filtro para exibir valores monetários no formato
    // brasileiro
app.filter('currencyFormat', function($filter) {
    return function(value) {
        // Convertendo para forma de moeda (padrão americano i.e. 000,000.00)
        let formatedValue = $filter("currency")(value, "");
        // Convertendo vírgulas em pontos (i.e. 000.000.00)
        formatedValue = formatedValue.replace(",", ".");
        // Transformando último ponto em vírgula  (i.e. 000.000,00)
        formatedValue = formatedValue.replace(/\.(?!.*\.)/, ",");
        
        return (formatedValue);
    };
});

app.config(function($routeProvider) {
    $routeProvider
    .when("/showRegistries", {
        templateUrl: "./src/html/showRegistries.htm",
        controller: "showRegistriesController"
    })
    .when("/statistics", {
        templateUrl: "./src/html/statistics.htm",
        controller: "statisticsController"
    })
    .otherwise({
        templateUrl: "./src/html/addRegistry.htm",
        controller: "addRegistryController" 
    });
});