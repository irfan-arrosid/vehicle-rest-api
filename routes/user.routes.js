const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')

router.post('/register', userController.register)
router.post('/login', userController.login)

// router.get('/users')
// router.get('/users/:id')
// router.patch('/users/:id')
// router.delete('/users/:id')

module.exports = router