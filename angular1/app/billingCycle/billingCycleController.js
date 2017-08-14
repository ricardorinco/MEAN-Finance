(function () {
    angular.module('financeApp').controller('BillingCycleController', [
        '$http',
        'messages',
        BillingCycleController
    ]);

    function BillingCycleController($http, messages) {
        const vm = this;

        vm.create = function () {
            const url = 'http://localhost:3003/api/billingCycles';

            $http.post(url, vm.billingCycle).then(function (response) {
                //vm.billingCycle = {};

                messages.addSuccess('Operação realizada com sucesso!');
            }).catch(function (response) {
                messages.addError(response.data.errors);
            });
        };
    }
})();