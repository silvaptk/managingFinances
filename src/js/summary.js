app.controller('summaryController', function($rootScope, $scope) {
    // Primeiros registros
    $rootScope.registries = [
        {
            type: 'expense',
            name: 'Conta de luz',
            value: 400.00,
            date: '17/03/2021',
            description: 'Foram 330KWh esse mês. Valor acima da média. A bandeira de cobrança é vermelha.'
        },
        {
            type: 'income',
            name: 'Aluguel do Marcos',
            value: 1200.00,
            date: '18/03/2021',
            description: 'Por conta do atraso, cobrei 20% a mais.'
        },
        {
            type: 'income',
            name: 'Salário da amada',
            value: 2300.00,
            date: '19/03/2021',
            description: 'Muitas horas extras nesse mês',
        },
        {
            type: 'expense',
            name: 'Compramos TV',
            value: 1200.00,
            date: '20/03/2021',
            description: ''
        }
    ];

    function total(type) {
        let totalValue = 0;

        $rootScope.registries.forEach(function(registry) {
            if(registry.type === type || !type) {
                totalValue += (!type && registry.type === 'expense' ? (-registry.value) : registry.value);
            } 
        });

        return (totalValue);
    }

    $scope.summaryCards = [
        {
            label: 'Entradas',
            imgAddr: './assets/income.svg',
            getTotal: () => total("income"),
        },
        {
            label: 'Saídas',
            imgAddr: './assets/expense.svg',
            getTotal: () => total("expense"),

        },
        {
            label: 'Balanço',
            imgAddr: './assets/ballance.svg',
            getTotal: () => total(""),
        }
    ];
});