const userModel = require('../models/user.js');
const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;
const config = require('../config/config');
const signToken = promisify(jwt.sign);

const { jwtSecret, authCookieName } = config;

module.exports = {
    getRegister(req, res) {

        res.render('register');
    },

    postRegister(req, res, next) {
        const { username, password, repeatPassword } = req.body;
        if(password !== repeatPassword) {
            res.render('register', { errorMessage: 'Passwords don\'t match!' });
            return;
        }

        userModel.create({ username, password })
        .then(() => {
            res.redirect('/login');
        })
        .catch(next) 
    },

    getLogin(req, res) {

        res.render('login');
    },

    postLogin(req, res, next) {
        const { username, password } = req.body;

        userModel.findOne({ username })
        .then(user => Promise.all([user, user ? user.matchPasswords(password) : false]))
        .then(([user, match]) => {
            if(!match) {
                render('login', { errorMessage: 'User or password don\'t match' });
                return;
            }

            return signToken({ userId: user._id }, jwtSecret);
        })
        .then(jwtToken => {
            res.cookie(authCookieName, jwtToken, { httpOnly: true });
            res.redirect('/');
        })
        .catch(next)
    },

    getLogout(req, res) {
        res.clearCookie(authCookieName);
        res.redirect('/');
    } 
}
