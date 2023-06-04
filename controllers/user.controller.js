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

// POST /register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // Hashing password
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create a new user
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })

        // Generate token
        const token = generateToken(user)

        res.status(201).json({
            message: 'Register new user is success',
            token: token
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
        console.error(error);
    }
}

// POST /login
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // Find user by email
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        // Password verification
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password'
            })
        }

        // Generate token
        const token = generateToken(user)

        res.status(201).json({
            message: 'Login is success',
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
    register,
    login,
}