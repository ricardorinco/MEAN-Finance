(function () {
    angular.module('financeApp').controller('AuthController', [
        '$location',
        'messages',
        'auth',
        AuthController
    ]);

    function AuthController($location, msgs, auth) {
        const vm = this;
        vm.loginMode = true;

        vm.changeMode = () => vm.loginMode = !vm.loginMode;

        vm.login = () => {
            auth.login(vm.user, error => error ? msgs.addError(error) : $location.path('/'));
        };

        vm.signup = () => {
            auth.signup(vm.user, error => error ? msgs.addError(error) : $location.path('/'));
        };

        vm.getUser = () => auth.getUser();

        vm.logout = () => {
            auth.logout(() => $location.path('/'));
        };
    }

})();