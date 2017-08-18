(function () {
    angular.module('financeApp').constant('consts', {
        appName: 'FinanceApp',
        version: '1.0',
        owner: '{SevenCode}',
        year: '2017',
        site: 'https://github.com/ricardorinco',
        apiUrl: 'http://localhost:3003/api',
        oapiUrl: 'http://localhost:3003/oapi',
        userKey: '_finance_app_user'
    }).run(['$rootScope', 'consts', function ($rootScope, consts) {
        $rootScope.consts = consts;
    }]);
})();