const jwt = require("jsonwebtoken")

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization

    if(!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token'
        })
    }
}

const authorizeAdmin = (req, res, next) => {
    if(!req.user.is_admin) {
        return res.status(403).json({
            message: 'Forbidden'
        })
    }
}

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

module.exports = {
    authenticateUser,
    authorizeAdmin,
    generateToken
}