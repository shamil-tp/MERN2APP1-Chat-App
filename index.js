const express = require("express")
// const { MongoClient } = require('mongodb')
const {connectMongodb} = require('./config/db')
const cookieParser = require("cookie-parser")
const authRouter = require('./routes/auth')
const chatRouter = require('./routes/chat')

const app = express()

const PORT = 3000
const HOSTNAME = "localhost"


app.use(express.urlencoded())
app.use(express.static("images"))
app.use(cookieParser())

app.set('view engine', 'ejs')

app.use(authRouter)
app.use(chatRouter)


app.listen(PORT, () => {
    console.log(`server is running at: http://${HOSTNAME}:${PORT}`)
    connectMongodb()
})