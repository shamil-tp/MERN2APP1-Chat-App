const { json } = require('express')
const {client} = require('../config/db')
const jwt = require('jsonwebtoken')

exports.getRegisterPage = (req, res) => res.render('register')

exports.Register = async (req, res) => {
    const messageCollection = client.db('nodeMessenger').collection('users')
    const result = await messageCollection.insertOne(req.body)
    return res.redirect('/login')
}

exports.getLoginPage = (req, res) => res.render('login')


exports.Login = async (req, res) => {
    const userCollection = client.db('nodeMessenger').collection('users')
    const user = await userCollection.findOne(req.body)
    if (!user) {
        return res.redirect('/login')
    }
    let token = jwt.sign({userName:req.body.userName},'shh')
    // console.log(token)
    return res.cookie('user',token,{HttpOnly:true}).redirect(`/`)
}

exports.Logout = (req,res)=> res.clearCookie('user').redirect('/login')