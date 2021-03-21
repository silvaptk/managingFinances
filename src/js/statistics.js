app.controller('statisticsController', function($rootScope, $scope) {
    function count(type) {
        let registries = 0;
                
        $rootScope.registries.forEach(function(registry) {
            if (registry.type === type)
                registries++;
        });

        return (registries);
    }

    function mean(type) {
        let meanValue = 0,
            registries = 0;

        $rootScope.registries.forEach(function(registry) {
            if (registry.type === type) {
                meanValue += registry.value;
                registries += 1;
            }
        });

        meanValue = meanValue / registries;

        return (meanValue);
    }

    function stdDev(type) {
        let stdDevValue = 0,
            meanValue = mean(type),
            registries = 0;

        $rootScope.registries.forEach(function(registry) {
            if (registry.type === type) {
                stdDevValue += Math.abs(registry.value - meanValue);
                registries++;
            }
        });

        stdDevValue = stdDevValue / registries;
        
        return (stdDevValue);
    }
    
    $scope.statistics = [
        {
            label: "Quantidade de entradas",
            hasImg: true,
            imgAddr: './assets/count.svg',
            imgDesc: 'Contando',
            isCurrency: false,
            value: count("income"),
        },
        {
            label: "Média de entradas",
            hasImg: true,
            imgAddr: './assets/mean.svg',
            imgDesc: 'Média aritmética',
            isCurrency: true,
            value: mean("income"),
        },
        {
            label: "Desvio padrão de entradas",
            hasImg: true,
            imgAddr: './assets/stdDev.svg',
            imgDesc: 'Desvio padrão',
            isCurrency: true,
            value: stdDev("income"),
        },
        {
            label: "Quantidade de saídas",
            hasImg: true,
            imgAddr: './assets/count.svg',
            imgDesc: 'Contando',
            isCurrency: false,
            value: count("expense"),
        },
        {
            label: "Média de saídas",
            hasImg: true,
            imgAddr: './assets/mean.svg',
            imgDesc: 'Média aritmética',
            isCurrency: true,
            value: mean("expense"),
        },
        {
            label: "Desvio padrão de saídas",
            hasImg: true,
            imgAddr: './assets/stdDev.svg',
            imgDesc: 'Desvio padrão',
            isCurrency: true,
            value: stdDev("expense"),
        }
    ];
});