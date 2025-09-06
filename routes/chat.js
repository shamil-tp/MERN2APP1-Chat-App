const router = require('express').Router()

const { Home, Chat, Message } = require('../controllers/chat')

router
    .route('/')
    .get(Home)
router
    .route('/chat')
    .get(Chat)
router
    .route('/message')
    .post(Message)