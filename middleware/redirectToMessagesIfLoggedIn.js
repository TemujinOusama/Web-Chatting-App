const redirectToMessageIfLoggedIn = (req, res, next)=>{     //redirect to /messages if the user goes to / endpoint (which contains the login page)
    if(req.cookies.jwt){
        return res.redirect('/messages')
    }
    next()
}
module.exports = {redirectToMessageIfLoggedIn}