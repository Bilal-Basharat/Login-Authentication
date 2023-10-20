const express = require('express')
const router = express.Router();

const userController = require('../controllers/userController')

router.post('/user', userController.createUser);
router.get('/user', userController.getUsers);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

//route for login
router.post('/user/login', userController.userLogin);

module.exports = router;
