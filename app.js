const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()

const db = require('./config/database')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Connecting to the database
db.connect()

// Listening server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})