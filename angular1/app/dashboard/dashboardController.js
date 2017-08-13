(function () {
    angular.module('financeApp').controller('DashboardController', [
        '$http',
        DashboardController
    ]);

    function DashboardController($http) {
        const vm = this;
        vm.getSummary = function () {
            const url = 'http://localhost:3003/api/billingSummary';
            $http.get(url).then(function (response) {
                const { credit = 0, debt = 0 } = response.data;

                vm.credit = credit;
                vm.debt = debt;
                vm.total = credit - debt;
            });
        };

        vm.getSummary();
    }
})();
