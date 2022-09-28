const fs = require('fs');
const path = require('path');
//const db = require('../backend/db.js');
const db = require('../backend/database.js');

module.exports = (app) => {
    // app.get('/', function (req, res) {
    //     const cubes = db().getCubes();
    //     res.render('home', { cubes });
    // });

    app.get('/', db.getCubes);

    app.get('/about', function (req, res) {
        res.render('about')
    });

    app.get('/create', function (req, res) {
        res.render('create')
    });

    app.get('/details/:id', db.getCubeById);

    app.get('/create/accessory', function (req, res) {
        res.render('createAccessory');
    })

    app.get('/attach/accessory/:id', db.getAttachAccessory)
    // app.get('/details/:id', function (req, res) {
    //     const id = req.params.id;
    //     const cube = db().getCubeById(id);

    //     res.render('details', { cube })
    // });

    app.post('/create', db.createAndStoreCube);

    app.post('/create/accessory', db.createAndStoreAccessory);

    app.post('/attach/accessory/:id', db.postAttachAccessory);
    // app.post('/create', function(req, res) {
    //     const newCube = req.body;
    //     db().createAndStoreCube(newCube);

    //     res.redirect('/')
    // });

    app.get('*', function(req, res) {
        res.render('404');
    });

}