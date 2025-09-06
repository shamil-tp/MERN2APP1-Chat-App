


exports.getRegisterPage = (req, res) => res.render('register')

exports.Register = async (req, res) => {
    const messageCollection = client.db('nodeMessenger').collection('users')
    const result = await messageCollection.insertOne(req.body)
    return res.redirect('/login')
}

exports.getLoginPage = (req, res) => res.render('login')


exports.Login = async (req, res) => {
    const userCollection = client.db('nodeMessenger').collection('users')
    res.cookie('user',{userName:req.body.userName})
    const user = await userCollection.findOne(req.body)
    if (!user) {
        return res.redirect('/login')
    }
    return res.redirect(`/`)
}

exports.Logout = (req,res)=> res.clearCookie('user').redirect('/login')