const express = require('express');
const router = express.Router();

const authController = require('./controllers/auth.controller');
const usersController = require('./controllers/users.controller');
const productsController = require('./controllers/products.controller');
const employeesController = require('./controllers/employees.controller');
const cricketsController = require('./controllers/crickets.controller');

router.post('/authenticate', authController.login);

router.get('/users', usersController.findAll);
router.get('/users/:id', usersController.findOne);
router.post('/users', usersController.create);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);
router.post('/users/find-by-username', usersController.findByUsername);
router.post('/users/additionalinfo/:id', usersController.updateAdditionalInfo);
router.get('/users/additionalinfo/:id', usersController.findOneAdditionalInfo);


router.get('/products', productsController.findAll);
router.get('/products/:id', productsController.findOne);

router.get('/employees', employeesController.findAll);
router.get('/employees/:id', employeesController.findOne);
router.post('/employees', employeesController.create);
router.put('/employees/:id', employeesController.update);
router.delete('/employees/:id', employeesController.delete);

router.get('/crickets', cricketsController.findAll);
router.get('/crickets/:id', cricketsController.findOne);
router.post('/crickets', cricketsController.create);
router.put('/crickets/:id', cricketsController.update);
router.delete('/crickets/:id', cricketsController.delete);

module.exports = router;



