const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const sequelize = require('./config/database')

const userRoutes = require('./routes/user.routes')

// Middleware
app.use(express.json())

// Routes
app.use('/', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Connecting to the database
const dbConnect = async() => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully')
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
dbConnect()

// Listening server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})