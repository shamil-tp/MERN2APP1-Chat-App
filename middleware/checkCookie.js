const jwt = require('jsonwebtoken')
const checkCookie = (req,res,next)=>{
    if(!req.cookies.user){
        return res.redirect('/login')
    }
    let decoded = null
    try{
        let token = req.cookies.user
        decoded = jwt.verify(token,'shh')
        req.user = decoded
        console.log(req.user)
        return next();
    }catch{
        return res.clearCookie('user').redirect('/login')
    }
    
}

module.exports = checkCookie;