const jwt = require('jsonwebtoken');
const env = require('./../.env');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    } else {
        const token = req.body.token || req.query.token || req.headers['authorization'];

        if (!token) {
            return res.status(403).send({ errors: ['No token provided'] });
        }

        jwt.verify(token, env.authSecret, function (error, decoded) {
            if (error) {
                res.status(403).send({ errors: ['Failed to authenticate token'] });
            } else {
                next();
            }
        });
    }
};