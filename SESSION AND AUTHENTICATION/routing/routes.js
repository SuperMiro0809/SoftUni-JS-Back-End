const fs = require('fs');
const path = require('path');
//const db = require('../backend/db.js');
// const db = require('../backend/database.js');
const cubeController = require('../controllers/cube.js');
const accessoryController = require('../controllers/accessory.js');
const userController = require('../controllers/user.js');
const isAuth = require('../middlewares/is-auth.js');

module.exports = (app) => {

    app.get('/', cubeController.getCubes);

    app.get('/about', function (req, res) {
        res.render('about')
    });

    app.get('/create', isAuth(true), cubeController.getCubeCreate);
    app.post('/create', isAuth(true), cubeController.createAndStoreCube);

    app.get('/details/:id', cubeController.getCubeById);

    //app.get('/create/accessory', accessoryController.getCreateAccessory);
    app.get('/create/accessory', isAuth(true), function (req, res) {
        res.render('createAccessory');
    });
    app.post('/create/accessory', isAuth(true), accessoryController.createAndStoreAccessory);

    app.get('/attach/accessory/:id', isAuth(true),  accessoryController.getAttachAccessory);
    app.post('/attach/accessory/:id', isAuth(true), accessoryController.postAttachAccessory);

    app.get('/register', isAuth(false), userController.getRegister);
    app.post('/register', isAuth(false), userController.postRegister);

    app.get('/login', isAuth(false), userController.getLogin);
    app.post('/login', isAuth(false), userController.postLogin);

    app.get('/logout', userController.getLogout);

    app.get('/edit/:id', cubeController.getEditCube);
    app.post('/edit/:id', cubeController.postEditCube);

    app.get('/delete/:id', cubeController.getDeleteCube);
    app.post('/delete/:id', cubeController.postDeleteCube);

    app.get('*', function(req, res) {
        res.render('404');
    });

}