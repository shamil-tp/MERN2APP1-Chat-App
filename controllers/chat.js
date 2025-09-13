const {client} = require('../config/db')
const jwt = require('jsonwebtoken')

exports.Home = async (req, res) => {
    const userCollection = client.db('nodeMessenger').collection('users')
    const users = await userCollection.find({}).toArray()
    // if (!req?.cookies?.user?.userName) {
    //     return res.redirect("/login")
    // }
    return res.render('people', { people: users, user: req.user.userName })
}

exports.Chat =  async (req, res) => {
    const messageCollection = client.db('nodeMessenger').collection('messenger')
    const query = {
        $or: [
            { sender: req.user.userName, receiver: req.query.rec },
            { sender: req.query.rec, receiver: req.user.userName }
        ]
    };
    const messages = (await messageCollection.find(query).toArray())
    // if (!(req.cookies.user.userName && req.query.rec)) {
    //     return res.redirect("/login")
    // }
    return res.render('chat', { messages: messages, users: req.user.userName, receiver: req.query.rec })

}

exports.Message = async (req, res) => {
    const messageCollection = client.db('nodeMessenger').collection('messenger')
    const result = await messageCollection.insertOne(req.body)
    console.log(req.user)
    return res.redirect(`/chat?rec=${req.body.receiver}`)
}