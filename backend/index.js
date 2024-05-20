const express = require('express')
const app = express()
const debug = require("debug")("backend-ingsoftware:server");

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const userRouter = require('./controllers/users')
const indexRouter = require('./controllers/index')
const infoRouter = require('./controllers/info')

app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/info', infoRouter)
app.use('/', indexRouter)

const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

start()
