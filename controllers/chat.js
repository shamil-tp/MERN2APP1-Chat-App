const {client} = require('../config/db')

exports.Home = async (req, res) => {
    const userCollection = client.db('nodeMessenger').collection('users')
    const users = await userCollection.find({}).toArray()
    if (!req?.cookies?.user?.userName) {
        return res.redirect("/login")
    }
    return res.render('people', { people: users, user: req.cookies.user.userName })
}

exports.Chat =  async (req, res) => {
    const messageCollection = client.db('nodeMessenger').collection('messenger')
    const query = {
        $or: [
            { sender: req.cookies.user.userName, receiver: req.query.rec },
            { sender: req.query.rec, receiver: req.cookies.user.userName }
        ]
    };
    const messages = (await messageCollection.find(query).toArray())
    if (!(req.cookies.user.userName && req.query.rec)) {
        return res.redirect("/login")
    }
    return res.render('chat', { messages: messages, users: req.cookies.user.userName, receiver: req.query.rec })

}

exports.Message = async (req, res) => {
    const messageCollection = client.db('nodeMessenger').collection('messenger')
    const result = await messageCollection.insertOne(req.body)
    return res.redirect(`/chat?rec=${req.body.receiver}`)
}