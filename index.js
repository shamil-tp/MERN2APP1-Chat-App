const express = require("express")
const { MongoClient } = require('mongodb')
const cookieParser = require("cookie-parser")

const app = express()

const PORT = 3000
const HOSTNAME = "localhost"
const uri = `mongodb+srv://shamil:urcx5298@mysnapgram.zq2yd.mongodb.net/`

const client = new MongoClient(uri)


app.use(express.urlencoded())
app.use(express.static("images"))
app.use(cookieParser())

app.set('view engine', 'ejs')

async function connectMongodb() {
    try {
        await client.connect()
        console.log('connection success')
    } catch (e) {
        console.log("there is an error while connecting")
        console.log(e)
    }

}

app.get('/', async (req, res) => {
    console.log(req.cookies)
    console.log(req?.cookies?.user?.userName)
    const userCollection = client.db('nodeMessenger').collection('users')
    const users = await userCollection.find({}).toArray()
    // console.log(users)
    // const user = await userCollection.findOne({ userName: req.cookies.user.userName })
    if (!req?.cookies?.user?.userName) {
        return res.redirect("/login")
    }
    // return res.sendFile(__dirname+"/html/people.html")
    return res.render('people', { people: users, user: req.cookies.user.userName })

})

app.get('/chat', async (req, res) => {
    const messageCollection = client.db('nodeMessenger').collection('messenger')
    const query = {
        $or: [
            { sender: req.cookies.user.userName, receiver: req.query.rec },
            { sender: req.query.rec, receiver: req.cookies.user.userName }
        ]
    };
    const messages = (await messageCollection.find(query).toArray())
    // messages = messages

    if (!(req.cookies.user.userName && req.query.rec)) {
        return res.redirect("/login")
    }

    // return res.sendFile(__dirname+"/html/chat.html")
    return res.render('chat', { messages: messages, users: req.cookies.user.userName, receiver: req.query.rec })

})

app.post('/message', async (req, res) => {
    console.log(req.body)
    const messageCollection = client.db('nodeMessenger').collection('messenger')
    const result = await messageCollection.insertOne(req.body)
    // messages.push(req.body)

    return res.redirect(`/chat?rec=${req.body.receiver}`)
})

app.get('/register', (req, res) => {
    // return res.sendFile(__dirname+"/html/register.html")
    return res.render('register')
})

app.post('/register',async (req, res) => {
    // const {name, userName, password} = req.body
    // users.push({name, userName, password})
    console.log(req.body)
    // users.push(req.body)

    const messageCollection = client.db('nodeMessenger').collection('users')
    const result = await messageCollection.insertOne(req.body)

    return res.redirect('/login')
})

app.get('/login', (req, res) => {
    // return res.sendFile(__dirname+"/html/login.html")
    return res.render('login')
})

app.post('/login', async (req, res) => {
    const userCollection = client.db('nodeMessenger').collection('users')
    res.cookie('user',{userName:req.body.userName})
    const user = await userCollection.findOne(req.body)


    console.log(req.body)
    // const {userName, password} = req.body
    // const user = users.find((item)=>item.userName == userName && item.password == password)
    if (!user) {
        return res.redirect('/login')
    }
    return res.redirect(`/`)
})

app.get('/logout',(req,res)=>{
    return res.clearCookie('user').redirect('/login')
})

app.get('/getusers', (req, res) => {
    return res.json(users)
})

app.get('/getmessages', (req, res) => {
    return res.json(messages)
})


app.listen(PORT, () => {
    console.log(`server is running at: http://${HOSTNAME}:${PORT}`)
    connectMongodb()
})