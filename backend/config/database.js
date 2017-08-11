const mongoose = require('mongoose');
module.exports = mongoose.connect('mongodb://localhost/db_finance');

mongoose.Error.messages.general.require = "O atributo '{PATH}' é obrigatorio.";