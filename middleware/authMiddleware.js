const {sign,verify}= require('jsonwebtoken')
require('dotenv').config()

const createUser = (user)=>{
    const userID = user._id.toString()
    return userID
}
const createToken = (user)=>{
    const accessToken = sign({userID:user._id}, process.env.SECRET_ACCESS)  //creates and returns the token
    return accessToken
}
const maxAge = 1000*60*60*24

const authenticateToken = (req,res, next)=>{            //check if the token matches with the existing token(stored in cookies)
    const token = req.cookies.jwt
    if(token){
        verify(token, process.env.SECRET_ACCESS,(err, decodedToken)=>{
            if(err){
                console.log(" Token verification error:",err.message)
                return res.status(403).json({message:'Forbidden'})
            }
            else{
                req.user = decodedToken         //will be used when making requests as user
                next()
            }
            
        } )
    }

    else{
        res.redirect('/')
    }
}
module.exports = {createToken, authenticateToken, maxAge, createUser}