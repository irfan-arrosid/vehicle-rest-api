const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const generateToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.is_admin
    }

    const options = {
        expiresIn: '1h',
    }

    return jwt.sign(payload, process.env.JWT_SECRET, options)
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })

        const token = generateToken(user)

        res.status(201).json({
            message: 'Create new user is success',
            token: token
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
        console.error(error);
    }
}

module.exports = {
    register
}