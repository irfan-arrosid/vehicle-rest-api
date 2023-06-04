const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()

const db = require('./config/database.js')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Connecting to the database
db.connect()

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})