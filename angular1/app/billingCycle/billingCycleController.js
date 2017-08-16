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

        vm.addCredit = function (index) {
            vm.billingCycle.credits.splice(index + 1, 0, {});
        };

        vm.cloneCredit = function (index, { name, value }) {
            vm.billingCycle.credits.splice(index + 1, 0, { name, value });
        };

        vm.deleteCredit = function (index) {
            if (vm.billingCycle.credits.length > 1) {
                vm.billingCycle.credits.splice(index, 1);
            }
        };

        vm.addDebt = function (index) {
            vm.billingCycle.debts.splice(index + 1, 0, {});
        };

        vm.cloneDebt = function (index, { name, value }) {
            vm.billingCycle.debts.splice(index + 1, 0, { name, value });
        };

        vm.deleteDebt = function(index) {
            if (vm.billingCycle.debts.length > 0) {
                vm.billingCycle.debts.splice(index, 1);
            }
        };

        vm.refresh();
    }
})();