(function () {
    angular.module('financeApp').controller('BillingCycleController', [
        '$http',
        '$location',
        'messages',
        'tabs',
        BillingCycleController
    ]);

    function BillingCycleController($http, $location, messages, tabs) {
        const vm = this;
        const url = 'http://localhost:3003/api/billingCycles';

        vm.refresh = function () {
            const page = parseInt($location.search().page) || 1;

            $http.get(`${url}?skip=${(page - 1) * 12}&limit=12`).then(function (response) {
                vm.billingCycle = { credits: [{}], debts: [{}] };
                vm.billingCycles = response.data;
                vm.calculateValues();

                

                $http.get(`${url}/count`).then(function (response) {
                    vm.pages = Math.ceil(response.data.value / 10);
                    tabs.show(vm, { tabList: true, tabCreate: true });
                });
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
            vm.calculateValues();
            tabs.show(vm, { tabUpdate: true });
        };

        vm.showTabDelete = function (billingCycle) {
            vm.billingCycle = billingCycle;
            vm.calculateValues();
            tabs.show(vm, { tabDelete: true });
        };

        vm.addCredit = function (index) {
            vm.billingCycle.credits.splice(index + 1, 0, {});
        };

        vm.cloneCredit = function (index, { name, value }) {
            vm.billingCycle.credits.splice(index + 1, 0, { name, value });
            vm.calculateValues();
        };

        vm.deleteCredit = function (index) {
            if (vm.billingCycle.credits.length > 1) {
                vm.billingCycle.credits.splice(index, 1);
                vm.calculateValues();
            }
        };

        vm.addDebt = function (index) {
            vm.billingCycle.debts.splice(index + 1, 0, {});
        };

        vm.cloneDebt = function (index, { name, value }) {
            vm.billingCycle.debts.splice(index + 1, 0, { name, value });
            vm.calculateValues();
        };

        vm.deleteDebt = function (index) {
            if (vm.billingCycle.debts.length > 0) {
                vm.billingCycle.debts.splice(index, 1);
                vm.calculateValues();
            }
        };

        vm.calculateValues = function () {
            vm.credit = 0;
            vm.debt = 0;

            if (vm.billingCycle) {
                vm.billingCycle.credits.forEach(function ({ value }) {
                    vm.credit += !value || isNaN(value) ? 0 : parseFloat(value);
                });

                vm.billingCycle.debts.forEach(function ({ value }) {
                    vm.debt += !value || isNaN(value) ? 0 : parseFloat(value);
                });
            }

            vm.total = vm.credit - vm.debt;
        };

        vm.refresh();
    }
})();