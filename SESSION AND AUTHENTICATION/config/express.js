const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth.js');

module.exports = (app) => {

    //TODO: Setup the body parser
    const jsonBodyParser = express.json();
    const urlEncodedBodyParser = express.urlencoded({ extended: true });
    app.use(jsonBodyParser);
    app.use(urlEncodedBodyParser);
    //TODO: Setup the static files

    app.use('/css', express.static('static/css'));
    app.use('/images', express.static('static/images'));

    //TODO: Setup the view engine

    app.engine('.hbs', handlebars({
        extname: '.hbs'
    }))

    app.set('view engine', '.hbs');

    app.use(cookieParser());
    app.use(auth);

    app.use(function (err, req, res, next) {
        if (err.message === 'BAD_REQUEST') {
            res.status(400);
            return;
        }
    });

};