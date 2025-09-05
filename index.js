const express = require("express")
const app = express()

const PORT = 3000
const HOSTNAME = "192.168.29.178"

app.use(express.urlencoded())
app.use(express.static("images"))

app.set('view engine','ejs')

const users = [
    {
        name:'Shamil',
        userName:'shamil',
        password:'123',
    },
    {
        name:'Fasil',
        userName:'support',
        password:'1e',
    },
    {
        name:'grok',
        userName:'hem-lock',
        password:'123',
    },
    {
        name:'prep',
        userName:'talkk',
        password:'33',
    },
    {
        name:'j2__sal',
        userName:'hmt',
        password:'123',
    }
]

const messages = [
    {
        id: '',
        sender: '',
        receiver:'',
        text:''
    }
]



app.get('/',(req,res)=>{
    if(!req.query.user){
        return res.redirect("/login")
    }
    // return res.sendFile(__dirname+"/html/people.html")
    return res.render('people',{people:users,user:req.query.user})
    
})

app.get('/chat',(req,res)=>{
    if(!(req.query.user && req.query.rec)){
        return res.redirect("/login")
    }

    // return res.sendFile(__dirname+"/html/chat.html")
    return res.render('chat',{messages:messages,users:req.query.user,receiver:req.query.rec})

})

app.post('/message',(req,res)=>{
    console.log(req.body)
    messages.push(req.body)
        return res.redirect(`/chat?user=${req.body.sender}&rec=${req.body.receiver}`)
})

app.get('/register',(req,res)=>{
    // return res.sendFile(__dirname+"/html/register.html")
    return res.render('register')
})

app.post('/register',(req,res)=>{
    // const {name, userName, password} = req.body
    // users.push({name, userName, password})
    console.log(req.body)
    users.push(req.body)
    return res.redirect('/login')
})

app.get('/login',(req,res)=>{
    // return res.sendFile(__dirname+"/html/login.html")
    return res.render('login')
})

app.post('/login',(req,res)=>{
    console.log(req.body)
    const {userName, password} = req.body
    const user = users.find((item)=>item.userName == userName && item.password == password)
    if(!user){
        return res.redirect('/login')
    }
    return res.redirect(`/?user=${user.userName}`)
})

app.get('/getusers',(req,res)=>{
    return res.json(users)
})

app.get('/getmessages',(req,res)=>{
    return res.json(messages)
})


app.listen(PORT,HOSTNAME,()=>{
    console.log(`server is running at: http://${HOSTNAME}:${PORT}`)
})