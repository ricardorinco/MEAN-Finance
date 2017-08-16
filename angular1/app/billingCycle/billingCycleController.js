(function () {
    angular.module('financeApp').controller('BillingCycleController', [
        '$http',
        'messages',
        'tabs',
        BillingCycleController
    ]);

    function BillingCycleController($http, messages, tabs) {
        const vm = this;
        const url = 'http://localhost:3003/api/billingCycles';

        vm.refresh = function () {
            $http.get(url).then(function (response) {
                vm.billingCycle = { credits: [{}], debts: [{}] };
                vm.billingCycles = response.data;
                tabs.show(vm, { tabList: true, tabCreate: true });
            });
        };

        vm.create = function () {
            $http.post(url, vm.billingCycle).then(function (response) {
                vm.refresh();
                messages.addSuccess('Operação realizada com sucesso!');
            }).catch(function (response) {
                messages.addError(response.data.errors);
            });
        };

        vm.update = function () {
            const urlUpdate = `${url}/${vm.billingCycle._id}`;
            $http.put(urlUpdate, vm.billingCycle).then(function (response) {
                vm.refresh();
                messages.addSuccess('Operação realizada com sucesso!');
            }).catch(function (response) {
                messages.addError(response.data.errors);
            });
        };

        vm.delete = function () {
            const urlDelete = `${url}/${vm.billingCycle._id}`;
            $http.delete(urlDelete, vm.billingCycle).then(function (response) {
                vm.refresh();
                messages.addSuccess('Operação realizada com sucesso!');
            }).catch(function (response) {
                messages.addError(response.data.errors);
            });
        };

        vm.showTabUpdate = function (billingCycle) {
            vm.billingCycle = billingCycle;
            tabs.show(vm, { tabUpdate: true });
        };

        vm.showTabDelete = function (billingCycle) {
            vm.billingCycle = billingCycle;
            tabs.show(vm, { tabDelete: true });
        };

        vm.refresh();
    }
})();