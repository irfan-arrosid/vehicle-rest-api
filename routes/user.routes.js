const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')

// User Routes
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getUserById)
router.patch('/users/:id', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)

module.exports = router