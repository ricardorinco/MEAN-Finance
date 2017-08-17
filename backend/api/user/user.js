const restfull = require('node-restfull');
const mongoose = restfull.mongoose;

const userSchema = new mongooser.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, min: 6, max: 12, required: true }
});

module.exports = restfull.model('User', userSchema);