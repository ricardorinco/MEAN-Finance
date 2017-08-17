const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('./user');
const env = require('./../../.env');

const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,12})/;

const sendErrorFromDB = function (res, dbErrors) {
    const errors = [];
    _.forIn(dbErrors.errors, error => errors.push(error.message));

    return res.status(400).json({ errors });
};

const login = function (req, res, next) {
    const email = req.body.email || '';
    const password = req.body.password || '';

    user.findOne({ email }, function (error, user) {
        if (error) {
            return sendErrorFromDB(res, err);
        } else if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(user, env.authSecret, {
                expiresIn: '1 day'
            });
            const { name, email } = user;

            res.json({ name, email, token });
        } else {
            return res.status(400).send({ errors: ['Usuário/Senha inválidos'] });
        }
    });
};

const validateToken = function (req, res, next) {
    const token = req.body.token || '';
    jwt.verify(token, env.authSecret, function (error, decoded) {
        return res.status(200).send({ valid: !error });
    });
};

const signup = function (req, res, next) {
    const name = req.body.name || '';
    const email = req.body.email || '';
    const password = req.body.password || '';
    const confirmPassword = req.body.confirmPassword || '';

    if (!email.match(emailRegex)) {
        return res.status(400).send({ errors: ['O e-mail informado está inválido'] });
    }

    if (!password.match(passwordRegex)) {
        return res.status(400).send({ errors: ['Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-12'] });
    }

    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(password, salt);

    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({ errors: ['Senhas não conferem'] });
    }

    user.findOne({ email }, function (error, user) {
        if (error) {
            return sendErrorFromDB(res, error);
        } else if (user) {
            return res.status(400).send({ errors: ['Usuário já cadastrado'] });
        } else {
            const newUser = new user({ name, email, password: passwordHash });
            newUser.save(function (error) {
                if (error) {
                    return sendErrorFromDB(res, error);
                } else {
                    login(req, res, next);
                }
            });
        }
    });
};

module.exports = { login, signup, validateToken };