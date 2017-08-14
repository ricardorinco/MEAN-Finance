(function () {
    angular.module('financeApp').factory('messages', [
        'toastr',
        MessagesFactory
    ]);

    function MessagesFactory(toastr) {
        function addMessage(messages, title, method) {
            if (messages instanceof Array) {
                messages.forEach(message => toastr[method](message, title));
            } else {
                toastr[method](messages, title);
            }
        }

        function addSuccess(messages) {
            addMessage(messages, 'Sucesso', 'success');
        }

        function addWarning(messages) {
            addMessage(messages, 'Atenção', 'warning');
        }

        function addError(messages) {
            addMessage(messages, 'Erro', 'error');
        }

        return { addSuccess, addWarning, addError };
    }
})();