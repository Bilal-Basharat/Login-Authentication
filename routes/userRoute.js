const express = require('express')
const router = express.Router();

const userController = require('../controllers/userController')
const {tokenValidation} = require('../utils/authorization_middleware')

router.post('/user', userController.createUser);
router.get('/user', userController.getUsers);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

//route for login
router.post('/user/login', userController.userLoginAuthentication);
router.post('/user/jwt', userController.userLoginJsonWebToken);
router.post('/user/welcome', tokenValidation, userController.adminDashboard);

module.exports = router;
